import { ConstellationCard, getCards } from "@constellation-cards/cards";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { find, map, pluck, propEq } from "ramda";

import CardGrid from "../../src/CardGrid";
import ConstellationCardsLayout from "../../src/ConstellationCardsLayout";

interface CardProps {
    card?: ConstellationCard
}

/**
 * The card database page for showing a single card.
 * 
 * @param props 
 * @returns 
 */
const CardPage: NextPage = (props: CardProps) => {
  const card: ConstellationCard = props.card as ConstellationCard
  const cardName = (card.front?.name === card.back?.name) ? card.front.name : `${card.front.name} / ${card.back.name}`
    return (
      <ConstellationCardsLayout meta={{title: cardName, description: `${cardName} card in Constellation Cards`}}>
        <div>
            <h1>{cardName}</h1>
            <CardGrid cards={[card]} />
        </div>
      </ConstellationCardsLayout>
    );
  };

export default CardPage

export const getStaticPaths: GetStaticPaths = async (_context) => {
    const cards = getCards()
    const cardUids: string[] = pluck("uid", cards)
    const paths = map(card => ({ params: { card }}), cardUids)
  
    return {
      paths,
      fallback: false
    };
  };
  
  export const getStaticProps: GetStaticProps = async (context) => {
    const cardUid: string = context.params ? context.params["card"] as string : "";
    const card = find(propEq("uid", cardUid), getCards())
  
    return {
      props: {
        card,
      },
      notFound: (card === undefined)
    };
  };