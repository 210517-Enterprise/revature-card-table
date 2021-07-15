import api from "axios";

function Player(name, currentDeckID, turnsWon) {//pl1/2, deck_id API, turnsWon, isTurn
    this.name = name;
    this.currentDeckID = currentDeckID;
    this.turnsWon = turnsWon;
    this.isTurn = isTurn;
}

var playerCard;
var botCard;

var player1 = new Player(Nick, "", 0);
//make 2 players, one will be the user, and the other will be the the computer playing againts you
function War(user) {

    //populat the users deck
    player1.currentDeckID = "1q3l0xtqr385";

    //pull the top card from the deck
    const DrawTopCard = async({deckID}) => {
        const{data} = await api.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
        
    }
        //display that card on the screen

        //


}

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