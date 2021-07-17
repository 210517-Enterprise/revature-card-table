import {drawCardsFromPile, startSpeed} from "../api.js";
import {useEffect, useState, useRef} from "react";
import "../CSS/Speed.css"

const Card = ({card, active1, image, onClick}) => {
    return (
        <div onClick={onClick} className={active1 ? "card active" : "card"}>
            <img id={card.code} src={image} alt="card" onClick={() => console.log(card.value)}/>
        </div>
    )
}

export default function Speed() {
    const [playerDeck, setPlayerDeck] = useState([]);
    const [computerDeck, setComputerDeck] = useState([]);
    const [centerDeck, setCenterDeck] = useState([]);
    const [gameStatus, setGameStatus] = useState(false);
    const [chosen, setChosen] = useState();
    //const [computerMoving, setComputerMoving] = useState(false);

    const computerIsMoving = useRef(false);
    const globalIdx = useRef(-2);

    //let globalIdx = -2;

    const startGame = async () => {
        const {playerDeck: d1, computerDeck: d2, middleDeck: d3} = await startSpeed();
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
            up = valCurrCard+1;
            down = valCurrCard-1;
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
        // globalIdx.current = -1;
        // computerIsMoving.current = false;

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

    // const timer = ms => new Promise(res => setTimeout(res, ms));

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
                    up = valCenterCard+1;
                    down = valCenterCard-1;
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
            if (idx >= computerDeck.length-1 || idx > 4) {
                console.log("Computer has no more moves!");
                setNoComputerMoves(true);
                break;
            }
        }

        console.log("COMPUTER IS DONE MOVING!!!");
    }

    // const computerMove = () => {
    //     console.log("COMPUTER IS MOVING!!!!")
    //     for (let i = 0; i < 5; i++) {
    //         let computerCard = computerDeck[i];
    //         let value = parseValue(computerCard);
    //         let replaced = false;

    //         for (let j = 0; j < 2; j++) {
    //             let centerCard = centerDeck[j];
    //             let valCurrCard = parseValue(centerCard);
    //             console.log("Comparing with: " + valCurrCard);
    
    //             let up;
    //             let down;
                    
    //             if (valCurrCard === 14) {
    //                 up = 2;
    //                 down = 13;
    //             } else if (valCurrCard === 2) {
    //                 up = 3;
    //                 down = 14;
    //             } else {
    //                 up = valCurrCard+1;
    //                 down = valCurrCard-1;
    //             }
    //             if ((value === up) || (value === down)) {
    //                 replaceAndDrawComputer(computerCard, centerCard);
    //                 replaced = true;
    //                 break;
    //             }
    //         }

    //         if (replaced) {
    //             console.log("I HAVE BROKEN OUT BECAUSE I REPLACED");
    //             break;
    //         }

    //         if (i === 4) {
    //             console.log("Computer has no more moves!");
    //             setNoComputerMoves(!noComputerMoves);
    //             break;
    //         }
    //     }

    //     console.log("COMPUTER IS DONE MOVING!!!!");
    // }

    // const computerMove = async () => {
    //     console.log("COMPUTER IS MOVING!!!!")
    //     globalIdx.current = 0;
    //     for (let i = 0; i < 5; i++) {
    //         let computerCard = computerDeck[i];
    //         let value = parseValue(computerCard);

    //         console.log("Value is: " + value + ". Waiting 1 seconds.");
    //         await timer(2000);

    //         //If center changed exit
    //         if (globalIdx.current === -1) {
    //             console.log("Center changed");
    //             break;
    //         }

    //         console.log("Checking cards");
    //         let replaced = false;

    //         for (let j = 0; j < 2; j++) {
    //             let centerCard = centerDeck[j];
    //             let valCurrCard = parseValue(centerCard);
    //             console.log("Comparing with: " + valCurrCard);
    
    //             let up;
    //             let down;
                    
    //             if (valCurrCard === 14) {
    //                 up = 2;
    //                 down = 13;
    //             } else if (valCurrCard === 2) {
    //                 up = 3;
    //                 down = 14;
    //             } else {
    //                 up = valCurrCard+1;
    //                 down = valCurrCard-1;
    //             }
    //             if ((value === up) || (value === down)) {
    //                 //If center changed exit
    //                 if (globalIdx.current === -1) {
    //                     console.log("Center changed2");
    //                     break;
    //                 }

    //                 replaceAndDrawComputer(computerCard, centerCard);
    //                 replaced = true;
    //                 break;
    //             }
    //         }

    //         if (replaced) {
    //             console.log("I HAVE BROKEN OUT BECAUSE I REPLACED");
    //             globalIdx.current = -1;
    //             break;
    //         }

    //         if (i === 4) {
    //             console.log("Computer has no more moves!");
    //             globalIdx.current = -1;
    //             setNoComputerMoves(!noComputerMoves);
    //             break;
    //         }

    //         //If center changed exit
    //         if (globalIdx.current === -1) {
    //             console.log("Center changed3");
    //             break;
    //         }
    //     }
    //     computerIsMoving.current = false;
    //     console.log("Computer is done moving");
    // };
    
    // //When game state changes, computer starts moving
    // useEffect (() => {
    //     console.log("HELLO");
    //     console.log(computerIsMoving.current);
    //     console.log(globalIdx);
    //     if (gameStatus) {
    //         //First run
    //         if (globalIdx.current === -2) {
    //             computerIsMoving.current = true;
    //             computerMove();
    //         } else if (globalIdx.current === -1) {
    //             //Player has moved
    //             if (!computerIsMoving.current) {
    //                 console.log("Computer is moving Again");
    //                 computerIsMoving.current = true;
    //                 computerMove();
    //             }
    //         }
    //     } 
    // }, [centerDeck, computerIsMoving])

    useEffect(() => {
        console.log(noPlayerMoves);
        console.log(noComputerMoves);
        if (noPlayerMoves && noComputerMoves) {
            console.log("No more moves for players");
            noMoreMoves();
        }
    }, [noPlayerMoves, noComputerMoves])
    

    //Computer Logic
    // useEffect(() => {
    //     //setComputerMoving(true);
    //     if (gameStatus) {
    //         setComputerMoving(false);
    //         console.log("Computer is moving");
    //         computerMove(centerDeck);
    //     }
    // }, [gameStatus]);

    // useEffect(async () => {
    //     if (gameStatus && !computerMoving){
    //         console.log("setcomputermoving to true");
    //         setComputerMoving(true);
    //         console.log(computerMoving);
    //         console.log("Waiting 10 seconds");
    //         await timer(10000);
    //         setComputerMoving(false);
    //     }
    // }, [centerDeck])

    // useEffect(() => {
    //     if (gameStatus && computerMoving) {
    //         console.log("test");
    //         computerMove();
    //     }
    // }, [computerMoving])

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

    return(
        <>
            <button onClick={startGame}>Click Me</button>
            <div className=""></div>
            <button style={{backgroundColor: noPlayerMoves ? "#ff0000" : "#39D1B4"}} onClick={toggle}>No More Moves</button>
            
            <div className="computerHand">
                
                {computerDeck.length ? 
                    <>
                    {computerDeck.slice(0, 5).map((currCard, i) => {
                        return <Card 
                            key={i}
                            card={currCard}
                            //image="https://static.wikia.nocookie.net/hearthstone_gamepedia/images/1/1a/Card_back-Classic.png"
                            image={currCard.image}
                        />})}
                        <p>Computer Cards remaining: {computerDeck.length}</p>
                    </> : <h1>Loading</h1>}
            </div>

            <div> {noComputerMoves && <p>No more computer moves</p>}</div>
            
            <div className="middleDeck">
                {centerDeck.length ? centerDeck.slice(0, 2).map((currCard, i) => {
                    return <Card 
                        key={i}
                        card={currCard}
                        image={currCard.image}
                        onClick={() => compareValues(currCard)}
                    />
                }) : <h1>Loading</h1>}
            </div>

            

            <div className="playerHand">
                
                {playerDeck.length ? 
                    <>
                    {playerDeck.slice(0, 5).map((currCard, i) => {
                        return <Card 
                            key={i}
                            card={currCard}
                            active={currCard === chosen}
                            image={currCard.image}
                            onClick={() => setChosen(currCard)}
                        />})}
                        <p>Player Cards remaining: {playerDeck.length}</p>
                    </> : <h1>Loading</h1>}
            </div>
        </>
    );

    // const [playerHand, setPlayerHand] = useState({
    //     cards: [],
    //     images: [],
    //     pileName: "",
    //     deckId: ""
    // });

    // const [leftDeck, setLeftDeck] = useState ({
    //     cards: [],
    //     images: [],
    //     pileName: "",
    //     deckId: ""
    // })

    // const[chosen, setChosen] = useState();
    // const[leftCard, setLeftCard] = useState();

    // const gameLogic = async () => {
    //     const deck = await startSpeed();

    //     const {cards, images, pileName, deckId} = await drawCardsFromPile(deck.deck_id, "playerHand", 5);
    //     const {cards: lcards, images: limages, pileName:lpileName, deckId:ldeckId} = await drawCardsFromPile(deck.deck_id, "leftDeck", 6);

    //     setPlayerHand({
    //         cards: cards,
    //         images: images,
    //         pileName: pileName,
    //         deckId: deckId
    //     });

    //     setLeftDeck({
    //         cards: lcards,
    //         images: limages,
    //         pileName: lpileName,
    //         deckId: ldeckId
    //     });
    // }

    // useEffect(() => {
    //     setLeftCard(leftDeck.cards[0]);
    // }, [leftDeck])


    // return(
    //     <>
    //         <button onClick={startGame}>Click Me</button>
    //         <h1>This is deck id: {playerHand.deckId}</h1>
    //         <div className="playerHand">
    //             {playerHand.cards.length ? playerHand.cards.map((currCard, i) => {
    //                 return <Card 
    //                     key={i}
    //                     card={currCard}
    //                     active={currCard === chosen}
    //                     image={currCard.image}
    //                     onClick={() => setChosen(currCard)}
    //                 />
    //             }) : <h1>Loading</h1>}
    //         </div>

    //         <div className="leftDeck">
    //             {leftCard ? <Card 
    //                     card={leftCard}
    //                     active=""
    //                     image={leftCard.image} 
    //                     onClick={() => compareValues(leftCard)}/>
                        
    //              : <h1>Loading</h1>}
    //         </div>
    //     </>
    // );
}