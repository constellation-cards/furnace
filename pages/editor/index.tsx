import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useSWR from 'swr'

import type { NextPage } from "next";
import ConstellationCardsLayout from "../../src/ConstellationCardsLayout";
import { map } from "ramda";

export const ALL_CARDS_QUERY = '/api/cards?include=front,back,deck,stack';

interface HomeProps {
  children?: JSX.Element;
}

export const fetcher = (apiPath: string) => fetch(apiPath).then((res) => res.json())

const Editor: NextPage = (props: HomeProps) => {
  const { data, error } = useSWR(ALL_CARDS_QUERY, fetcher)

  return (
    <ConstellationCardsLayout
      meta={{
        title: "Constellation Cards Editor",
        description:
          "An interactive card editor"
      }}
    >
      <Container maxWidth="xl" disableGutters={false}>
        {error ? <h1>{`${error}`}</h1> : <></>}
        {data ? (
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="Cards table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Deck</TableCell>
                  <TableCell>Stack</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {map(card => (
                  <TableRow key={card.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {card.front.name} / {card.back.name}
                    </TableCell>
                    <TableCell>{card.deck.name}</TableCell>
                    <TableCell>{card.stack.name}</TableCell>
                    <TableCell align="center">{card.quantity}</TableCell>
                  </TableRow>
                ), data as any[])}
              </TableBody>
            </Table>
          </TableContainer>
        ) : <></>}
      </Container>
    </ConstellationCardsLayout>
  );
};

export default Editor;
