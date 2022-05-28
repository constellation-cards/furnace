import { Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useSWR from "swr";

import type { NextPage } from "next";
import ConstellationCardsLayout from "../../src/ConstellationCardsLayout";
import { filter, map, pluck, uniq } from "ramda";
import { useState } from "react";

export const ALL_CARDS_QUERY = "/api/cards?include=front,back,deck,stack";

interface HomeProps {
  children?: JSX.Element;
}

export const fetcher = (apiPath: string) =>
  fetch(apiPath).then((res) => res.json());

const cardName = (card: any) => (card.front.name === card.back.name) ? card.front.name : `${card.front.name} / ${card.back.name}`

const filteredCards = (cards: any, selectedDeck: string | undefined | null, selectedStack: string | undefined | null): any[] => 
  filter((card: any) => (
    (!selectedDeck || (selectedDeck == card.deck.id)) &&
    (!selectedStack || (selectedStack == card.stack.id))
  ), cards)

const Editor: NextPage = (props: HomeProps) => {
  const { data, error } = useSWR(ALL_CARDS_QUERY, fetcher);
  const [selectedDeck, selectDeck] = useState('')
  const [selectedStack, selectStack] = useState('')

  const decks = uniq(pluck('deck', data || []))

  const stacks = uniq(pluck('stack', data || []))

  return (
    <ConstellationCardsLayout
      meta={{
        title: "Constellation Cards Editor",
        description: "An interactive card editor"
      }}
    >
      <Container maxWidth="xl" disableGutters={false}>
        <br />
        {error ? <h1>{`${error}`}</h1> : <></>}
        {data && (
          <>
            <Grid container>
              <Grid item xs={6}>
                TODO filter by name
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel>Deck</InputLabel>
                  <Select label="Deck" value={selectedDeck} onChange={(event: any) => selectDeck(event.target.value)}>
                    <MenuItem value={''}>(all decks)</MenuItem>
                    {map((deck: any) => (
                      <MenuItem key={deck.id} value={deck.id}>{deck.name}</MenuItem>
                    ), decks)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel>Stack</InputLabel>
                  <Select label="Stack" value={selectedStack} onChange={(event: any) => selectStack(event.target.value)}>
                    <MenuItem value={''}>(all stacks)</MenuItem>
                    {map((stack: any) => (
                      <MenuItem key={stack.id} value={stack.id}>{stack.name}</MenuItem>
                    ), stacks)}
                  </Select>
                </FormControl>              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="Cards table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Deck</TableCell>
                    <TableCell>Stack</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {map(
                    (card) => (
                      <TableRow
                        key={card.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 }
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {cardName(card)}
                        </TableCell>
                        <TableCell>{card.deck.name}</TableCell>
                        <TableCell>{card.stack.name}</TableCell>
                        <TableCell align="center">{card.quantity}</TableCell>
                      </TableRow>
                    ),
                    filteredCards(data, selectedDeck, selectedStack)
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </ConstellationCardsLayout>
  );
};

export default Editor;
