import { ConstellationCard, ConstellationCardFace } from "@constellation-cards/cards";
import { map } from "ramda";
import React from "react";
import CardFace from "./CardFace";

interface CardProps {
  cards: ConstellationCard[];
}

/**
 * Show a list of cards, both front and back face
 * 
 * @param props 
 * @returns 
 */
export default function CardGrid(props: CardProps) {
  return (
    <div className="columns is-multiline">
      {map(
        (card) => (
          <React.Fragment key={card.uid}>
            <div className="column is-centered is-half">
              <CardFace face={card.front} />
            </div>
            <div className="column is-centered is-half">
              <CardFace face={card.back} />
            </div>
          </React.Fragment>
        ),
        props.cards
      )}
    </div>
  );
};
