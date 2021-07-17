import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function ForgotPassword({ username }){
    console.log(username);
    const { register, handleSubmit } = useForm();
    const [ user, updateUser ] = useState("");
    const history = useHistory();

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

    useEffect(() => {
        axios.get(`http://localhost:8080/revature-card-table/users/${username}`)
        .then((response) => updateUser(response.data))
    }, []);

    const onSubmit = (data) => {

        

        console.log(`Typed ${data.answer} and actually is ${user.securityAnswer}`)
        if(data.answer !== user.securityAnswer){
            let errorP = document.getElementById("error");
            errorP.innerText = "Incorrect answer to your security question";

            let answerBox = document.getElementById("answer");
            answerBox.value = "";
            answerBox.style.backgroundColor = "#ff968f";

            if(data.pwd !== data.confirmPwd){
                let errorP = document.getElementById("error");
                errorP.innerText = "Passwords do not match";
                
                let pwdBox = document.getElementById("pwd");
                pwdBox.style.backgroundColor = "#ff968f";
    
                let cPwdBox = document.getElementById("confirmPwd");
                cPwdBox.value = "";
                cPwdBox.style.backgroundColor = "#ff968f";
            }
        }
        else{

            let updatedUser = {
                "user_id": user.user_id,
                "username": user.username,
                "password": data.pwd,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "securityQuestion": user.securityQuestion,
                "securityAnswer": user.securityAnswer
            }
    
            console.log(updatedUser);
    
            axios.post(`http://localhost:8080/revature-card-table/users/update`,
            JSON.stringify(updatedUser), { headers }).then((response)=>{
                console.log(response);
                history.push("/login");
            });

        }

        
        

    }

    function enterAnswer(){
        let answerBox = document.getElementById("answer");
        answerBox.style.backgroundColor = "white";
    }

    function enterPassword(){
        let pwdBox = document.getElementById("pwd");
        pwdBox.style.backgroundColor = "white";
    }

    function enterConfirmPassword(){
        let pwdBox = document.getElementById("confirmPwd");
        pwdBox.style.backgroundColor = "white";
    }


    return (
        <>
            <Form>
                <Form.Group>
                    <h2>{user.securityQuestion}</h2>
                    <Form.Control type="text" id="answer" placeholder="Answer"
                    onClick={enterAnswer}
                    {...register("answer", {required: true})}/>
                </Form.Group>

                <Form.Group>
                    <h6>New Password</h6>
                    <Form.Control type="password" id="pwd" placeholder="Password"
                    onClick={enterPassword}
                    {...register("pwd", {required: true})}/>
                </Form.Group>

                <Form.Group>
                    <h6>Confirm Password</h6>
                    <Form.Control type="password" id="confirmPwd" placeholder="Password"
                    onClick={enterConfirmPassword}
                    {...register("confirmPwd", {required: true})}/>
                </Form.Group>

                <p id="error"></p>
                <Button type="submit" onClick={handleSubmit(onSubmit)}>
                    Change Password
                </Button>
            </Form>

        </>
    );
}