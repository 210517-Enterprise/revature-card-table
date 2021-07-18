import "../CSS/Rules.css"

export default function ConcentrationRules(){

    return (
        <>

            <div id="page-layout" class="container-fluid">
                <div id="rules">
                    <h1>How to play Concentration</h1>
                    
                        <ol>
                            <li>Click two cards to flip them and see if they are a match</li>
                            <ul>
                                <li>If the two cards are a match, the cards will be removed from the table</li>
                                <li>If the two cards are not a match, the cards will be flipped back</li>
                            </ul>

                            <li>The game ends when the table is cleared and there are no more cards</li>
                        </ol>
                    <p>
                        Goal: Try to clear the board with as few guesses as possible
                    </p>

                </div>
            </div>

        </>
    );
}