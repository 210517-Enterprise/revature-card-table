import api from "axios";
import axios from "axios";
import { useForm } from "react-hook-form";
import {useState, useEffect} from "react";

export default function War({deckID}) {
    //populat the users deck
    let currentDeckID = "1q3l0xtqr385";
    let x=3;
    const [data, updateData] = useState(null);
    useEffect(
        () => {
            api.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
                .then((response) => updateData(response.data));
        }, [x]
    );

    return data === null ? (
        <p>No Data To Be Displayed?</p>
    ) : (
        <>
            <h1>{data.cards[0].value}</h1>
            <img alt={data.cards[0].value} src={data.cards[0].images.png}></img>
            <h2>This is Painful</h2>
            <ul>
                
                {data.cards.map((card) => {
                    return <li>{card.value}</li>
                })}
            </ul>
        </>
    )
}


//display two coutns on each side of the screen for each time someone has won


