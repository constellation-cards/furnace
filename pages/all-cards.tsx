import { ConstellationCard, getCards } from "@constellation-cards/cards";
import { Container } from "@mui/material";
import { GetStaticProps, NextPage } from "next";

import CardGrid from "../src/CardGrid";

interface AllCardsProps {
    cards?: ConstellationCard[];
}

const AllCardsPage: NextPage = (props: AllCardsProps) => {
    return (
      <Container maxWidth="xl" disableGutters={false}>
          <h1>All Cards</h1>
          <CardGrid cards={props.cards || []} />
      </Container>
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
  