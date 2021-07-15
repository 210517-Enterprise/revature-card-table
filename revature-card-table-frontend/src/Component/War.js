import WarDisplay from "./WarDisplay";
import {useState} from "react";
import React from "react";

export default function War() {
    const [input, updateInput] = useState(null);
    const inputReference = React.createRef();
    
    return (
        <>
            <input
                id="text-bar"
                type="text"
                placehodler="Please Enter deckID"
                ref={inputReference}></input>
            <button onClick={() => updateInput(inputReference.current.value)}>Submit</button>
            <WarDisplay deckID = {input} />
            

            
        </>
    )
}
