import { startSpeed } from "../api.js";
import { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../CSS/Speed.scss";
import axios from "axios";
import cardBack from "../Images/cardBack.png";
export default function Speed({ username }) {
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [centerDeck, setCenterDeck] = useState([]);
  const [gameStatus, setGameStatus] = useState(false);
  const [chosen, setChosen] = useState();
  //const [computerMoving, setComputerMoving] = useState(false);

  const computerIsMoving = useRef(false);
  const globalIdx = useRef(-2);

  const startGame = async () => {
    const {
      playerDeck: d1,
      computerDeck: d2,
      middleDeck: d3,
    } = await startSpeed();
    //Set card arrays
    setPlayerDeck(d1.piles.playerDeck.cards);
    setComputerDeck(d2.piles.computerDeck.cards);

    //Game has started
    setGameStatus(true);

    setCenterDeck(d3.piles.middleDeck.cards);
  };

  const parseValue = (card) => {
    let valChosen;
    switch (card.value) {
      case "JACK":
        valChosen = 11;
        break;
      case "QUEEN":
        valChosen = 12;
        break;
      case "KING":
        valChosen = 13;
        break;
      case "ACE":
        valChosen = 14;
        break;
      default:
        valChosen = parseInt(card.value);
        break;
    }
    return valChosen;
  };

  const compareValues = (currCard) => {
    if (!chosen) {
      return;
    }

    let valChosen = parseValue(chosen);
    let valCurrCard = parseValue(currCard);

    let up;
    let down;
    if (valCurrCard === 14) {
      up = 2;
      down = 13;
    } else if (valCurrCard === 2) {
      up = 3;
      down = 14;
    } else {
      up = valCurrCard + 1;
      down = valCurrCard - 1;
    }

    if (valChosen === up || valChosen === down) {
      replaceAndDraw(currCard);
    }
  };

  const replaceAndDraw = (midCard) => {
    let idxChosen = playerDeck.indexOf(chosen);
    let idxMid = centerDeck.indexOf(midCard);

    let centerCopy = JSON.parse(JSON.stringify(centerDeck));
    let playerCopy = JSON.parse(JSON.stringify(playerDeck));

    let playerCard = playerCopy.find((card) => card.code === chosen.code);

    //Push mid card to end
    centerCopy.push(centerCopy.splice(idxMid, 1)[0]);

    //Place card on top
    centerCopy.splice(idxMid, 0, playerCard);
    playerCopy.splice(idxChosen, 1);

    //Change state

    setPlayerDeck(playerCopy);

    //WHEN YOU MOVE THEN COMPUTER SHOULD RESTART!!
    computerIsMoving.current = false;

    setCenterDeck(centerCopy);
  };

  const replaceAndDrawComputer = (computerCard, midCard) => {
    let idxComputer = computerDeck.indexOf(computerCard);
    let idxMid = centerDeck.indexOf(midCard);

    let centerCopy = JSON.parse(JSON.stringify(centerDeck));
    let computerCopy = JSON.parse(JSON.stringify(computerDeck));

    let compCard = computerCopy.find((card) => card.code === computerCard.code);

    //Push mid card to end
    centerCopy.push(centerCopy.splice(idxMid, 1)[0]);

    //Place card on top
    centerCopy.splice(idxMid, 0, compCard);
    computerCopy.splice(idxComputer, 1);

    //Change state
    setComputerDeck(computerCopy);
    setCenterDeck(centerCopy);
  };

  const [noPlayerMoves, setNoPlayerMoves] = useState(false);
  const [noComputerMoves, setNoComputerMoves] = useState(false);

  Date.prototype.today = function () {
    return (
      (this.getMonth() + 1 < 10 ? "0" : "") +
      (this.getMonth() + 1) +
      "/" +
      (this.getDate() < 10 ? "0" : "") +
      this.getDate() +
      "/" +
      this.getFullYear()
    );
  };

  Date.prototype.timeNow = function () {
    return (
      (this.getHours() < 10 ? "0" : "") +
      this.getHours() +
      ":" +
      (this.getMinutes() < 10 ? "0" : "") +
      this.getMinutes() +
      ":" +
      (this.getSeconds() < 10 ? "0" : "") +
      this.getSeconds()
    );
  };

  //     Date.prototype.timeNow = function () {
  //         let hours = this.getHours();
  //         let minutes = this.getMinutes();
  //         let seconds = this.getSeconds();
  //         let amOrPm = hours >= 12 ? 'PM' : 'AM';
  //         hours = hours % 12;
  //         hours = hours ? hours : 12; //hour 0 = 12
  //         minutes = minutes < 10 ? '0'+minutes : minutes;
  //         seconds = seconds < 10 ? '0'+seconds : seconds;
  //         return hours + ':' + minutes + ':' + seconds + ' ' + amOrPm;
  //    }

  useEffect(async () => {
    //Push to leaderboard
    if (gameStatus && (playerDeck.length === 0 || computerDeck.length === 0)) {
      setGameStatus(false);
      let userWin;
      let pointsWon;

      if (playerDeck.length === 0) {
        alert("You've won! :)");
        userWin = true;
        pointsWon = 100;
      } else if (computerDeck.length === 0) {
        alert("You've lost! :(");
        userWin = false;
        pointsWon = 0;
      }

      let date = new Date();
      let todaysDate = date.today();
      let timeNow = date.timeNow();

      const userFromDB = await axios.get(
        `http://localhost:8080/revature-card-table/users/${username}`
      );

      const gamestats = {
        user: userFromDB.data,
        points: pointsWon,
        won: userWin,
        datePlayed: todaysDate,
        timeCompleted: timeNow,
        gameName: "speed",
      };

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      axios
        .post(
          "http://localhost:8080/revature-card-table/leaderboard/create",
          JSON.stringify(gamestats),
          { headers }
        )
        .then((response) => {
          console.log(response);
        });
    }
  }, [playerDeck, computerDeck, gameStatus]);

  //WHEN GAME STARTS, COMPUTER STARTS MOVING
  useEffect(() => {
    console.log("HELLO");
    setNoComputerMoves(false);
    //IF GAME IS ONGOING THEN MOVE
    if (gameStatus && playerDeck.length !== 0) {
      //SET TIMEOUT, START MOVING AFTER 1.3 SECOND
      let timerFunc = setTimeout(() => {
        computerMove();
      }, 1300);
      //CANCEL TIMEOUT EVERYTIME CENTERDECK WILL CHANGE
      return () => clearTimeout(timerFunc);
    }
  }, [centerDeck]);

  const computerMove = () => {
    console.log("COMPUTER IS MOVING!!!!");
    let idx = 0;
    for (let computerCard of computerDeck) {
      let value = parseValue(computerCard);
      let replaced = false;

      for (let j = 0; j < 2; j++) {
        let centerCard = centerDeck[j];
        let valCenterCard = parseValue(centerCard);
        console.log("Comparing with: " + valCenterCard);

        let up;
        let down;

        if (valCenterCard === 14) {
          up = 2;
          down = 13;
        } else if (valCenterCard === 2) {
          up = 3;
          down = 14;
        } else {
          up = valCenterCard + 1;
          down = valCenterCard - 1;
        }
        if (value === up || value === down) {
          replaceAndDrawComputer(computerCard, centerCard);
          replaced = true;
          break;
        }
      }

      if (replaced) {
        console.log("I HAVE BROKEN OUT BECAUSE I REPLACED");
        break;
      }

      idx++;
      if (idx >= computerDeck.length - 1 || idx > 4) {
        console.log("Computer has no more moves!");
        setNoComputerMoves(true);
        break;
      }
    }

    console.log("COMPUTER IS DONE MOVING!!!");
  };

  useEffect(() => {
    console.log(noPlayerMoves);
    console.log(noComputerMoves);
    if (noPlayerMoves && noComputerMoves) {
      console.log("No more moves for players");
      noMoreMoves();
    }
  }, [noPlayerMoves, noComputerMoves]);

  const toggle = (e) => {
    setNoPlayerMoves(!noPlayerMoves);
  };

  const noMoreMoves = () => {
    let centerCopy = JSON.parse(JSON.stringify(centerDeck));
    let topCards = centerCopy.splice(0, 2);
    centerCopy.push(topCards[0], topCards[1]);

    setNoPlayerMoves(false);
    setNoComputerMoves(false);
    setCenterDeck(centerCopy);
  };

  const handleClickCard = (card) => {
    console.log("hello here");
    setChosen(card);
  };

  return (
    <>
      <div id="page-layout" class="container-fluid">
        {!gameStatus && <button onClick={startGame}>Click Me</button>}
        <div id="game-area">
          <Container className="vh-100 d-flex flex-column">
            <Row className="h-50">
              {!!computerDeck.length && (
                <>
                  <Col>
                    <div className="computerDeck">
                      <img
                        src={cardBack}
                        style={{ width: 170, height: 235.5, margin: "auto" }}
                      ></img>
                      <p id="display-cards-remaining">
                        | Computer Cards Remaining: {computerDeck.length} |
                      </p>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="computerHand">
                      {computerDeck.slice(0, 5).map((currCard) => {
                        return <div className="computer"></div>;
                      })}
                    </div>
                  </Col>
                </>
              )}
            </Row>

            <Row className="speed-middle-row">
              {!!centerDeck.length && (
                <>
                  <Col className="d-flex justify-content-center">
                    {centerDeck.slice(0, 1).map((currCard) => {
                      return (
                        <div
                          className="middle"
                          onClick={() => compareValues(currCard)}
                          style={{
                            backgroundImage: `url("${currCard.image}")`,
                          }}
                        ></div>
                      );
                    })}
                  </Col>
                  <Col className="d-flex justify-content-center">
                    {noComputerMoves && (
                      <p id="display-cards-remaining">
                        | No More Computer Moves! |
                      </p>
                    )}
                  </Col>
                  <Col className="d-flex justify-content-center">
                    {centerDeck.slice(1, 2).map((currCard) => {
                      return (
                        <div
                          className="middle"
                          onClick={() => compareValues(currCard)}
                          style={{
                            backgroundImage: `url("${currCard.image}")`,
                          }}
                        ></div>
                      );
                    })}
                  </Col>
                </>
              )}
            </Row>

            <Row className="speed-bottom-row">
              {!!playerDeck.length && (
                <>
                  <Col xs={6}>
                    <div className="hand">
                      {playerDeck.slice(0, 5).map((currCard) => {
                        return (
                          <div
                            className={currCard === chosen ? "test2" : "test"}
                            onClick={() => handleClickCard(currCard)}
                            style={{
                              backgroundImage: `url("${currCard.image}")`,
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </Col>
                  <Col>
                    <div className="playerDeck">
                      <img
                        src={cardBack}
                        style={{ width: 170, height: 235.5, margin: "auto" }}
                      ></img>
                      <p id="display-cards-remaining">
                        | Player Cards Remaining: {playerDeck.length} |
                      </p>
                    </div>
                  </Col>
                </>
              )}
            </Row>

            <Row>
              <Col>
                {!!gameStatus && (
                  <button
                    style={{
                      backgroundColor: noPlayerMoves ? "#ff0000" : "#39D1B4",
                    }}
                    onClick={toggle}
                  >
                    No More Moves
                  </button>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
