import {
  ConstellationCard,
  ConstellationCardStack,
  getCards,
  getStacks
} from "@constellation-cards/cards";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { find, map, pluck, propEq } from "ramda";

import CardGrid from "../../components/CardGrid";
import ConstellationCardsLayout from "../../components/ConstellationCardsLayout";

interface CardProps {
  card?: ConstellationCard;
  stack?: ConstellationCardStack;
}

/**
 * The card database page for showing a single card.
 *
 * @param props
 * @returns
 */
const CardPage: NextPage = (props: CardProps) => {
  const card: ConstellationCard = props.card as ConstellationCard;
  const cardName =
    card.front?.name === card.back?.name
      ? card.front.name
      : `${card.front.name} / ${card.back.name}`;
  return (
    <ConstellationCardsLayout
      meta={{
        title: cardName,
        description: `${cardName} card in Constellation Cards`
      }}
    >
      <div>
        <nav className="breadcrumb" aria-label="Breadcrumbs">
          <ul>
            <li>
              <Link href="/all-cards/">All Cards</Link>
            </li>
            <li>
              <Link href={`/stacks/${props.stack?.uid}/`}>{props.stack?.name || "(no stack)"}</Link>
            </li>
            <li className="is-active">
              <a href="#" aria-current="page">
                {cardName}
              </a>
            </li>
          </ul>
        </nav>

        <h1 className="title">{cardName}</h1>

        <CardGrid cards={[card]} />
      </div>
    </ConstellationCardsLayout>
  );
};

export default CardPage;

export const getStaticPaths: GetStaticPaths = async (_context) => {
  const cards = getCards();
  const cardUids: string[] = pluck("uid", cards);
  const paths = map((card) => ({ params: { card } }), cardUids);

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const cardUid: string = context.params
    ? (context.params["card"] as string)
    : "";
  const card = find(propEq("uid", cardUid), getCards());
  const stack = card ? find(propEq("uid", card.stack), getStacks()) : undefined;

  return {
    props: {
      card,
      stack
    },
    notFound: card === undefined
  };
};
