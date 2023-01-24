import type { NextPage } from "next";
import ConstellationCardsLayout from "../../components/ConstellationCardsLayout";
import useSWR, { KeyedMutator } from "swr";
import { GameTable } from "@prisma/client";
import { map } from "ramda";

interface PlayHomeProps {}

const fetchTables = (): Promise<GameTable[]> =>
  fetch("/api/table").then((res) => res.json());

function GameTable({ table, mutate }: { table: GameTable, mutate: KeyedMutator<GameTable[]> }) {
  return (
    <div className="card">
      <div className="card-content">
        <p className="title">
          {table.title} <span className="tag is-info">{table.version}</span>
        </p>
      </div>
      <footer className="card-footer">
      <p className="card-footer-item">
          Play
        </p>
        <p className="card-footer-item">
          Rename
        </p>
        <p className="card-footer-item">
          Delete
        </p>
      </footer>
    </div>
  );
}

/**
 * The Play homepage. Show a menu of game sessions, and allow users to edit the list.
 * Also allow users to launch a game.
 *
 * @param props React properties
 * @returns
 */
const PlayHome: NextPage = (props: PlayHomeProps) => {
  const {
    data: gameTables,
    error,
    isLoading,
    mutate
  } = useSWR("/api/user/123", fetchTables);
  return (
    <ConstellationCardsLayout
      meta={{
        title: "Play",
        description: "Play a game of Constellation Cards"
      }}
    >
      <>
        {isLoading ? <h1 className="title">Loading...</h1> : <></>}
        {error ? <h1 className="title">Error loading data</h1> : <></>}
        {gameTables ?
          map((table) => <GameTable table={table} mutate={mutate} />, gameTables || [])
          : <></>
        }
      </>
    </ConstellationCardsLayout>
  );
};

export default PlayHome;
