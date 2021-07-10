import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

// export default class gameChoice extends React.Component {
//   constructor() {
//     super();
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const data = new FormData(event.target);

//     fetch('/api/form-submit-url', {
//       method: 'POST',
//       body: data,
//     });
//   }

//   render() {

//     return (
//       <div>
//         <h1>Which Game Records Do You Want?</h1>

//         <form action={this.handleSubmit}>
//           <label for="game">Choose a Game: </label>
//           <select name="game" id="game">
//           <option value="gofish">Go Fish</option>
//           <option value="war">War</option>
//           <option value="speed">Speed</option>
//           <option value="52 card pickup">52 Card Pick Up</option>
//           </select>
//           <br/><br/>
//           <input type="submit" value="Submit"></input>
//         </form>
//        </div>
//     );
//   }
// }

export default class GameStatistics extends React.Component {
  state = {
    gameStats: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/revature-card-table/leaderboard/find-all`)
      .then((res) => {
        const gameStats = res.data;
        this.setState({ gameStats });
        console.log(this.state.gameStats);
      });
  }

  render() {
    return (
      <div >
        <h1 class="text-center">Table of All Games</h1>
        <table class ="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Game</th>
              <th>Points</th>
              <th>Won?</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.gameStats.map((gameStat) => {
              return (
                <tr>
                  <td>{gameStat.id}</td>
                  <td>{gameStat.gameName}</td>
                  <td>{gameStat.points}</td>
                  <td>
                    <input type="checkbox" checked={gameStat.won} />
                  </td>
                  <td>{gameStat.datePlayed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
