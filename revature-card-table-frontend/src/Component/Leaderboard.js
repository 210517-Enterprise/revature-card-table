import { useState, useEffect } from "react";
import "../CSS/Leaderboard.css";
export default function Leaderboard() {
  const [gamestats, updateGamestats] = useState(null);
  const [gamestatsAsc, updateGamestatsAsc] = useState(null);
  const [gamestatsTime, updateGamestatsTime] = useState(null);

  useEffect(() => {
    fetch(
      "http://localhost:8080/revature-card-table/leaderboard/find-all-by-points"
    )
      .then((response) => response.json())
      .then(updateGamestats);
    console.log(gamestats);
  }, []);

  useEffect(() => {
    fetch(
      "http://localhost:8080/revature-card-table/leaderboard/find-all-by-points-asc"
    )
      .then((response) => response.json())
      .then(updateGamestatsAsc);
    console.log(gamestatsAsc);
  }, []);

  useEffect(() => {
    fetch(
      "http://localhost:8080/revature-card-table/leaderboard/find-all-by-time"
    )
      .then((response) => response.json())
      .then(updateGamestatsTime);
    console.log(gamestatsTime);
  }, []);

  return gamestats === null && gamestatsAsc === null && gamestatsTime === null ? (
    <div id="page-layout" class="container-fluid">
      <div id="leader-area">
        <h1>Loading Stats...</h1>
      </div>
    </div>
  ) : (
    <>
      <div id="page-layout" class="container-fluid">
        <div id="leader-area">
          <h2>War Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <td className="leader-td">Game ID</td>
                <td className="leader-td">User Username</td>
                <td className="leader-td">User First Name</td>
                <td className="leader-td">User Last Name</td>
                <td className="leader-td">Points</td>
                <td className="leader-td">Date</td>
                <td className="leader-td">Game Length</td>
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
                <td className="leader-td">Game ID</td>
                <td className="leader-td">User Username</td>
                <td className="leader-td">User First Name</td>
                <td className="leader-td">User Last Name</td>
                <td className="leader-td">Points</td>
                <td className="leader-td">Date</td>
                <td className="leader-td">Game Length</td>
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

          <h2>Memory Match Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <td className="leader-td">Game ID</td>
                <td className="leader-td">User Username</td>
                <td className="leader-td">User First Name</td>
                <td className="leader-td">User Last Name</td>
                <td className="leader-td">Guesses</td>
                <td className="leader-td">Date</td>
                <td className="leader-td">Game Length</td>
              </tr>
            </thead>
            <tbody>
              {gamestatsAsc.map((gamestat) => {
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

        <div>
          <h2>Pickup Leaderboard</h2>
            <table>
              <thead>
                <tr>
                  <td className="leader-td">Game ID</td>
                  <td className="leader-td">User Username</td>
                  <td className="leader-td">User First Name</td>
                  <td className="leader-td">User Last Name</td>
                  <td className="leader-td">Points</td>
                  <td className="leader-td">Date</td>
                  <td className="leader-td">Game Length</td>
                </tr>
              </thead>
              <tbody>
                {gamestatsTime.map((gamestat) => {
                  if (gamestat.won && gamestat.gameName === "pickup") {
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
        
      </div>

    </>
  );
}
