import { ConstellationCard, getCards } from "@constellation-cards/cards";
import { GetStaticProps, NextPage } from "next";

import CardGrid from "../components/CardGrid";
import ConstellationCardsLayout from "../components/ConstellationCardsLayout";

interface AllCardsProps {
  cards?: ConstellationCard[];
}

/**
 * Show all cards.
 *
 * TODO: refactor to use Bulma
 *
 * @param props
 * @returns
 */
const AllCardsPage: NextPage = (props: AllCardsProps) => {
  return (
    <ConstellationCardsLayout
      meta={{
        title: "All cards",
        description: `A list of all cards in the game`
      }}
    >
      <div>
        <h1 className="title">All Cards</h1>
        <CardGrid cards={props.cards || []} />
      </div>
    </ConstellationCardsLayout>
  );
};

export default AllCardsPage;

export const getStaticProps: GetStaticProps = async (_context) => {
  const cards = getCards();

  return {
    props: {
      cards
    }
  };
};
