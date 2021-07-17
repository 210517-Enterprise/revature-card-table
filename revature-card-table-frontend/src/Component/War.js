import { useState, useEffect } from "react";

import axios from "axios";

//const Card = ({code, image, value});

export default function War() {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [AiDeck, setAiDeck] = useState([]);
  const [turn, nextTurn] = useState(0);
  const [data, updateData] = useState([]);
  const [isWarGoing, updateWarGoing] = useState(false);
  const [currentWinner, updateWinner] = useState("Fight to find out!");
  

  useEffect(async () => {
    //1. pull data from api
    await axios
      .get("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
      .then(updateData);
    
    //2. populate the player's decks
    populateData(data);

    //3. reset states to default if method is being used for reset
    nextTurn(0);
    updateWinner(null)

  }, [isWarGoing]);

  //function populates players + ai decks
  function populateData(data) {
    setPlayerDeck(data.data.cards.slice(0, 25))
    setAiDeck(data.data.cards.slice(26,51))
    console.log(playerDeck)
    console.log(AiDeck)
  }

  //method used for the start and reset button
  function startGame() {
    updateWarGoing(!isWarGoing);
  }

  //method iterates turn upwards, then assess cards
  function fight() {
    console.log(turn);    
    updateWinner(null)

    if(AiDeck[turn].value > playerDeck[turn].value){
      updateWinner("AI Wins!")
      let holder = playerDeck[0];
      playerDeck.shift(0);
      AiDeck.push(holder)
    
  } else if(playerDeck[turn].value > AiDeck[turn].value){
      updateWinner("Player Wins!")
      let holder = AiDeck[0];
      AiDeck.shift(0)
      playerDeck.push(holder)
      
  } else if(playerDeck[turn].value == AiDeck[turn].value){
      updateWinner("DRAW!")
      
      AiDeck.shift(0);
      playerDeck.shift(0);
      
  }
  nextTurn(turn + 1);
  console.log(turn)
  }



//playerDeck.length == 0 || AiDeck.length==0
  return data === null ? (
    <h1>IhateMyLife</h1>
  ) : (
    <>
      <h3 className="TurnCounter">Current Wave: {turn}</h3>
      <button onClick={startGame}>Start the WAR!!!!!</button>
      <button onClick={fight}>Fight Wave!</button>

      <div className="PlayerCard">
        <h2>Player Card Remaining {playerDeck.length}</h2>
        <img src={playerDeck[turn].image}></img>
      </div>

      <div>
          <h2>Round Winner: {currentWinner}</h2>
      </div>

      <div className="AICard">
        <h2>AI Card r: {AiDeck.length}</h2>
        <img src={AiDeck[turn].image}></img>
      </div>
    </>
  );
}
