import { ConstellationCardFace } from "@constellation-cards/cards";
import { split } from "ramda";
import React from "react";

import styles from "../styles/CardFace.module.sass"

interface CardFaceProps {
  face: ConstellationCardFace;
}

function descriptionToHtml(description: string | undefined) {
  return split("\n", description || "").map(line => <p key={line}>{line}</p>)
}

/**
 * Show the face of a card.
 *
 * TODO: show background image
 */
export default function CardFace({ face }: CardFaceProps) {
  return (
    <div className={`card block ${styles.indexcard}`}>
      <div className="card-header">
        <div className="card-header-title">
          {face.name}
        </div>
      </div>
      <div className="card-content">
        <div className="content">
          <p>{descriptionToHtml(face.description)}</p>
          <ul>
            {face.prompts?.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
          <p><em>{face.rule}</em></p>
        </div>
      </div>
    </div>
  );
}
