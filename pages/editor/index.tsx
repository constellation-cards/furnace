import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import useSWR from "swr";

import type { NextPage } from "next";
import ConstellationCardsLayout from "../../src/ConstellationCardsLayout";
import { filter, identity, includes, map, pathEq, pipe, pluck, uniq } from "ramda";
import { useState } from "react";

export const ALL_CARDS_QUERY = "/api/cards?include=front,back,deck,stack";

interface EditorProps {
  children?: JSX.Element;
}

// TODO: strong typing for retrieved card

export const fetcher = (apiPath: string) =>
  fetch(apiPath).then((res: any) => res.json() as any[]);

const cardName = (card: any) => (card.front.name === card.back.name) ? card.front.name : `${card.front.name} / ${card.back.name}`

const searchSpace = (card: any) => [card.front.name, card.front.description, ...card.front.prompts, card.front.rule, card.back.name, card.back.description, ...card.back.prompts, card.back.rule].join('\u0000').toLowerCase()

const filterCards = (selectedSearch: string, selectedDeck: string, selectedStack: string) => pipe(
  selectedStack ? filter(pathEq(['stack', 'id'], selectedStack)) : identity,
  selectedDeck ? filter(pathEq(['deck', 'id'], selectedDeck)) : identity,
  selectedSearch ? filter((card) => includes(selectedSearch, searchSpace(card))) : identity
)

const Editor: NextPage = (_props: EditorProps) => {
  const { data, error} = useSWR(ALL_CARDS_QUERY, fetcher);
  const [selectedSearch, selectSearch] = useState('')
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
                <TextField id="outlined-basic" fullWidth label="Text search" variant="outlined" value={selectedSearch} onChange={(event: any) => selectSearch(event.target.value)} />
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
                    filterCards(selectedSearch.toLowerCase(), selectedDeck, selectedStack)(data)
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
