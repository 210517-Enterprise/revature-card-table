//Author: Nick Gianino
import { useState, useEffect } from "react";
import "../CSS/War.css";

import axios from "axios";

const Card = ({ image }) => {
  return (
    <div>
      <img id={Card.code} src={image} alt="card"></img>
    </div>
  );
};

export default function War({ token }) {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [AiDeck, setAiDeck] = useState([]);
  const [turn, nextTurn] = useState(0);
  const [data, updateData] = useState([]);
  const [isWarGoing, updateWarGoing] = useState(false);
  const [currentWinner, updateWinner] = useState(`Fight to find out!`);
  const [playerScore, updatePlayerScore] = useState(0);
  const [aiScore, updateAiScore] = useState(0);
  const [string, updateString] = useState(null);
  const [gameWinner, setGameWinner] = useState(null);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  const start = Date.now();

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(async () => {
    //1. pull data from api
    await axios
      .get("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
      .then((response) => {
        updateData(response.data.cards);
        setPlayerDeck(data.slice(0, 25));
        setAiDeck(data.slice(26, 51));
        console.log(playerDeck);
        console.log(AiDeck);
      });
  }, [isWarGoing]);

  //method used for the start and reset button
  function startGame() {
    updateString(null);
    setPlayerDeck(null);
    setAiDeck(null);
    nextTurn(0);
    updatePlayerScore(0);
    updateAiScore(0);
    updateWarGoing(!isWarGoing);
  }

  function assessValue() {
    let holder3 = 0;
    let holder32 = 0;

    holder3 = playerDeck[0].value;
    holder32 = AiDeck[0].value;

    if (holder3 == "JACK") {
      holder3 = "11";
    }
    if (holder3 == "QUEEN") {
      holder3 = "12";
    }
    if (holder3 == "KING") {
      holder3 = "13";
    }
    if (holder3 == "ACE") {
      holder3 = "14";
    }
    if (holder32 == "JACK") {
      holder32 = "11";
    }
    if (holder32 == "QUEEN") {
      holder32 = "12";
    }
    if (holder32 == "KING") {
      holder32 = "13";
    }
    if (holder32 == "ACE") {
      holder32 = "14";
    }

    console.log(`Player:${holder3}`);
    console.log(`AI:${holder32}`);
    //player > AI
    holder3 = parseInt(holder3, 10);
    holder32 = parseInt(holder32, 10);
    if (holder3 > holder32) {
      playerDeck.push(AiDeck[0]);
      playerDeck.push(playerDeck[0]);

      updateWinner(`Player Wins!`);
      updatePlayerScore(playerScore + 1);
    } //if computer > player
    else if (holder32 > holder3) {
      AiDeck.push(playerDeck[0]);
      AiDeck.push(AiDeck[0]);

      updateWinner(`AI Wins!`);
      updateAiScore(aiScore + 1);
    } else {
      updateWinner(`DRAW! Both Cards lost!`);
    }

    updateString(
      <div className="PlayerCard">
              
        <h2 className="return">
          Player Card Remaining {playerDeck.length} | Player Score: 
          {playerScore}
        </h2>
              <img src={playerDeck[0].image} style={{ width: "175px", margin:"auto"}}></img>
              
        <div>
                    
          <h2 className="return">Previous Round Winner: {currentWinner}</h2>
                
        </div>
              
        <div className="AICard">
                  
          <h2 className="return">
            Computer Card Remaining: {AiDeck.length} | AI Score: {aiScore}
          </h2>
                  <img src={AiDeck[0].image} style={{ width: "175px", margin:"auto" }}></img>
                
        </div>
                
      </div>
    );
  }

  function UpdateLeaderboardLoss() {
    let timeLapsedInMilliseconds = Date.now() - start;
    let timeLapsedInSecond = Math.floor(timeLapsedInMilliseconds / 1000);
    let hours = Math.floor(timeLapsedInSecond / 3600);
    let minutes = Math.floor(timeLapsedInSecond / 60);
    let seconds = timeLapsedInSecond % 60;

    let timer = hours + ":" + minutes + ":" + seconds;

    
    let math = (playerScore / turn) * 100

    axios
      .get(`http://localhost:8080/revature-card-table/users/${token.username}`)
      .then((response) => {
        console.log(response);
        let stats = {
          user: {
            user_id: token.id,
            username: token.username,
            password: response.data.password,
            firstName: token.first_name,
            lastName: token.last_name,
            securityQuestion: response.data.securityQuestion,
            securityAnswer: response.data.securityAnswer,
          },
          points: math,
          won: false,
          datePlayed: today,
          timeCompleted: timer,
          gameName: "War",
        };

        console.log(stats);

        axios
          .post(
            "http://localhost:8080/revature-card-table/leaderboard/create",
            JSON.stringify(stats),
            { headers }
          )
          .then((response) => {
            console.log(response);
          });
      });
  }

  function UpdateLeaderboardWin() {
    let timeLapsedInMilliseconds = Date.now() - start;
    let timeLapsedInSecond = Math.floor(timeLapsedInMilliseconds / 1000);
    let hours = Math.floor(timeLapsedInSecond / 3600);
    let minutes = Math.floor(timeLapsedInSecond / 60);
    let seconds = timeLapsedInSecond % 60;

    let timer = hours + ":" + minutes + ":" + seconds;

    let math = (playerScore / turn) * 100

    axios
      .get(`http://localhost:8080/revature-card-table/users/${token.username}`)
      .then((response) => {
        console.log(response);
        let stats = {
          user: {
            user_id: token.id,
            username: token.username,
            password: response.data.password,
            firstName: token.first_name,
            lastName: token.last_name,
            securityQuestion: response.data.securityQuestion,
            securityAnswer: response.data.securityAnswer,
          },
          points: math,
          won: true,
          datePlayed: today,
          timeCompleted: timer,
          gameName: "War",
        };

        console.log(stats);

        axios
          .post(
            "http://localhost:8080/revature-card-table/leaderboard/create",
            JSON.stringify(stats),
            { headers }
          )
          .then((response) => {
            console.log(response);
          });
      });
  }

  //method iterates turn upwards, then assess cards
  function fight() {
    if (playerDeck.length == 0) {
      setGameWinner("AI!");
      updateString(
        <div className="PlayerCard">
                <h2>WINNER IS: {gameWinner}</h2>
        </div>
      );
      UpdateLeaderboardLoss();
    } else if (AiDeck.length == 0) {
      setGameWinner("Player!");
      updateString(
        <div className="PlayerCard">
                <h2>WINNER IS: {gameWinner}</h2>
        </div>
      );
      UpdateLeaderboardWin();
    } else {
      assessValue();
    }
    nextTurn(turn + 1);

    console.log(turn);
    AiDeck.shift();
    playerDeck.shift();
  }

  const fadeIn = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0 },
  };

  return string === null ? (
    <>
      <div id="page-layout" class="container-fluid">
        <div id="game-area">
          <h2 className="return">Current Wave: {turn}</h2>
          <button id="war-button" onClick={startGame} className="return">
            Start the WAR!
          </button>
          <br />
          <button id="war-button" onClick={fight} className="return">
            Fight Wave!
          </button>
          <h1 className="return">Start the War!</h1>
        </div>
      </div>
    </>
  ) : (
    <>
      <div id="page-layout" class="container-fluid">
        <div id="game-area">
          <row>
            
              <h3 className="return">Current Wave: {turn}</h3>
            
          </row>
          <row>
            <button id="war-button" onClick={startGame} className="return">
              Restart War
            </button>
            <br/>
            <button id="war-button" onClick={fight} className="return">
              Battle Computer
            </button>
          </row>
          {string}
        </div>
      </div>
    </>
  );
}
