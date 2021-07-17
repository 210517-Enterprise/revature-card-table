import { Button } from "react-bootstrap";
import { useState } from "react";
import { startMatchingGame } from "../api.js";

export default function MatchingGame(){
    const [ userMatches, updateUserMatches ] = useState(0);
    const [ cpuMatches, updateCpuMatches ] = useState(0);
    const [ cards, updateCards ] = useState(null);

    const start = async () => {
        let { startCards } = await startMatchingGame();
        console.log({startCards})
        updateCards(startCards);

        console.log(cards);
    }

    return (
        <>
            <h1>Matching Game :)</h1>
            <Button onClick={start}>Start!</Button>

        </>
    )
}