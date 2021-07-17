import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import CardBack from "../Images/design2.png"
import TransparentCard from "../Images/TransparentCard.png"

export default function MatchingGame(){
    const [ userPoints, updateUserPoints ] = useState(0);
    const [ cpuMatches, updateCpuMatches ] = useState(0);
    const [ cards, updateCards ] = useState(null);

    let cardsFlipped = 0;
    let usersCards = [null, null];

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
            updateCards(response.data.cards);
        })
    }, []);


    function flip(){
        if(cardsFlipped < 1){
            let cardImg = window.event.srcElement;
            console.log(cardsFlipped);
            usersCards[cardsFlipped] = { 
                card : cards[cardImg.id],
                cardID: cardImg.id
            }
            cardImg.src = cards[cardImg.id].image;
            cardsFlipped++;
            console.log(cardsFlipped)
        }
        else if(cardsFlipped < 2){
            let cardImg = window.event.srcElement;
            console.log(cardsFlipped);
            usersCards[cardsFlipped] = { 
                card : cards[cardImg.id],
                cardID: cardImg.id
            }
            cardImg.src = cards[cardImg.id].image;
            cardsFlipped++;
            playMatch();
        }
    }

    function playMatch(){
        console.log(usersCards[0]);
        if(usersCards[0].card.value === usersCards[1].card.value){
            updateUserPoints(userPoints+1);
            document.getElementById("userPlayResult").innerText = "MATCH!";
            removeCards();
        }
        else{
            document.getElementById("userPlayResult").innerText = "Not a match...";
            
        }

        cardsFlipped = 0;
    }

    function resetCards(){
        let card1 = document.getElementById(usersCards[0].cardID);
        card1.src=CardBack;
        let card2 = document.getElementById(usersCards[1].cardID);
        card2.src=CardBack;
    }

    function removeCards(){
        let empty = document.createElement("img");
        empty.src=TransparentCard;
        empty.height="110";
        empty.width="90";

        let card1 = document.getElementById(usersCards[0].cardID);

        let data1 = document.getElementById(`data${usersCards[0].cardID}`);
        console.log(data1);
        console.log(card1);
        console.log(empty);
        data1.replaceChild(empty, card1);
        console.log(data1);

        // let card2 = document.getElementById(usersCards[1].cardID);
        // card2.src=TransparentCard;
    }

    function cpuTurn(){
        document.getElementById(usersCards[0].cardID).src = CardBack;
        document.getElementById(usersCards[1].cardID).src = CardBack;
    }

    return (
        <>

            <div>
                <h3>Points: {userPoints}</h3>
                <h3 id="userPlayResult"></h3>
            </div>

            <div>

                <table>
                    <tr>
                        <td id="data0"><img id="0" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="1" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="2" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="3" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="4" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="5" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="6" onClick={flip} src={CardBack} width="90" height="110" /></td>
                    </tr>
                    <tr>
                        <td><img id="7" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="8" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="9" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="10" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="11" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="12" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="13" onClick={flip} src={CardBack} width="90" height="110" /></td>
                    </tr>
                    <tr>
                        <td><img id="14" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="15" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="16" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="17" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="18" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="19" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="20" onClick={flip} src={CardBack} width="90" height="110" /></td>
                    </tr>
                    <tr>
                        <td><img id="20" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="21" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="22" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="23" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="24" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="25" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td><img id="26" onClick={flip} src={CardBack} width="90" height="110" /></td>
                    </tr>
                </table>
            </div>
        </>
    )
}

