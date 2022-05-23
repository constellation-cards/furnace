import type { GetStaticProps, NextPage } from "next";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
  getDecks,
  getStacks,
  getCards,
  ConstellationCard,
  ConstellationCardDeck,
  ConstellationCardStack
} from "@constellation-cards/cards";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import {
  assoc,
  filter,
  includes,
  map,
  pluck,
  propEq,
  propOr,
  reduce,
  uniq,
  values
} from "ramda";
import Link from 'next/link'
import ConstellationCardsLayout from "../src/ConstellationCardsLayout";


interface HomeProps {
  decks?: Record<string, ConstellationCardDeck>;
  stacks?: Record<string, ConstellationCardStack>;
  cards?: Record<string, ConstellationCard>;
}

interface DeckProps {
  deck: ConstellationCardDeck;
  stacks: Record<string, ConstellationCardStack>;
  cards: Record<string, ConstellationCard>;
}

interface StackProps {
  stack: ConstellationCardStack;
  cards: Record<string, ConstellationCard>;
}

const Stack = ({ stack, cards }: StackProps) => {
  return (
    <Grid item xs={4} key={stack.uid}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        <Link href={`/stacks/${stack.uid}`}>{stack.name}</Link>
      </Typography>
      <List dense={false}>
        {map((cardUid) => {
          const card = cards[cardUid];
          const cardName: string =
            card.front.name === card.back.name
              ? card.front.name
              : `${card.front.name} / ${card.back.name}`;
          return (
            <ListItem component={'a'} href={`/cards/${card.uid}`} key={card.uid}>
              <ListItemAvatar>
                <ArrowRightIcon />
              </ListItemAvatar>
              <ListItemText>{cardName}</ListItemText>
            </ListItem>
          );
        }, stack.cards)}
      </List>
    </Grid>
  );
};

const Deck = ({ deck, stacks, cards }: DeckProps) => {
  const cardsInThisDeck = filter(propEq("deck", deck.uid), cards);
  const stackIds = uniq(pluck("stack", values(cardsInThisDeck)));
  const stacksInThisDeck = filter(
    (stack) => includes(stack.uid, stackIds),
    stacks
  );

  return (
    <Box>
      <h1>{deck.name}</h1>

      <Grid container spacing={2} key={deck.uid}>
        {map(
          (stack) => (
            <Stack stack={stack} cards={cards} key={stack.uid} />
          ),
          values(stacksInThisDeck)
        )}
      </Grid>
    </Box>
  );
};

const Home: NextPage = (props: HomeProps) => {
  const decks: Record<string, ConstellationCardDeck> = props.decks
    ? props.decks
    : {};
  const stacks: Record<string, ConstellationCardStack> = props.stacks
    ? props.stacks
    : {};
  const cards: Record<string, ConstellationCard> = props.cards
    ? props.cards
    : {};

  return (
    <ConstellationCardsLayout meta={{title: 'Constellation Cards', description: 'The homepage of the Constellation Cards tabletop roleplaying game'}}>
      <Container maxWidth="xl" disableGutters={false}>
        {map(
          (deck) => (
            <Deck deck={deck} stacks={stacks} cards={cards} key={deck.uid} />
          ),
          values(decks)
        )}
      </Container>
    </ConstellationCardsLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (_context) => {
  const deckRecords: Record<string, ConstellationCardDeck> = {};
  const decks = reduce((a, v) => assoc(v.uid, v, a), deckRecords, getDecks());

  const stackRecords: Record<string, ConstellationCardStack> = {};
  const stacks = reduce(
    (a, v) => assoc(v.uid, v, a),
    stackRecords,
    getStacks()
  );

  const cardRecords: Record<string, ConstellationCard> = {};
  const cards = reduce((a, v) => assoc(v.uid, v, a), cardRecords, getCards());

  return {
    props: {
      decks,
      stacks,
      cards
    }
  };
};
