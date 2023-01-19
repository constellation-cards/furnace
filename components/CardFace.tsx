import { ConstellationCardFace } from "@constellation-cards/cards";
import React from "react";

import styles from "./card.module.sass"

interface CardFaceProps {
  face: ConstellationCardFace;
}

/**
 * Show the face of a card.
 * 
 * TODO: show background image
 * TODO: actually dress this up via Bulma CSS
 */
export default function CardFace({face}: CardFaceProps) {
    return (
      <div className={styles.face}>
        <p>{face.name}</p>
        <p>{face.description}</p>
        <ul>
          {face.prompts?.map(prompt => <li key={prompt}>{prompt}</li>)}
        </ul>
        <p>{face.rule}</p>
      </div>
    );
  };
  