import { wait, waitFor } from "@testing-library/react";
import axios from "axios";
import { useState, useEffect } from "react";


export default function MyAccount({token}){

    const [gameStats, updateStats] = useState(null);

    let x = null;


    useEffect(() => {
        axios.get(`http://localhost:8080/revature-card-table/leaderboard/${token.id}`)
        .then((response) => updateStats(response.data))
    }, []);

    //console.log(gameStats[0].gameName);
    



    return (
        <>
            <div id="accountParentDiv">
                <h1>{token.first_name} {token.last_name}</h1>
                <h3>{token.username}</h3>
                <button>Settings</button>

            </div>
            <div id="userGameStatsDiv">
                <table>
                    <thead>
                        <tr>
                            <td>Game</td>
                            <td>Points</td>
                            <td>Date Played</td>
                            <td>Time Completed</td>
                            <td>Game Won?</td>
                        </tr>
                    </thead>
                    <tbody>
                        {gameStats.map((game) => {
                            return(
                            <tr>
                                <td>{game.gameName}</td>
                                <td>{game.points}</td>
                                <td>{game.datePlayed}</td>
                                <td>{game.timeCompleted}</td>
                                <td>{game.won}</td>

                            </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>

        </>
    );
}