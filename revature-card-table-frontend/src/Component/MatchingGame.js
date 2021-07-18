import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import CardBack from "../Images/design2.png"
import TransparentCard from "../Images/TransparentCard.png"

export default function MatchingGame(){
    const [ userPoints, updateUserPoints ] = useState(0);
    const [ cpuPoints, updateCpuPoints ] = useState(0);
    const [ cards, updateCards ] = useState(null);
    const [ availableCards, updateAvailCards ] = useState(["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27"]);
    const [ cpuMemoryValues, updateCpuMemoryValues] = useState([]);
    const [ cpuMemory, updateCpuMemory] = useState([]);

    let cardsFlipped = 0;
    let usersCards = [null, null];
    let cpusCards = [null, null];
    

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


    console.log(availableCards);

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
        console.log("Playing match!")
        if(usersCards[0].card.value === usersCards[1].card.value){
            console.log("Matching these cards!")
            updateUserPoints(userPoints+1);
            document.getElementById("userPlayResult").innerText = "MATCH!";

            //add some animation to the cards...
            setTimeout(removeCards, 1000);
            availableCards.splice(availableCards.indexOf(usersCards[0].cardID), 1);
            availableCards.splice(availableCards.indexOf(usersCards[1].cardID), 1);
            updateAvailCards(availableCards);
            document.getElementById("userPlayResult").innerText = " ";

        }
        else{
            document.getElementById("userPlayResult").innerText = "Not a match...";
            console.log("Not matching these cards!")

            setTimeout(resetCards, 1500);
            document.getElementById("userPlayResult").innerText = " ";
        }

        console.log(cards);
        cardsFlipped = 0;
        //cpuTurn();
    }

    function resetCards(){

        let card2 = document.getElementById(usersCards[1].cardID);
        card2.src=CardBack;
        console.log("flipped card 2: " + card2.id);
        
        let card1 = document.getElementById(usersCards[0].cardID);
        card1.src=CardBack;
        console.log("flipped card 1: " + card1.id);

        cpuTurn();
        
    }

    function removeCards(){
        let empty = document.createElement("img");
        empty.src=TransparentCard;
        empty.height="110";
        empty.width="90";
        empty.id = "emptyImg";

        let card1 = document.getElementById(usersCards[0].cardID);
        let data1 = document.getElementById(`data${usersCards[0].cardID}`);

        data1.replaceChild(empty, card1);
        //console.log(data1);

        let card2 = document.getElementById(usersCards[1].cardID);
        let data2 = document.getElementById(`data${usersCards[1].cardID}`);
        data2.replaceChild(empty, card2);

        cpuTurn();
    }

    function cpuTurn(){
        cpuFlip();
        
        if(cpusCards[0].card.value === cpusCards[1].card.value){
            console.log("Matching these cards!")
            updateCpuPoints(cpuPoints+1);
            document.getElementById("cpuPlayResult").innerText = "MATCH!";

            //add some animation to the cards...
            cpuRemoveCards();
            availableCards.splice(availableCards.indexOf(usersCards[0].cardID), 1);
            availableCards.splice(availableCards.indexOf(usersCards[1].cardID), 1);
            updateAvailCards(availableCards);

            document.getElementById("cpuPlayResult").innerText = " ";

        }
        else{
            document.getElementById("cpuPlayResult").innerText = "Not a match...";
            console.log("Not matching these cards!")

            setTimeout(cpuResetCards, 2000);
            document.getElementById("cpuPlayResult").innerText = " ";
            
        }
        
    }

    function cpuResetCards(){

        let card2 = document.getElementById(cpusCards[1].cardID);
        card2.src=CardBack;
        console.log("flipped card 2: " + card2.id);
        
        let card1 = document.getElementById(cpusCards[0].cardID);
        card1.src=CardBack;
        console.log("flipped card 1: " + card1.id);

        
        cpusCards = [null, null];
        
    }

    function cpuRemoveCards(){

        let empty = document.createElement("img");
        empty.src=TransparentCard;
        empty.height="110";
        empty.width="90";
        empty.id = "emptyImg";

        let card1 = document.getElementById(cpusCards[0].cardID);
        console.log("get card1 w id: " + cpusCards[0].cardID)
        console.log(card1);
        let data1 = document.getElementById(`data${cpusCards[0].cardID}`);

        data1.replaceChild(empty, card1);
        //console.log(data1);

        let card2 = document.getElementById(cpusCards[1].cardID);
        console.log("get card2 w id: " + cpusCards[1].cardID)
        console.log(card2)
        let data2 = document.getElementById(`data${cpusCards[1].cardID}`);
        data2.replaceChild(empty, card2);

        
        cpusCards = [null, null];
    }

    function cpuFlip(){
        console.log(availableCards)
        console.log(cpuMemory);


        let card1ImgID = availableCards[Math.floor(Math.random()*availableCards.length)];
        console.log(card1ImgID);

        let card2ImgID = availableCards[Math.floor(Math.random()*availableCards.length)];
        console.log(card2ImgID);
        
        let intC2ID = parseInt(card2ImgID, 10);
        let intC1ID = parseInt(card1ImgID, 10);

        console.log("memory contains " + cards[intC1ID].value);

        if(cpuMemory.includes(cards[intC1ID].value)){
            console.log("setting card 2 to card from memory");
            let index = cpuMemory.indexOf(cards[intC1ID].value);
            card2ImgID = cpuMemory[index];
            intC2ID = parseInt(card2ImgID, 10);
        }
        

        if(card1ImgID === card2ImgID || !card1ImgID || !card2ImgID){
            console.log("found the same random number")
            cpuFlip();
        }
        else{

            console.log("Card 1 img id " + card1ImgID);
            console.log("Card 2 img id " + card2ImgID);

            cpusCards[0] = {
                card: cards[intC1ID],
                cardID: card1ImgID
            }

            cpuMemory.push({
                cardValue: cards[intC1ID].value,
                indexInCards: intC1ID
            });

            cpuMemoryValues.push(cards[intC1ID].value);

            updateCpuMemory(cpuMemory);
            updateCpuMemoryValues(cpuMemoryValues);

            cpusCards[1] = {
                card: cards[intC2ID],
                cardID: card2ImgID
            }

            cpuMemory.push({
                cardValue: cards[intC2ID].value,
                indexInCards: intC2ID
            });

            cpuMemoryValues.push(cards[intC2ID].value);

            updateCpuMemory(cpuMemory);
            updateCpuMemoryValues(cpuMemoryValues);


            let img1 = document.getElementById(card1ImgID);
            console.log(img1);
                
            let img2 = document.getElementById(card2ImgID);
            console.log(img2);
                

            setTimeout(()=> {
                img1.src = cards[intC1ID].image;
                img2.src = cards[intC2ID].image;
            }, 1000);

    }

    }

    return (
        <>

            <div>
                <h3>Your Points: {userPoints}</h3>
                <h3 id="userPlayResult"></h3>
            </div>

            <div>

                <table cellSpacing="0">
                    <tr>
                        <td id="data0"><img id="0" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data1"><img id="1" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data2"><img id="2" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data3"><img id="3" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data4"><img id="4" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data5"><img id="5" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data6"><img id="6" onClick={flip} src={CardBack} width="90" height="110" /></td>
                    </tr>
                    <tr>
                        <td id="data7"><img id="7" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data8"><img id="8" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data9"><img id="9" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data10"><img id="10" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data11"><img id="11" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data12"><img id="12" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data13"><img id="13" onClick={flip} src={CardBack} width="90" height="110" /></td>
                    </tr>
                    <tr>
                        <td id="data14"><img id="14" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data15"><img id="15" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data16"><img id="16" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data17"><img id="17" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data18"><img id="18" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data19"><img id="19" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data20"><img id="20" onClick={flip} src={CardBack} width="90" height="110" /></td>
                    </tr>
                    <tr>
                        <td id="data21"><img id="21" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data22"><img id="22" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data23"><img id="23" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data24"><img id="24" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data25"><img id="25" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data26"><img id="26" onClick={flip} src={CardBack} width="90" height="110" /></td>
                        <td id="data27"><img id="27" onClick={flip} src={CardBack} width="90" height="110" /></td>
                    </tr>
                </table>
            </div>

            <div>
                <h3>Opponent Points: {cpuPoints}</h3>
                <h3 id="cpuPlayResult"></h3>
            </div>
        </>
    )
}

function checkForDuplicates(array){
    

}

