import type { GetStaticProps, NextPage } from "next";
import {
  getDecks,
  getStacks,
  getCards,
  ConstellationCard,
  ConstellationCardDeck,
  ConstellationCardStack
} from "@constellation-cards/cards";
import {
  assoc,
  filter,
  includes,
  map,
  pluck,
  propEq,
  reduce,
  uniq,
  values
} from "ramda";
import Link from 'next/link'
import ConstellationCardsLayout from "../components/ConstellationCardsLayout";

import styles from "../styles/Home.module.sass"

interface HomeProps {
  decks?: Record<string, ConstellationCardDeck>;
  stacks?: Record<string, ConstellationCardStack>;
  cards?: Record<string, ConstellationCard>;
}

interface DeckProps {
  deck: ConstellationCardDeck;
  stacks: Record<string, ConstellationCardStack>;
  cards: Record<string, ConstellationCard>;
}

interface StackProps {
  stack: ConstellationCardStack;
  cards: Record<string, ConstellationCard>;
}

const Stack = ({ stack, cards }: StackProps) => {
  return (
    <div key={stack.uid} className="content">
      <strong>
        <Link href={`/stacks/${stack.uid}`}>{stack.name}</Link>
      </strong>
      :&nbsp;
      <span>
        {map((cardUid) => {
          const card = cards[cardUid];
          const cardName: string =
            card.front.name === card.back.name
              ? card.front.name
              : `${card.front.name} / ${card.back.name}`;
          return (
            <span className={styles.card_list} key={card.uid}>
              <Link href={`/cards/${card.uid}`} key={card.uid}>
                {cardName}
              </Link>
            </span>
          );
        }, stack.cards)}
      </span>
    </div>
  );
};

const Deck = ({ deck, stacks, cards }: DeckProps) => {
  const cardsInThisDeck = filter(propEq("deck", deck.uid), cards);
  const stackIds = uniq(pluck("stack", values(cardsInThisDeck)));
  const stacksInThisDeck = filter(
    (stack) => includes(stack.uid, stackIds),
    stacks
  );

  return (
    <div>
      <h1 className="title">{deck.name}</h1>

      <div key={deck.uid}>
        {map(
          (stack) => (
            <Stack stack={stack} cards={cards} key={stack.uid} />
          ),
          values(stacksInThisDeck)
        )}
      </div>
    </div>
  );
};

/**
 * The site homepage. Shows a menu of cards.
 * 
 * TODO: refactor to use Bulma
 * 
 * @param props React properties
 * @returns 
 */
const Home: NextPage = (props: HomeProps) => {
  const decks: Record<string, ConstellationCardDeck> = props.decks
    ? props.decks
    : {};
  const stacks: Record<string, ConstellationCardStack> = props.stacks
    ? props.stacks
    : {};
  const cards: Record<string, ConstellationCard> = props.cards
    ? props.cards
    : {};

  return (
    <ConstellationCardsLayout meta={{title: 'Constellation Cards', description: 'The homepage of the Constellation Cards tabletop roleplaying game'}}>
      <div>
        {map(
          (deck) => (
            <Deck deck={deck} stacks={stacks} cards={cards} key={deck.uid} />
          ),
          values(decks)
        )}
      </div>
    </ConstellationCardsLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (_context) => {
  const deckRecords: Record<string, ConstellationCardDeck> = {};
  const decks = reduce((a, v) => assoc(v.uid, v, a), deckRecords, getDecks());

  const stackRecords: Record<string, ConstellationCardStack> = {};
  const stacks = reduce(
    (a, v) => assoc(v.uid, v, a),
    stackRecords,
    getStacks()
  );

  const cardRecords: Record<string, ConstellationCard> = {};
  const cards = reduce((a, v) => assoc(v.uid, v, a), cardRecords, getCards());

  return {
    props: {
      decks,
      stacks,
      cards
    }
  };
};
