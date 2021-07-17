import { startSpeed } from "../api.js";
import { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../CSS/Speed.scss"

export default function Speed() {
    const [playerDeck, setPlayerDeck] = useState([]);
    const [computerDeck, setComputerDeck] = useState([]);
    const [centerDeck, setCenterDeck] = useState([]);
    const [gameStatus, setGameStatus] = useState(false);
    const [chosen, setChosen] = useState();
    //const [computerMoving, setComputerMoving] = useState(false);

    const computerIsMoving = useRef(false);
    const globalIdx = useRef(-2);


    const startGame = async () => {
        const { playerDeck: d1, computerDeck: d2, middleDeck: d3 } = await startSpeed();
        //Set card arrays
        setPlayerDeck(d1.piles.playerDeck.cards);
        setComputerDeck(d2.piles.computerDeck.cards);

        //Game has started
        setGameStatus(true);

        setCenterDeck(d3.piles.middleDeck.cards);
    }

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
    }

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

        if ((valChosen === up) || (valChosen === down)) {
            replaceAndDraw(currCard);
        }
    }

    const replaceAndDraw = (midCard) => {
        let idxChosen = playerDeck.indexOf(chosen);
        let idxMid = centerDeck.indexOf(midCard);

        let centerCopy = JSON.parse(JSON.stringify(centerDeck));
        let playerCopy = JSON.parse(JSON.stringify(playerDeck));

        let playerCard = playerCopy.find(card => card.code === chosen.code);

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
    }

    const replaceAndDrawComputer = (computerCard, midCard) => {
        let idxComputer = computerDeck.indexOf(computerCard);
        let idxMid = centerDeck.indexOf(midCard);

        let centerCopy = JSON.parse(JSON.stringify(centerDeck));
        let computerCopy = JSON.parse(JSON.stringify(computerDeck));

        let compCard = computerCopy.find(card => card.code === computerCard.code);

        //Push mid card to end
        centerCopy.push(centerCopy.splice(idxMid, 1)[0]);

        //Place card on top
        centerCopy.splice(idxMid, 0, compCard);
        computerCopy.splice(idxComputer, 1);

        //Change state
        setComputerDeck(computerCopy);
        setCenterDeck(centerCopy);
    }

    const [noPlayerMoves, setNoPlayerMoves] = useState(false);
    const [noComputerMoves, setNoComputerMoves] = useState(false);



    useEffect(() => {
        if (gameStatus && playerDeck.length === 0) {
            //Push to leaderboard
            //push leaderboard info here with axios
            alert("You've won!");
            setGameStatus(false);
        }
    }, [playerDeck, gameStatus])

    //WHEN GAME STARTS, COMPUTER STARTS MOVING
    useEffect(() => {
        console.log("HELLO");
        setNoComputerMoves(false);
        //IF GAME IS ONGOING THEN MOVE
        if (gameStatus) {
            //SET TIMEOUT, START MOVING AFTER 2 SECONDS
            let timerFunc = setTimeout(() => {
                computerMove();
            }, 2000);
            //CANCEL TIMEOUT EVERYTIME CENTERDECK WILL CHANGE
            return () => clearTimeout(timerFunc);
        }
    }, [centerDeck])

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
                if ((value === up) || (value === down)) {
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
    }

    useEffect(() => {
        console.log(noPlayerMoves);
        console.log(noComputerMoves);
        if (noPlayerMoves && noComputerMoves) {
            console.log("No more moves for players");
            noMoreMoves();
        }
    }, [noPlayerMoves, noComputerMoves])

    const toggle = (e) => {
        setNoPlayerMoves(!noPlayerMoves)
    }

    const noMoreMoves = () => {
        let centerCopy = JSON.parse(JSON.stringify(centerDeck));
        let topCards = centerCopy.splice(0, 2);
        centerCopy.push(topCards[0], topCards[1]);

        setNoPlayerMoves(false);
        setNoComputerMoves(false);
        setCenterDeck(centerCopy);
    }

    const handleClickCard = (card) => {
        console.log("hello here");
        setChosen(card);
    }

    return (
        <>

            {!gameStatus && <button onClick={startGame}>Click Me</button>}

            <Container className="vh-100 d-flex flex-column">
                <Row className="h-50">
                    {!!computerDeck.length && <>
                        <Col>
                            <div className="computerDeck">
                                <img width="200" height="200" src="https://www.kindpng.com/picc/m/153-1537437_playing-card-back-png-transparent-png.png"></img>
                                <p>Computer Cards remaining: {computerDeck.length}</p>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="computerHand">
                                {computerDeck.slice(0, 5).map((currCard) => {
                                    return <div className="computer" style={{ backgroundImage: `url("https://www.kindpng.com/picc/m/153-1537437_playing-card-back-png-transparent-png.png")` }}></div>
                                })}
                            </div>
                        </Col>
                    </>}
                </Row>

                <Row className="h-25">
                    {!!centerDeck.length && <>
                        <Col className="d-flex justify-content-center">
                            {centerDeck.slice(0,1).map((currCard) => {
                                return <div className="middle" onClick={() => compareValues(currCard)} style={{ backgroundImage: `url("${currCard.image}")` }}></div>
                            })}

                        </Col>
                        <Col className="d-flex justify-content-center">
                            {noComputerMoves && <p>No more computer moves!</p>}
                        </Col>
                        <Col className="d-flex justify-content-center">
                        {centerDeck.slice(1, 2).map((currCard) => {
                                return <div className="middle" onClick={() => compareValues(currCard)} style={{ backgroundImage: `url("${currCard.image}")` }}></div>
                            })}
                        </Col>
                    </>}
                </Row>

                <Row className="h-25">
                    {!!playerDeck.length && <>

                        <Col xs={6}>
                            <div className="hand">
                                {playerDeck.slice(0, 5).map((currCard) => {
                                    return <div className={currCard === chosen ? "test2" : "test"} onClick={() => handleClickCard(currCard)} style={{ backgroundImage: `url("${currCard.image}")` }}></div>
                                })}
                            </div>
                        </Col>
                        <Col>
                            <div className="playerDeck">
                                <img width="200" height="200" src="https://www.kindpng.com/picc/m/153-1537437_playing-card-back-png-transparent-png.png"></img>
                                <p>Player Cards remaining: {playerDeck.length}</p>
                            </div>

                        </Col>
                    </>}
                </Row>

                <Row>
                    <Col>
                        {!!gameStatus && <button style={{ backgroundColor: noPlayerMoves ? "#ff0000" : "#39D1B4" }} onClick={toggle}>No More Moves</button>}
                    </Col>
                </Row>


            </Container>
        </>
    );
}