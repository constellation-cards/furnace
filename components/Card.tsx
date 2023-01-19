import { ConstellationCard, ConstellationCardFace } from "@constellation-cards/cards";
import React from "react";

import CardFace from "./CardFace";

interface CardProps {
  card: ConstellationCard;
  isFlipped: boolean;
}

/**
 * Show a single card, either front or back face depending on its state.
 * Does not include any actions (e.g. flip card).
 * 
 * TODO: allow actions to propagate through to CardFace
 */
export default function Card({card, isFlipped}: CardProps) {
  const face: ConstellationCardFace = (isFlipped) ? card.back : card.front

  return (
    <CardFace face={face} />
  );
};
