import WarDisplay from "./WarDisplay";
import React from "react";
import api from "axios";

import { useState, useEffect } from "react";

export default function War() {
    const [input, updateInput] = useState(0);
    
    let playerWins = 0;
    let computerWins = 0;
    let currentDeckID = "bmda6kdteg02";

    const [data, updateData] = useState(null);
    

    useEffect(
        async () => {
            await api.get(`https://deckofcardsapi.com/api/deck/${currentDeckID}/draw/?count=2`)
                .then((response) => updateData(response.data));
        },[input]
    );
        
        
    
    

  const [data, updateData] = useState(null);
  useEffect(async () => {
    await api
      .get(`https://deckofcardsapi.com/api/deck/${currentDeckID}/draw/?count=2`)
      .then((response) => updateData(response.data));
  }, [input]);

  return (
    <>
      <button onClick={() => updateInput(input + 1)}>WAR!!!!!!!</button>
      <WarDisplay data={data} />
    </>
  );
}
