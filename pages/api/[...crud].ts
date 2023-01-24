import { omit } from "ramda";

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../components/prisma-client"

type SecurityCheck = (req: NextApiRequest, res: NextApiResponse<any>) => Promise<void>

async function sessionSecurityCheck(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send("Unauthorized");
    throw new Error("UnauthorizedError");
  }
  // TODO: verify that the user can access the resource in question?
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await prisma.$connect();

    const [model, uid] = req.query.crud as string[];

    let controller,
      include,
      securityCheck: SecurityCheck | undefined = sessionSecurityCheck;

    switch (model) {
      case "deck":
        controller = prisma.constellationCardDeck;
        break;
      case "stack":
        controller = prisma.constellationCardStack;
        break;
      case "card":
        controller = prisma.constellationCard;
        break;
      case "preset":
        controller = prisma.constellationCardPreset;
        include = {include: { sources: true }};
        break;
      case "presetSource":
        controller = prisma.constellationCardPresetSource;
        include = {include: { preset: true }};
        break;
      case "table":
        controller = prisma.gameTable;
        break;
      default:
        res.status(404).json({ err: "Not Found" });
        return;
    }

    let result;

    // TODO: include preset sources in preset updates

    if (req.method == "GET") {
      securityCheck = undefined;
    }

    // TODO: check JWT token for session controller, as they won't have a normal session?

    if (securityCheck && process.env.NODE_ENV === "production") {
        securityCheck(req, res)
    }

    switch (req.method) {
      case "GET":
        if (uid) {
          result = await controller.findUnique({ where: { uid }, ...include });
        } else {
          result = await controller.findMany({ ...include });
        }
        break;
      case "POST":
        result = await controller.create({
          data: omit(["uid"], req.body),
          ...include
        });
        break;
      case "PUT":
      case "PATCH":
        result = await controller.update({
          where: { uid },
          data: omit(["uid"], req.body),
          ...include
        });
        break;
      case "DELETE":
        result = await controller.delete({ where: { uid }, ...include });
        break;
      default:
        throw new Error("Not Implemented");
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  } finally {
    await prisma.$disconnect();
  }
}
