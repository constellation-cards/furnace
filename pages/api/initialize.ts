// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDecks, getStacks, getCards, ConstellationCardDeck, ConstellationCardStack, ConstellationCard, getPresets, ConstellationCardPreset } from '@constellation-cards/cards'
// import { getSession } from "next-auth/react"

import prisma from "../../components/prisma-client"

async function insertDecks(decks: ConstellationCardDeck[]) {
  const deckIdMapping: Record<string,string> = {}

  for (let deck of decks) {
    const result = await prisma.constellationCardDeck.create({data: {
      name: deck.name
    }})
    deckIdMapping[deck.uid as string] = result.uid
  }

  return deckIdMapping
}

async function insertStacks(stacks: ConstellationCardStack[]) {
  const stackIdMapping: Record<string,string> = {}

  for (let stack of stacks) {
    const result = await prisma.constellationCardStack.create({data: {
      name: stack.name,
      icons: [],
      state: {}
    }})
    stackIdMapping[stack.uid as string] = result.uid
  }

  return stackIdMapping
}

async function insertCards(cards: ConstellationCard[], deckIdMapping: Record<string,string>, stackIdMapping: Record<string,string>) {
  const newCards = []
  for (let card of cards) {
    const result = await prisma.constellationCard.create({data: {
      deckId: deckIdMapping[card.deck],
      stackId: stackIdMapping[card.stack],
      front: {
        name: card.front.name,
        backgroundImage: card.front.backgroundImage || undefined,
        description: card.front.description,
        prompts: card.front.prompts,
        rule: card.front.rule
      },
      back: {
        name: card.back.name,
        backgroundImage: card.back.backgroundImage || undefined,
        description: card.back.description,
        prompts: card.back.prompts,
        rule: card.back.rule
      },
      quantity: card.quantity,
      state: {}
    }})
    newCards.push(result)
  }
  return newCards
}

async function insertPresets(presets: ConstellationCardPreset[], stackIdMapping: Record<string,string>) {
  for (let preset of presets) {
    const newPreset = await prisma.constellationCardPreset.create({data: {
      name: preset.name,
      description: preset.description
    }})
    for (let source of preset.sources) {
      const newSource = await prisma.constellationCardPresetSource.create({data: {
        presetId: newPreset.uid,
        stackId: stackIdMapping[source.stack],
        quantity: source.quantity,
        flipRule: source.flipRule as string
      }})
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getSession({ req })
  // if (!session) {
  //   res.status(401).send('Unauthorized')
  //   throw new Error('UnauthorizedError')
  // }

  if (req.method === 'POST') {
    try {
      await prisma.$connect()

      const deckIdMapping = await insertDecks(getDecks())
      const stackIdMapping = await insertStacks(getStacks())

      const newCards = await insertCards(getCards(), deckIdMapping, stackIdMapping)

      const newPresets = await insertPresets(getPresets(), stackIdMapping)

      res.status(200).json({deckIdMapping, stackIdMapping, newCards})
    } catch (err) {
      res.status(500).json({err})
    } finally {
      await prisma.$disconnect()
    }  
  } else {
    res.status(404).send('Not Found')
  }
}
