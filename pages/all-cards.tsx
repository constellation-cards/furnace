import { ConstellationCard, getCards } from "@constellation-cards/cards";
import { GetStaticProps, NextPage } from "next";

import CardGrid from "../src/CardGrid";

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
      <div>
          <h1>All Cards</h1>
          <CardGrid cards={props.cards || []} />
      </div>
    );
  };

export default AllCardsPage

export const getStaticProps: GetStaticProps = async (_context) => {
    const cards = getCards()
  
    return {
      props: {
        cards
      }
    };
  };
  