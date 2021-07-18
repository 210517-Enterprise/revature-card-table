import { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import axios from "axios";
import CardBack from "../Images/design2.png"
import "../CSS/MatchingGame.css"
import TransparentCard from "../Images/TransparentCard.png"
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

export default function SingleMatchingGame({ token }){
    const [ userMoves, updateUserMoves ] = useState(0);
    const [ cards, updateCards ] = useState(null);
    const [ matches, updateMatches ] = useState(0);
    const [gameOver, updateGameOver ] = useState(false);
    const history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    let cardsFlipped = 0;
    let usersCards = [null, null];
    const start = Date.now();

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    

    useEffect(() => {
        axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/", {
            params: {
              cards: "AS,AD,2D,2C,3S,3C,4H,4S,5D,5C,6S,6H,7H,7C,8D,8S,9H,9D,0C,0S,JH,JC,QH,QS,KD,KC,KH,KS"
        }})
        .then((response) => axios.get(`https://deckofcardsapi.com/api/deck/${response.data.deck_id}/draw`,{
            params: {
                count: response.data.remaining
            }
        }))
        .then((response) => {
            console.log(response.data.cards);
            console.log("new cards!!!!!!!!!!!!!!!!!!!")
            updateCards(response.data.cards);
        })
    }, []);



    function flip(){
        if(cardsFlipped < 1){
            let cardImg = window.event.srcElement;
            
            let intID = parseInt(cardImg.id, 10);

            usersCards[cardsFlipped] = { 
                card : cards[intID],
                cardID: cardImg.id
            }
            cardImg.src = cards[intID].image;
            cardsFlipped++;
        }
        else if(cardsFlipped < 2){
            let cardImg = window.event.srcElement;
            let intID = parseInt(cardImg.id, 10);
            
            if(usersCards[cardsFlipped-1].card !== cards[intID]){
                usersCards[cardsFlipped] = { 
                    card : cards[intID],
                    cardID: cardImg.id
                }

                cardImg.src = cards[intID].image;
                cardsFlipped++;
                playMatch();
            }
        }
    }

    function playMatch(){
        updateUserMoves(userMoves+1);

        if(usersCards[0].card.value === usersCards[1].card.value){
            console.log("Matching these cards!")
            document.getElementById("userPlayResult").innerText = "Match!";

            updateMatches(matches + 1);
            console.log(matches + " matches found");

            if(matches === 13){
                console.log("GAME OVER")
                let timeLapsedInMilliseconds = Date.now() - start;
                let timeLapsedInSecond = Math.floor(timeLapsedInMilliseconds/1000);
                let hours = Math.floor(timeLapsedInSecond/3600);
                let minutes = Math.floor(timeLapsedInSecond /60);
                let seconds = timeLapsedInSecond % 60;
    
                let timer = hours + ":" + minutes + ":" + seconds;
    
                console.log(timer);
                console.log(token);
                
    
                //window.alert(`Game completed in ${userMoves} moves`);
    
                axios.get(`http://localhost:8080/revature-card-table/users/${token.username}`)
                .then((response) => {
                    console.log(response)
                    let stats = {
                        "user": {
                            "user_id": token.id,
                            "username": token.username,
                            "password": response.data.password,
                            "firstName": token.first_name,
                            "lastName": token.last_name,
                            "securityQuestion": response.data.securityQuestion,
                            "securityAnswer": response.data.securityAnswer
                        },
                        "points": userMoves,
                        "won": true,
                        "datePlayed": today,
                        "timeCompleted": timer,
                        "gameName": "matching-game"
                    }
    
                    console.log(stats);
    
                    axios.post("http://localhost:8080/revature-card-table/leaderboard/create",
                    JSON.stringify(stats), { headers })
                    .then((response) => {
                        console.log(response);
                        updateGameOver(true);
                      })
                })
            }
            else{setTimeout(removeCards, 1000);
            setTimeout(() => {document.getElementById("userPlayResult").innerText =
             "~~~~~~~~~~Memory Match~~~~~~~~~~"}, 2000);
        }

        }
        else{
            document.getElementById("userPlayResult").innerText = "Not a match...";
            console.log("Not matching these cards!")

            setTimeout(resetCards, 1000);
            setTimeout(() => {document.getElementById("userPlayResult").innerText = "~~~~~~~~~~Memory Match~~~~~~~~~~"}, 2000);
        }

        console.log(cards);
        cardsFlipped = 0;

        
    }

    function resetCards(){

        let card2 = document.getElementById(usersCards[1].cardID);
        card2.src=CardBack;
        console.log("flipped card 2: " + card2.id);
        
        let card1 = document.getElementById(usersCards[0].cardID);
        card1.src=CardBack;
        console.log("flipped card 1: " + card1.id);
        
    }

    function removeCards(){
        let empty = document.createElement("img");
        empty.src=TransparentCard;
        empty.id = "emptyImg";

        let card1 = document.getElementById(usersCards[0].cardID);
        let data1 = document.getElementById(`data${usersCards[0].cardID}`);

        data1.replaceChild(empty, card1);
        //console.log(data1);

        let card2 = document.getElementById(usersCards[1].cardID);
        let data2 = document.getElementById(`data${usersCards[1].cardID}`);
        data2.replaceChild(empty, card2);
    }   

    function GoHome(){
        history.push("/");
    }
    

    return (
        <>

            <div id="page-layout" class="container-fluid">

                    <div id="table">
                        
                        {gameOver ?
                        (
                            <>
                                <Alert id="alert" variant="primary" style={{backgroundColor: "#1d1d35", color: "white"}}>
                                    You won after {userMoves} guesses!

                                    {/* <Button onClick={SingleMatchingGame}>Play Again</Button>
                                    <Button onClick={GoHome}>Home</Button> */}
                                </Alert>

                                <h3 id="userPlayResult">~~~~~~~~~~Concentration~~~~~~~~~~</h3>

                                <table cellSpacing="0">
                                    <tr>
                                        <td id="data0"><img id="0"  src={CardBack} /></td>
                                        <td id="data1"><img id="1"  src={CardBack} /></td>
                                        <td id="data2"><img id="2"  src={CardBack} /></td>
                                        <td id="data3"><img id="3"  src={CardBack} /></td>
                                        <td id="data4"><img id="4"  src={CardBack} /></td>
                                        <td id="data5"><img id="5"  src={CardBack} /></td>
                                        <td id="data6"><img id="6"  src={CardBack} /></td>
                                    </tr>
                                    <tr>
                                        <td id="data7"><img id="7"  src={CardBack} /></td>
                                        <td id="data8"><img id="8"  src={CardBack} /></td>
                                        <td id="data9"><img id="9"  src={CardBack} /></td>
                                        <td id="data10"><img id="10"  src={CardBack} /></td>
                                        <td id="data11"><img id="11"  src={CardBack} /></td>
                                        <td id="data12"><img id="12"  src={CardBack} /></td>
                                        <td id="data13"><img id="13"  src={CardBack} /></td>
                                    </tr>
                                    <tr>
                                        <td id="data14"><img id="14"  src={CardBack} /></td>
                                        <td id="data15"><img id="15"  src={CardBack} /></td>
                                        <td id="data16"><img id="16"  src={CardBack} /></td>
                                        <td id="data17"><img id="17"  src={CardBack} /></td>
                                        <td id="data18"><img id="18"  src={CardBack} /></td>
                                        <td id="data19"><img id="19" src={CardBack} /></td>
                                        <td id="data20"><img id="20"  src={CardBack} /></td>
                                    </tr>
                                    <tr>
                                        <td id="data21"><img id="21"  src={CardBack} /></td>
                                        <td id="data22"><img id="22"  src={CardBack} /></td>
                                        <td id="data23"><img id="23"  src={CardBack} /></td>
                                        <td id="data24"><img id="24"  src={CardBack} /></td>
                                        <td id="data25"><img id="25"  src={CardBack} /></td>
                                        <td id="data26"><img id="26"  src={CardBack} /></td>
                                        <td id="data27"><img id="27"  src={CardBack} /></td>
                                    </tr>
                                </table>
                            </>
                        
                        ) : (
                            <>
                            <div class="card-table-div">

                                <h3 id="userPlayResult">~~~~~~~~~~Concentration~~~~~~~~~~</h3>

                                <table cellSpacing="0">
                                    <tr>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data0"><img id="0" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data1"><img id="1" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data2"><img id="2" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data3"><img id="3" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data4"><img id="4" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data5"><img id="5" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data6"><img id="6" onClick={flip} src={CardBack} /></motion.td>
                                    </tr>
                                    <tr>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data7"><img id="7" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data8"><img id="8" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data9"><img id="9" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data10"><img id="10" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data11"><img id="11" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data12"><img id="12" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data13"><img id="13" onClick={flip} src={CardBack} /></motion.td>
                                    </tr>
                                    <tr>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data14"><img id="14" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data15"><img id="15" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data16"><img id="16" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data17"><img id="17" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data18"><img id="18" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data19"><img id="19" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data20"><img id="20" onClick={flip} src={CardBack} /></motion.td>
                                    </tr>
                                    <tr>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data21"><img id="21" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data22"><img id="22" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data23"><img id="23" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data24"><img id="24" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data25"><img id="25" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data26"><img id="26" onClick={flip} src={CardBack} /></motion.td>
                                        <motion.td whileHover={{ scale: 1.05 }}  whileTap={{ scale: 0.9 }} id="data27"><img id="27" onClick={flip} src={CardBack} /></motion.td>
                                    </tr>
                                </table>
                            </div>

                            <br/>

                            <div class="user-view-div" style={{textAlign: "left"}}>
                                <p>
                                    <strong>Number of Guesses: </strong> 
                                    {userMoves}
                                </p>
                                <p>
                                    <strong>Matches Made: </strong>
                                    {matches}
                                </p>
                            </div>
                            </>
                    )}
                    </div>
                

            </div>

        </>
    )
}



