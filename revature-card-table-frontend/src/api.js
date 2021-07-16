import axios from "axios";

const api = axios.create({
  baseURL: "https://deckofcardsapi.com/api/deck/",
});

const startSpeed = async () => {
  //Grab random deck and draw 52 cards.
  const { data } = await api.get("new/shuffle/", {
    params: {
      deck_count: 1,
    },
  });
  const { deck_id } = data;
  const { data: cardsResponse } = await api.get(`${deck_id}/draw/`, {
    params: {
      count: 52,
    },
  });

  //Slice apart the deck into correct sized piles
  await api.get(`${deck_id}/pile/playerDeck/add/`, {
    params: {
      cards: `${cardsResponse.cards.slice(0, 20).map((card) => card.code).join(",")}`
    }
  });

  await api.get(`${deck_id}/pile/computerDeck/add/`, {
    params: {
      cards: `${cardsResponse.cards.slice(20, 40).map((card) => card.code).join(",")}`
    }
  });

  await api.get(`${deck_id}/pile/middleDeck/add/`, {
    params: {
      cards: `${cardsResponse.cards.slice(40, 53).map((card) => card.code).join(",")}`
    }
  });

  //Grab the list of cards
  const {data: playerDeck} = await api.get(`${deck_id}/pile/playerDeck/list/`);
  const {data: computerDeck} = await api.get(`${deck_id}/pile/computerDeck/list/`);
  const {data: middleDeck} = await api.get(`${deck_id}/pile/middleDeck/list/`);

  return {playerDeck, computerDeck, middleDeck};
}

const drawCardsFromPile = async (deckId, pileName, count) => {
  console.log("hello");
  console.log(deckId);
  console.log(pileName);
  const { data } = await api.get(`${deckId}/pile/${pileName}/draw/`, {
    params: {
      count: `${count}`,
    },
  });
  let images = [];
  const { deck_id, cards } = data;
  for (let card of cards) {
    images.push(card.image);
  }

  console.log(cards);
  return {cards, images, pileName, deckId};
};

const createDeckAndDraw = async () => {
  const { data } = await api.get("new/shuffle/", {
    params: {
      deck_count: 1,
    },
  });
  const { deck_id } = data;
  const { data: cardsResponse } = await api.get(`${deck_id}/draw/`, {
    params: {
      count: 1,
    },
  });

  return { ...cardsResponse.cards[0], deck_id };
};

const redrawCardFromDeck = async ({ deckId }) => {
  const { data } = await api.get(`${deckId}/draw/`, {
    params: {
      count: 1,
    },
  });
  const { deck_id, cards } = data;
  const { value, image } = data.cards[0];
  return { deck_id: deckId, value, image };
};

export { drawCardsFromPile, startSpeed, createDeckAndDraw, redrawCardFromDeck };
