import {
  ConstellationCard,
  ConstellationCardStack,
  getCards,
  getStacks
} from "@constellation-cards/cards";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { filter, find, includes, map, pluck, propEq } from "ramda";

import CardGrid from "../../components/CardGrid";
import ConstellationCardsLayout from "../../components/ConstellationCardsLayout";

interface StackProps {
  stack?: ConstellationCardStack;
  cards?: ConstellationCard[];
}

const StackPage: NextPage = (props: StackProps) => {
  return (
    <ConstellationCardsLayout
      meta={{
        title: props.stack?.name,
        description: `${props.stack?.name} stack in Constellation Cards`
      }}
    >
      <div>
        <nav className="breadcrumb" aria-label="Breadcrumbs">
          <ul>
            <li>
              <Link href="/all-cards/">All Cards</Link>
            </li>
            <li className="is-active">
              <a href="#" aria-current="page">{props.stack?.name}</a>
            </li>
          </ul>
        </nav>
        <h1 className="title">{props?.stack?.name}</h1>
        <CardGrid cards={props.cards || []} />
      </div>
    </ConstellationCardsLayout>
  );
};

export default StackPage;

export const getStaticPaths: GetStaticPaths = async (_context) => {
  const stacks = getStacks();
  const stackUids: string[] = pluck("uid", stacks);
  const paths = map((stack) => ({ params: { stack } }), stackUids);

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const stackUid: string = context.params
    ? (context.params["stack"] as string)
    : "";
  const stack = find(propEq("uid", stackUid), getStacks());
  const stackCards = stack?.cards || [];
  const cardsInThisStack = filter(
    (card) => includes(card.uid, stackCards),
    getCards()
  );

  return {
    props: {
      stack,
      cards: cardsInThisStack
    },
    notFound: stack === undefined
  };
};
