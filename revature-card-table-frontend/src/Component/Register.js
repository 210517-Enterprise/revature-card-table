//import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const { register, formState: { errors }, handleSubmit, } = useForm();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const history = useHistory();

  const onSubmit = (newUser) => {
    if(newUser.username && newUser.password && newUser.firstName && newUser.lastName && newUser.securityAnswer){
        console.log("nothings undefined");
      axios
        .post(
          "http://localhost:8080/revature-card-table/users/register",
          JSON.stringify(newUser),
          { headers }
        )
        .then((response) => {
          console.log(response);
          history.push("/");
          alert("Register Successful! Please login.");
        })
        .catch((error) => {
          let error_p = document.getElementById("error");
          error_p.innerText = `${newUser.username} is Already Taken, Enter a Different Username`;
          error_p.style.color = "#ff968f";
        });
    }
    
    if(!newUser.username){
      let form = document.getElementById("username");
      form.style.backgroundColor = "#ff968f";
      document.getElementById("error").innerText = "Complete the form to register"
    }

    if(!newUser.password){
      let form = document.getElementById("password");
      form.style.backgroundColor = "#ff968f";
      document.getElementById("error").innerText = "Complete the form to register"
    }

    if(!newUser.firstName){
      let form = document.getElementById("firstName");
      form.style.backgroundColor = "#ff968f";
      document.getElementById("error").innerText = "Complete the form to register"
    }

    if(!newUser.lastName){
      let form = document.getElementById("lastName");
      form.style.backgroundColor = "#ff968f";
      document.getElementById("error").innerText = "Complete the form to register"
    }

    if(!newUser.securityAnswer){
      let form = document.getElementById("securityAnswer");
      form.style.backgroundColor = "#ff968f";
      document.getElementById("error").innerText = "Complete the form to register"
    }
  };


  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  return (
    <>
      <div id="page-layout" class="container-xxl">
        <br />
        <div class="col-xl-6  mx-auto">
          <Form>
            <Form.Group>
              <h2>Create Account</h2>
              <h5>Username</h5>
              <Form.Control id="username" type="text" placeholder="Enter username"
                onClick={enterUsername} {...register("username", { required: false })} />
            </Form.Group>

            <Form.Group>
              <h5>Password</h5>
              <Form.Control id="password" type="password" placeholder="Enter password"
                onClick={enterPassword} {...register("password", { required: false })} />
            </Form.Group>

            <Form.Group>
              <h5>First Name</h5>
              <Form.Control id="firstName" type="text" placeholder="Enter first name"
                onClick={enterFName} {...register("firstName", { required: false })} />
            </Form.Group>

            <Form.Group>
              <h5>Last Name</h5>
              <Form.Control id="lastName" type="test" placeholder="Enter last name" required="true"
                onClick={enterLName} {...register("lastName", { required: false })} />
            </Form.Group>
            
            <Form.Group>
              <h5>Security Question</h5>
              <Form.Control as="select" {...register("securityQuestion", { required: false })}>
                <option value="What were the last four digits of your childhood telephone number?">What were the last four digits of your childhood telephone number?</option>
                <option value="In what town or city was your first full time job?">In what town or city was your first full time job?</option>
                <option value="What is the name of your favorite childhood friend?">What is the name of your favorite childhood friend?</option>
                <option value="hat was the name of your first stuffed animal?">What was the name of your first stuffed animal?</option>
              </Form.Control> 
            </Form.Group>

            <Form.Group>
              <h5>Answer for Security Quetsion</h5>
              <Form.Control id="securityAnswer" type="test" placeholder="Answer" required="true"
                onClick={enterAnswer} {...register("securityAnswer", { required: false })} />
            </Form.Group>

            <p id="error"></p>
            <Button className="btn btn-primary btn-block" type="submit"
              onClick={handleSubmit(onSubmit)}>
              Create Account
            </Button>

            <p className="forgot-password text-right">
              Already have an account? <a href="/login">Log In</a>
            </p>
          </Form>

        </div>
      </div>
    </>
  );
}

function enterUsername(){
  let form = document.getElementById("username");
  form.style.backgroundColor = "white";
}

function enterPassword(){
  let form = document.getElementById("password");
  form.style.backgroundColor = "white";
}

function enterFName(){
  let form = document.getElementById("firstName");
  form.style.backgroundColor = "white";
}

function enterLName(){
  let form = document.getElementById("lastName");
  form.style.backgroundColor = "white";
}

function enterAnswer(){
  let form = document.getElementById("securityAnswer");
  form.style.backgroundColor = "white";
}
