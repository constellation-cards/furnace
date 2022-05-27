// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDecks, getStacks, getCards, ConstellationCardDeck, ConstellationCardStack, ConstellationCard } from '@constellation-cards/cards'

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function insertDecks(decks: ConstellationCardDeck[]) {
  // cards.json UID -> database UID
  const deckIdMapping: Record<string,string> = {}

  for (let deck of decks) {
    const data: Prisma.DeckCreateInput = {
      name: deck.name
    }
    const result = await prisma.deck.create({data})
    deckIdMapping[deck.uid as string] = result.uid
  }

  return deckIdMapping
}

async function insertStacks(stacks: ConstellationCardStack[]) {
  // cards.json UID -> database UID
  const stackIdMapping: Record<string,string> = {}

  for (let stack of stacks) {
    const data: Prisma.StackCreateInput = {
      name: stack.name,
      icons: stack.icons as string[]
    }
    const result = await prisma.stack.create({data})
    stackIdMapping[stack.uid as string] = result.uid
  }

  return stackIdMapping
}

async function insertCards(cards: ConstellationCard[], deckIdMapping: Record<string,string>, stackIdMapping: Record<string,string>) {
  for (let card of cards) {
    const data: Prisma.CardCreateInput = {
      deck: {
        connect: { uid: deckIdMapping[card.deck] }
      },
      stack: {
        connect: { uid: stackIdMapping[card.stack] }
      },
      quantity: card.quantity,
      front: {
        create: {
          name: card.front.name,
          backgroundImage: card.front.backgroundImage as string,
          description: card.front.description,
          prompts: card.front.prompts,
          rule: card.front.rule
        }
      },
      back: {
        create: {
          name: card.back.name,
          backgroundImage: card.back.backgroundImage as string,
          description: card.back.description,
          prompts: card.back.prompts,
          rule: card.back.rule
        }
      }
    }
    const result = await prisma.card.create({data})
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const deckIdMapping = await insertDecks(getDecks())
      const stackIdMapping = await insertStacks(getStacks())

      await insertCards(getCards(), deckIdMapping, stackIdMapping)

      res.status(200).json({deckIdMapping, stackIdMapping})
    } catch (err) {
      res.status(500).json({err})
    } finally {
      await prisma.$disconnect()
    }  
  } else {
    res.status(404).send('Not Found')
  }
}
