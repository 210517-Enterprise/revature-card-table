import { useState, useEffect } from "react";
import axios from "axios";
import CardBack from "../Images/design2.png"
import "../CSS/MatchingGame.css"
import TransparentCard from "../Images/TransparentCard.png"

export default function SingleMatchingGame({ token }){
    const [ userMoves, updateUserMoves ] = useState(0);
    const [ cards, updateCards ] = useState(null);
    const [ matches, updateMatches ] = useState(0);

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
            document.getElementById("userPlayResult").innerText = "MATCH!";

            updateMatches(matches + 1);
            console.log(matches + " matches found");

            //add some animation to the cards...
            setTimeout(removeCards, 1000);
            setTimeout(() => {document.getElementById("userPlayResult").innerText = " "}, 1000);

        }
        else{
            document.getElementById("userPlayResult").innerText = "Not a match...";
            console.log("Not matching these cards!")

            setTimeout(resetCards, 1500);
            setTimeout(() => {document.getElementById("userPlayResult").innerText = " "}, 1000);
        }

        console.log(cards);
        cardsFlipped = 0;

        if(matches === 13){
            let timeLapsedInMilliseconds = Date.now() - start;
            let timeLapsedInSecond = Math.floor(timeLapsedInMilliseconds/1000);
            let hours = Math.floor(timeLapsedInSecond/3600);
            let minutes = Math.floor(timeLapsedInSecond /60);
            let seconds = timeLapsedInSecond % 60;

            let timer = hours + ":" + minutes + ":" + seconds;
            

            window.alert(`Game completed in ${userMoves} moves`);

            axios.get(`http://localhost:8080/revature-card-table/users/${token.username}`)
            .then((response) => {
                let stats = {
                    "user": {
                        "user_id": response.data.id,
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

                axios.post("http://localhost:8080/revature-card-table/leaderboard/create",
                JSON.stringify(stats), { headers })
                .then((response) => {
                    console.log(response);
                    //history.push("/");
                  })
            })

            



        }
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

        empty.width = card1.width;
        empty.height = card1.height;
        let data1 = document.getElementById(`data${usersCards[0].cardID}`);

        data1.replaceChild(empty, card1);
        //console.log(data1);

        let card2 = document.getElementById(usersCards[1].cardID);
        let data2 = document.getElementById(`data${usersCards[1].cardID}`);
        data2.replaceChild(empty, card2);
    }                                 

    return (
        <>
            <div id="page-layout" class="container-fluid">
                <div id="game-area">
                    <div class="card-table-div">

                        <table cellSpacing="0">
                            <tr>
                                <td id="data0"><img id="0" onClick={flip} src={CardBack} width/></td>
                                <td id="data1"><img id="1" onClick={flip} src={CardBack} /></td>
                                <td id="data2"><img id="2" onClick={flip} src={CardBack} /></td>
                                <td id="data3"><img id="3" onClick={flip} src={CardBack} /></td>
                                <td id="data4"><img id="4" onClick={flip} src={CardBack} /></td>
                                <td id="data5"><img id="5" onClick={flip} src={CardBack} /></td>
                                <td id="data6"><img id="6" onClick={flip} src={CardBack} /></td>
                            </tr>
                            <tr>
                                <td id="data7"><img id="7" onClick={flip} src={CardBack} /></td>
                                <td id="data8"><img id="8" onClick={flip} src={CardBack} /></td>
                                <td id="data9"><img id="9" onClick={flip} src={CardBack} /></td>
                                <td id="data10"><img id="10" onClick={flip} src={CardBack} /></td>
                                <td id="data11"><img id="11" onClick={flip} src={CardBack} /></td>
                                <td id="data12"><img id="12" onClick={flip} src={CardBack} /></td>
                                <td id="data13"><img id="13" onClick={flip} src={CardBack} /></td>
                            </tr>
                            <tr>
                                <td id="data14"><img id="14" onClick={flip} src={CardBack} /></td>
                                <td id="data15"><img id="15" onClick={flip} src={CardBack} /></td>
                                <td id="data16"><img id="16" onClick={flip} src={CardBack} /></td>
                                <td id="data17"><img id="17" onClick={flip} src={CardBack} /></td>
                                <td id="data18"><img id="18" onClick={flip} src={CardBack} /></td>
                                <td id="data19"><img id="19" onClick={flip} src={CardBack} /></td>
                                <td id="data20"><img id="20" onClick={flip} src={CardBack} /></td>
                            </tr>
                            <tr>
                                <td id="data21"><img id="21" onClick={flip} src={CardBack} /></td>
                                <td id="data22"><img id="22" onClick={flip} src={CardBack} /></td>
                                <td id="data23"><img id="23" onClick={flip} src={CardBack} /></td>
                                <td id="data24"><img id="24" onClick={flip} src={CardBack} /></td>
                                <td id="data25"><img id="25" onClick={flip} src={CardBack} /></td>
                                <td id="data26"><img id="26" onClick={flip} src={CardBack} /></td>
                                <td id="data27"><img id="27" onClick={flip} src={CardBack} /></td>
                            </tr>
                        </table>
                    </div>

                    <br/>
                    
                    <div class="user-view-div">
                        <h3>Total Matches Tried: {userMoves}</h3>
                        <h3 id="userPlayResult"></h3>
                    </div>

                </div>

            </div>

        </>
    )
}