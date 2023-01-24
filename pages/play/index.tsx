import type { NextPage } from "next";
import ConstellationCardsLayout from "../../components/ConstellationCardsLayout";
import useSWR, { KeyedMutator } from "swr";
import { GameSession } from "@prisma/client";
import { map } from "ramda";

interface PlayHomeProps {}

const fetchSessions = (): Promise<GameSession[]> =>
  fetch("/api/session").then((res) => res.json());

function Session({ session, mutate }: { session: GameSession, mutate: KeyedMutator<GameSession[]> }) {
  return (
    <div className="card">
      <div className="card-content">
        <p className="title">
          {session.title} <span className="tag is-info">{session.version}</span>
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
    data: gameSessions,
    error,
    isLoading,
    mutate
  } = useSWR("/api/user/123", fetchSessions);
  return (
    <ConstellationCardsLayout
      meta={{
        title: "Play",
        description: "Play a game of Constellation Cards"
      }}
    >
      <>
        {isLoading && <h1 className="title">Loading...</h1>}
        {error && <h1 className="title">Error loading data</h1>}
        {gameSessions &&
          map((session) => <Session session={session} mutate={mutate} />, gameSessions || [])}
      </>
    </ConstellationCardsLayout>
  );
};

export default PlayHome;
