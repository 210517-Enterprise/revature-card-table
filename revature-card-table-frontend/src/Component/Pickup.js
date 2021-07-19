import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import "../CSS/MatchingGame.css"
import TransparentCard from "../Images/TransparentCard.png"
import { motion } from "framer-motion";

export default function Pickup({ token }){
    const [ userMoves, updateUserMoves ] = useState(0);
    const [ cards, updateCards ] = useState(null);
    const [ timeCompleted, updateTimeCompleted ] = useState("");
    const [gameOver, updateGameOver ] = useState(false);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    let usersCards = [null, null];
    const start = Date.now();

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    

      console.log(token);
    useEffect(() => {
        axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/", {
            params: {
              cards: "AS,AD,2D,2C,3S,3C,4H,4S,5D,5C,6S,6H,7H,7C,8D,8S,9H,9D,0C,0S,JH,JC,QH,QS,KD,KC,KH,KS,AS,AD,2D,2C,3S,3C,4H,4S,5D,5C,6S,6H"
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
        
           let cardImg = window.event.srcElement;
          
           let intID = parseInt(cardImg.id, 10);

          usersCards[0] = { 
              card : cards[intID],
              cardID: cardImg.id
          }
          console.log("removing card " + cards[intID])
          play();
    }

    function play(){
        updateUserMoves(userMoves+1);
        
          removeCards();

            if(userMoves === 39){
                console.log("GAME OVER")
                let timeLapsedInMilliseconds = Date.now() - start;
                let timeLapsedInSecond = Math.floor(timeLapsedInMilliseconds/1000);
                let hours = Math.floor(timeLapsedInSecond/3600);
                let minutes = Math.floor(timeLapsedInSecond /60);
                let seconds = timeLapsedInSecond % 60;
    
                let timer = hours + ":" + minutes + ":" + seconds;
                updateTimeCompleted(timer);
    
                console.log(timer);
                console.log(token);
            
    
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
                        "points": 100,
                        "won": true,
                        "datePlayed": today,
                        "timeCompleted": timer,
                        "gameName": "Pickup"
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
    }

    
    function removeCards(){
        let empty = document.createElement("img");
        empty.src=TransparentCard;
        empty.id = "emptyImg";

        let card1 = document.getElementById(usersCards[0].cardID);
        let data1 = document.getElementById(`data${usersCards[0].cardID}`);

        data1.replaceChild(empty, card1);
    }   


    

    return (
        <>

            <div id="page-layout" class="container-fluid">

                    <div id="table">
                        
                        {gameOver ?
                        (
                            <>
                                <Alert id="alert" variant="primary" style={{backgroundColor: "#1d1d35", color: "white"}}>
                                    Winner!
                                    Time to complete: {timeCompleted}!

                                </Alert>
                            </>
                        
                        ) : (
                            
                            <>
                            {cards ? (
                                <>
                                <div class="card-table-div">

                                    <table cellSpacing="0">
                                        <tr>
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data0">
                                                <img id="0" onClick={flip} src={cards[0].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant3} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data1">
                                                <img id="1" onClick={flip} src={cards[1].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data2">
                                                <img id="2" onClick={flip} src={cards[2].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data3">
                                                <img id="3" onClick={flip} src={cards[3].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant3} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data4">
                                                <img id="4" onClick={flip} src={cards[4].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data5">
                                                <img id="5" onClick={flip} src={cards[5].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data6">
                                                <img id="6" onClick={flip} src={cards[6].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data7">
                                                <img id="7" onClick={flip} src={cards[7].image} />
                                            </motion.td>
                                        </tr>
                                        <tr>
                                            
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data8">
                                                <img id="8" onClick={flip} src={cards[8].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant3} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data9">
                                                <img id="9" onClick={flip} src={cards[9].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover" whileTap={{ scale: 0.9 }} id="data10">
                                                <img id="10" onClick={flip} src={cards[10].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant} whileHover="hover" whileTap={{ scale: 0.9 }} id="data11">
                                                <img id="11" onClick={flip} src={cards[11].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover" whileTap={{ scale: 0.9 }} id="data12">
                                                <img id="12" onClick={flip} src={cards[12].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data13">
                                                <img id="13" onClick={flip} src={cards[13].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover" whileTap={{ scale: 0.9 }} id="data14">
                                                <img id="14" onClick={flip} src={cards[14].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover" whileTap={{ scale: 0.9 }} id="data15">
                                                <img id="15" onClick={flip} src={cards[15].image} />
                                            </motion.td>
                                            
                                        </tr>
                                        <tr>
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data16">
                                                <img id="16" onClick={flip} src={cards[16].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant3} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data17">
                                                <img id="17" onClick={flip} src={cards[17].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data18">
                                                <img id="18" onClick={flip} src={cards[18].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant3} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data19">
                                                <img id="19" onClick={flip} src={cards[19].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data20">
                                                <img id="20" onClick={flip} src={cards[20].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data21">
                                                <img id="21" onClick={flip} src={cards[21].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data22">
                                                <img id="22" onClick={flip} src={cards[22].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant} whileHover="hover" whileTap={{ scale: 0.9 }} id="data23">
                                                <img id="23" onClick={flip} src={cards[23].image} />
                                            </motion.td>
                                        </tr>
                                        <tr>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data24">
                                                <img id="24" onClick={flip} src={cards[24].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data25">
                                                <img id="25" onClick={flip} src={cards[25].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data26">
                                                <img id="26" onClick={flip} src={cards[26].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant3} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data27">
                                                <img id="27" onClick={flip} src={cards[27].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data28">
                                                <img id="28" onClick={flip} src={cards[28].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data29">
                                                <img id="29" onClick={flip} src={cards[29].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data30">
                                                <img id="30" onClick={flip} src={cards[30].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant3} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data31">
                                                <img id="31" onClick={flip} src={cards[31].image} />
                                            </motion.td>
                                        </tr>
                                        <tr>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data32">
                                                <img id="32" onClick={flip} src={cards[32].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data33">
                                                <img id="33" onClick={flip} src={cards[33].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data34">
                                                <img id="34" onClick={flip} src={cards[34].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant3} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data35">
                                                <img id="35" onClick={flip} src={cards[35].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data36">
                                                <img id="36" onClick={flip} src={cards[36].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant2} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data37">
                                                <img id="37" onClick={flip} src={cards[37].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data38">
                                                <img id="38" onClick={flip} src={cards[38].image} />
                                            </motion.td>
                                            <motion.td variants={cardVariant3} whileHover="hover"  whileTap={{ scale: 0.9 }} id="data39">
                                                <img id="39" onClick={flip} src={cards[39].image} />
                                            </motion.td>
                                        </tr>
                                    </table>
                                </div>
                                

                            <br/>

                            <div class="user-view-div" style={{textAlign: "left"}}>
                                <p>
                                    <strong>Cards Removed: </strong> 
                                    {userMoves} / 40
                                </p>
                                
                            </div>
                            </>
                            ) : (
                                <Alert>Loading cards.....</Alert>
                            )}
                            </>
                    )}
                    </div>
                

            </div>

        </>
    )
}

const cardVariant = {
    hover: {
        x: [1, -20, -40, -20, 0, 20, 40, 60, 40, 20, 0],
        y: [0, 20, 40, 60, 80, 60, 40, 20, 0, -20, -40, -20, 0],
        z:[0, 10, 20, 30, 20, 10, 0, -10, -20, -10, 0],
        transition: {
            duration: 1,
            yoyo: Infinity
        }
    }
}

const cardVariant2 = {
    hover: {
        x: [60,60,-60,-60,60],
        y: [0,-40,0,40,0],
        transition: {
            duration: 1,
            yoyo: Infinity
        }
    }
}

const cardVariant3 = {
    hover: {
        x: [-60,-60,60,60,-60],
        y: [0,40,0,-40,0],
        transition: {
            duration: 1,
            yoyo: Infinity
        }
    }
}

