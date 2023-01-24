import type { NextPage } from "next";
import ConstellationCardsLayout from "../../components/ConstellationCardsLayout";
import useSWR, { KeyedMutator } from "swr";
import { GameTable } from "@prisma/client";
import { map } from "ramda";
import { useState } from "react";

interface PlayHomeProps {}

const fetchTables = (): Promise<GameTable[]> =>
  fetch("/api/table").then((res) => res.json());

async function deleteTable(table: GameTable, mutate: KeyedMutator<GameTable[]>) {
  if (confirm("Are you sure you want to delete this object?")) {
    try {
      const result = await fetch(`/api/table/${table.uid}`, {
        method: "DELETE"
      })
      mutate()  
    } catch (e) {
      alert(e)
    }
  }
} 

async function createTable(tableName: string, mutate: KeyedMutator<GameTable[]>) {
  const body = {
    title: tableName,
    version: "new",
    state: {}
  }

  try {
    const result = await fetch('/api/table', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    mutate()
  } catch (e) {
    alert(e)
  }
}

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
          <a className="button is-primary" href={`/play/${table.uid}`}>
            Play
          </a>
        </p>
        <p className="card-footer-item">
          Rename
        </p>
        <p className="card-footer-item">
          <button className="button is-danger" onClick={() => deleteTable(table, mutate)}>
            Delete
          </button>
        </p>
      </footer>
    </div>
  );
}

function NewGameTable({mutate}: {mutate: KeyedMutator<GameTable[]>}) {
  const [tableName, setTableName] = useState<string>("")
  
  return (
    <div className="card">
      <div className="card-content">
        <p className="title">
          <input className="input" type="text" placeholder="New table name" value={tableName} onChange={(event) => setTableName(event.target.value)} />
        </p>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <button className="button is-danger" onClick={() => createTable(tableName, mutate)}>
            Create
          </button>
        </p>
      </footer>
    </div>
  )
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
        {!isLoading && !gameTables?.length ? <h1 className="title">No game tables</h1> : <></>}
        {!isLoading && !error ? <NewGameTable mutate={mutate} /> : <></>}
      </>
    </ConstellationCardsLayout>
  );
};

export default PlayHome;
