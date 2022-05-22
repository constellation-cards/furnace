import { ConstellationCard, ConstellationCardFace } from "@constellation-cards/cards";
import { Grid } from "@mui/material";
import { map } from "ramda";
import React from "react";

interface CardProps {
  cards: ConstellationCard[];
}

interface OneCardProps {
  face: ConstellationCardFace;
}

const OneCard = (props: OneCardProps) => {
  const face = props.face;
  return (
    <Grid item xs={6}>
      <h4>{face.name}</h4>
      {map(line => <p key={line}>{line}</p>, (face.description || "").split("\n"))}
      <ul>
          {map(prompt => (<li key={prompt}>{prompt}</li>), face.prompts || [])}
      </ul>
      <p><em>{face.rule}</em></p>
    </Grid>
  );
};

export default (props: CardProps) => {
  return (
    <Grid container>
      {map(
        (card) => (
          <React.Fragment key={card.uid}>
            <OneCard face={card.front} />
            <OneCard face={card.back} />
          </React.Fragment>
        ),
        props.cards
      )}
    </Grid>
  );
};
