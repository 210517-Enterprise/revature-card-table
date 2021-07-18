import { useState, useEffect } from "react";

import axios from "axios";

const Card = ({ code, image }) => {
  return (
    <div>
      <img id={Card.code} src={image} alt="card"></img>
    </div>
  );
};

export default function War() {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [AiDeck, setAiDeck] = useState([]);
  const [turn, nextTurn] = useState(0);
  const [data, updateData] = useState([]);
  const [isWarGoing, updateWarGoing] = useState(false);
  const [currentWinner, updateWinner] = useState("Fight to find out!");
  const [playerScore, updatePlayerScore] = useState(0);
  const [aiScore, updateAiScore] = useState(0);
  const [string, updateString] = useState(null);

  useEffect(() => {
    //1. pull data from api
    axios
      .get("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
      .then((response) => {
        updateData(response.data.cards);
      });

    //2. populate the player's decks
    populateData(data);

    //3. reset states to default if method is being used for reset
    nextTurn(0);
    //assess inital winner
  }, [isWarGoing]);

  //function populates players + ai decks
  function populateData(data) {
    setPlayerDeck(data.slice(0, 25));
    setAiDeck(data.slice(26, 51));
  }

  //method used for the start and reset button
  function startGame() {
    updateWarGoing(!isWarGoing);
  }

  function assessString() {
    updateString(
      <div className="PlayerCard">
        <h2>
          Player Card Remaining {playerDeck.length} | Player Score:{" "}
          {playerScore}
        </h2>
        <img src={playerDeck[0].image}></img>
        <div>
          <h2>Round Winner: {currentWinner}</h2>
        </div>
        <div className="AICard">
          <h2>
            AI Card r: {AiDeck.length} | AI Score: {aiScore}
          </h2>
          <img src={AiDeck[0].image}></img>
        </div>
      </div>
    );
  }

  //method iterates turn upwards, then assess cards
  function fight() {
    if (AiDeck[0].value > playerDeck[0].value) {
      let holder = playerDeck[0];
      playerDeck.shift(0);

      let holder2 = AiDeck[0];
      AiDeck.shift();

      AiDeck.push(holder2);
      AiDeck.push(holder);

      updateWinner("AI Wins!");
      updateAiScore(aiScore + 1);
    } else if (playerDeck[0].value > AiDeck[0].value) {
      let holder = AiDeck[0];
      AiDeck.shift(0);

      let holder2 = playerDeck[0];
      playerDeck.shift();

      playerDeck.push(holder2);
      playerDeck.push(holder);

      updateWinner("Player Wins!");
      updatePlayerScore(playerScore + 1);
    } else {
      AiDeck.shift(0);
      playerDeck.shift(0);

      updateWinner("DRAW! Both Cards lost!");
    }
    nextTurn(turn + 1);

    console.log(turn);
  }

  return string === null ? (
    <>
      <div id="page-layout" class="container-fluid">
        <h3 className="TurnCounter">Current Wave: {turn}</h3>
        <button onClick={startGame}>Start the WAR!!!!!</button>
        <button onClick={fight}>Fight Wave!</button>
        <h1>Start the War!</h1>
      </div>
    </>
  ) : (
    <>
      <div id="page-layout" class="container-fluid">
        <h3 className="TurnCounter">Current Wave: {turn}</h3>
        <button onClick={startGame}>Start the WAR!!!!!</button>
        <button onClick={fight}>Fight Wave!</button>

        {string}
      </div>
    </>
  );
}
