import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [gamestats, updateGamestats] = useState(null);

  useEffect(() => {
    fetch(
      "http://localhost:8080/revature-card-table/leaderboard/find-all-by-points"
    )
      .then((response) => response.json())
      .then(updateGamestats);
    console.log(gamestats);
  }, []);

  return gamestats === null ? (
    <div id="page-layout" class="container-fluid">
      <h1>Loading Stats...</h1>
    </div>
  ) : (
    <>
      <div id="page-layout" class="container-fluid">
        <h2>War Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <td>Game ID</td>
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
              if (gamestat.won && gamestat.gameName === "war") {
                return (
                  <tr>
                    <td>{gamestat.id}</td>
                    <td>{gamestat.user.username}</td>
                    <td>{gamestat.user.firstName}</td>
                    <td>{gamestat.user.lastName}</td>
                    <td>{gamestat.points}</td>
                    <td>{gamestat.datePlayed}</td>
                    <td>{gamestat.timeCompleted}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

        <h2>Speed Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <td>Game ID</td>
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
              if (gamestat.won && gamestat.gameName === "speed") {
                return (
                  <tr>
                    <td>{gamestat.id}</td>
                    <td>{gamestat.user.username}</td>
                    <td>{gamestat.user.firstName}</td>
                    <td>{gamestat.user.lastName}</td>
                    <td>{gamestat.points}</td>
                    <td>{gamestat.datePlayed}</td>
                    <td>{gamestat.timeCompleted}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

        <h2>Matching Game Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <td>Game ID</td>
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
              if (gamestat.won && gamestat.gameName === "matching-game") {
                return (
                  <tr>
                    <td>{gamestat.id}</td>
                    <td>{gamestat.user.username}</td>
                    <td>{gamestat.user.firstName}</td>
                    <td>{gamestat.user.lastName}</td>
                    <td>{gamestat.points}</td>
                    <td>{gamestat.datePlayed}</td>
                    <td>{gamestat.timeCompleted}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
