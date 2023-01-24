import type { NextPage } from "next";
import ConstellationCardsLayout from "../../components/ConstellationCardsLayout";
import useSWR, { KeyedMutator } from "swr";
import { GameTable } from "@prisma/client";
import { map } from "ramda";

interface PlayTableProps {}


/**
 * The Play homepage. Show a menu of game sessions, and allow users to edit the list.
 * Also allow users to launch a game.
 *
 * @param props React properties
 * @returns
 */
const PlayTable: NextPage = (props: PlayTableProps) => {
  return (
    <ConstellationCardsLayout
      meta={{
        title: "Play",
        description: "Play a game of Constellation Cards"
      }}
    >
      <>
        <div>This is where you'd actually play a game.</div>
      </>
    </ConstellationCardsLayout>
  );
};

export default PlayTable;
