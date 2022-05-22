import { ConstellationCard, ConstellationCardStack, getCards, getStacks } from "@constellation-cards/cards";
import { Deck } from "@mui/icons-material";
import { Container } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { filter, find, includes, map, pluck, propEq, values } from "ramda";

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
  