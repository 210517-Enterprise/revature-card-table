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
  let i = 0;

  useEffect(async () => {
    console.log("warChanged");
    await axios
      .get("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
      .then(updateData);
    
    nextTurn(0);
    updateWinner(null)

    setPlayerDeck(data.data.cards.slice(0, 25))
    setAiDeck(data.data.cards.slice(26,51))
    console.log(playerDeck)
    console.log(AiDeck)
  }, [isWarGoing]);



  function startGame() {
    updateWarGoing(!isWarGoing);
  }



  
  function fight() {
    

    if(AiDeck[turn].value > playerDeck[turn].value){
      updateWinner("AI Wins!")
    
      
  } else if(playerDeck[turn].value > AiDeck[turn].value){
      updateWinner("Player Wins!")
      
  } else if(playerDeck[turn].value == AiDeck[turn].value){
      updateWinner("DRAW!")
  }
  nextTurn(turn + 1);
  }




  return data === undefined ? (
    <h1>IhateMyLife</h1>
  ) : (
    <>
      <h3 className="TurnCounter">Current Wave: {turn}</h3>
      <button onClick={startGame}>Start the WAR!!!!!</button>
      <button onClick={fight}>Fight Wave!</button>

      <div className="PlayerCard">
        <h2>Player Card Remaining</h2>
        <img src={playerDeck[turn].image}></img>
      </div>

      <div>
          <h2>Round Winner: {currentWinner}</h2>
      </div>

      <div className="AICard">
        <h2>AI Card</h2>
        <img src={AiDeck[turn].image}></img>
      </div>
    </>
  );
}
