import { Tabs, Tab, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";


export default function MyAccount({token}){

    const { register, handleSubmit } = useForm();

    const [gameStats, updateStats] = useState(null);

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };


    const onSubmit = (data) => {
        console.log("in onsubmit");
        if(data.newPwd !== data.confirmPwd) {
                let errorP = document.getElementById("error");
                errorP.innerText = "New passwords do not match";

                let newPwd_input = document.getElementById("newPwd");
                newPwd_input.style.backgroundColor = "#ff968f";

                let confirmPwd_input = document.getElementById("confirmPwd");
                confirmPwd_input.value = "";
                confirmPwd_input.style.backgroundColor = "#ff968f";
            }

        axios.get(`http://localhost:8080/revature-card-table/users/${token.username}`)
        .then((response) => {
            console.log(response);
            if(data.currPwd !== response.data.password){
                let errorP = document.getElementById("error");
                errorP.innerText = "Incorrect password";

                let pwd_input = document.getElementById("currPwd");
                pwd_input.style.backgroundColor = "#ff968f";
            }

            let user = {
                "user_id": token.id,
                "username": token.username,
                "password": data.newPwd,
                "firstName": token.first_name,
                "lastName": token.last_name
            }

            console.log("correct pwd");

            axios.post(`http://localhost:8080/revature-card-table/users/update`, 
            JSON.stringify(user), { headers })
            .then((updateResponse) => {
                let resultHeader = document.getElementById("result");
                resultHeader.innerText = "Password successfully changed"

                let newPwd_input = document.getElementById("newPwd");
                newPwd_input.value = "";
                newPwd_input.style.backgroundColor = "white";

                let confirmPwd_input = document.getElementById("confirmPwd");
                confirmPwd_input.value = "";
                confirmPwd_input.style.backgroundColor = "white";

                let pwd_input = document.getElementById("currPwd");
                pwd_input.value = "";
                pwd_input.style.backgroundColor = "white";
                
            });
            
        })
        }


        useEffect(() => {
            axios.get(`http://localhost:8080/revature-card-table/leaderboard/${token.id}`)
            .then((response) => updateStats(response.data))
        }, []);

        console.log(token);
        



        return (
            <>
                <div id="accountParentDiv">
                    <h1>{token.first_name} {token.last_name}</h1>

                </div>

            <div id="tabDiv">
                <Tabs defaultActiveKey="gameStats" >
                    <Tab eventKey="gameStats" title="User Game Statistics">
                    <div id="userGameStatsDiv">
                            <table>
                                <thead>
                                    <tr>
                                        <td>Game</td>
                                        <td>Points</td>
                                        <td>Date Played</td>
                                        <td>Time Completed</td>
                                        <td>Outcome</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gameStats ? 
                                    (
                                        gameStats.map((game) => {
                                        return(
                                        <tr>
                                            <td>{game.gameName}</td>
                                            <td>{game.points}</td>
                                            <td>{game.datePlayed}</td>
                                            <td>{game.timeCompleted}</td>
                                            {game.won ? <td>WON</td> : <td>LOST</td>}

                                        </tr>
                                        )
                                    })
                                    )
                                    :
                                    (
                                    <h1>Play a game!</h1>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Tab>

                    <Tab eventKey="account" title="Account Information">
                        <div id="accountDiv">
                            <p><strong>User ID: </strong>{token.id}</p>
                            <p><strong>Username: </strong>{token.username}</p>
                        </div>
                    </Tab>

                    <Tab eventKey="settings" title="Settings">
                        <h4 id="result"></h4>
                        <Form>
                            <Form.Group>
                                <h2>Change Password</h2>
                                <h5>Current Password</h5>
                                <Form.Control type="password" id="currPwd" placeholder="Current password"
                                {...register("currPwd", { required: true })}/>
                            </Form.Group>
                            <Form.Group>
                                <h5>New Password</h5>
                                <Form.Control type="password" id="newPwd" placeholder="New password"
                                {...register("newPwd", { required: true })}/>
                            </Form.Group>
                            <Form.Group>
                                <h5>Confirm New Password</h5>
                                <Form.Control type="password" id="confirmPwd" placeholder="Confirm password"
                                {...register("confirmPwd", { required: true })} />
                            </Form.Group>

                            <p id="error"></p>
                            <Button type="submit" id="submitBtn" onClick={handleSubmit(onSubmit)}>
                                Submit
                            </Button>
                        </Form>

                    </Tab>

                </Tabs>
                
            </div>
        </>
    );
}