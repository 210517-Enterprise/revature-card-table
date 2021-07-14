import { useState, useEffect } from "react";

export default function Leaderboard(){
    const [gamestats, updateGamestats] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/revature-card-table/leaderboard/find-all")
        .then((response) => response.json())
        .then(updateGamestats);
        console.log(gamestats);
    }, []);

    return gamestats === null ? (<h1>Error: no stats</h1>)
    :
    (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Game ID</td>
                        <td>Game</td>
                        <td>User Username</td>
                        <td>User First Name</td>
                        <td>User Last Name</td>
                        <td>Points</td>
                        <td>Date</td>
                        <td>Game Length</td>
                    </tr>
                </thead>
                <tbody>
                        {gamestats.map((gamestat) => {
                            return(
                            <tr>
                            <td>{gamestat.id}</td>
                            <td>{gamestat.gameName}</td>
                            <td>{gamestat.user.username}</td>
                            <td>{gamestat.user.firstName}</td>
                            <td>{gamestat.user.lastName}</td>
                            <td>{gamestat.points}</td>
                            <td>{gamestat.datePlayed}</td>
                            <td>{gamestat.timeCompleted}</td>
                            </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    )
}