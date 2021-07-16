


export default function War({data}) {
   
    let winner = "";
    let playerScore = 0;
    let computerScore = 0;

    //make a call to draw 2 cards, first card is user, second card is cpu
    
    
    if(data.cards[0].value> data.cards[1].value){
        winner = "Player!"
        playerScore += 1;
    } else{
        winner = "Computer!"
        computerScore += 1;
    }   
    
   

    return data === null ? (
        <p>No Data To Be Displayed?</p>
    ) : (
        <>
            <h1>{data.cards[0].value}</h1>
            <img alt={data.cards[0].value} src={data.cards[0].images.png}></img>

            <h2>{data.remaining}</h2>
            <ul>
                <li>Round Winner: {winner}</li>
                <li>Player Score: {playerScore}</li>
                <li>Computer Score: {computerScore}</li>
            </ul>

            <h1>{data.cards[1].value}</h1>
            <img alt={data.cards[1].value} src={data.cards[1].images.png}></img>
        </>
    )
}


//display two coutns on each side of the screen for each time someone has won


