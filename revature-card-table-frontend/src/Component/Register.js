//import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../CSS/LoginDisplay.css";
import { motion } from "framer-motion";

export default function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const history = useHistory();

  const onSubmit = (newUser) => {
    if (
      newUser.username &&
      newUser.password &&
      newUser.firstName &&
      newUser.lastName &&
      newUser.securityAnswer
    ) {
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
          alert("Register Successful! You can now login");
        })
        .catch((error) => {
          let error_p = document.getElementById("error");
          error_p.innerText = `'${newUser.username}' is already taken
          Please choose a different username`;
          error_p.style.color = "#ff3322";
        });
    }

    if (!newUser.username) {
      let form = document.getElementById("username");
      form.style.borderLeftColor = "#ff3322";
      form.style.borderLeftWidth = "5px";
      document.getElementById("error").innerText = `Incomplete Form
        Please fill out every field`;
      document.getElementById("error").style.color = "#ff3322";
    }

    if (!newUser.password) {
      let form = document.getElementById("password");
      form.style.borderLeftColor = "#ff3322";
      form.style.borderLeftWidth = "5px";
      document.getElementById("error").innerText = `Incomplete Form
      Please fill out every field`;
      document.getElementById("error").style.color = "#ff3322";
    }

    if (!newUser.firstName) {
      let form = document.getElementById("firstName");
      form.style.borderLeftColor = "#ff3322";
      form.style.borderLeftWidth = "5px";
      document.getElementById("error").innerText = `Incomplete Form
      Please fill out every field`;
      document.getElementById("error").style.color = "#ff3322";
    }

    if (!newUser.lastName) {
      let form = document.getElementById("lastName");
      form.style.borderLeftColor = "#ff3322";
      form.style.borderLeftWidth = "5px";
      document.getElementById("error").innerText = `Incomplete Form
      Please fill out every field`;
      document.getElementById("error").style.color = "#ff3322";
    }

    if (!newUser.securityAnswer) {
      let form = document.getElementById("securityAnswer");
      form.style.borderLeftColor = "#ff3322";
      form.style.borderLeftWidth = "5px";
      document.getElementById("error").innerText = `Incomplete Form
      Please fill out every field`;
      document.getElementById("error").style.color = "#ff3322";
    }
  };

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };
  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <>
      <div id="page-layout" class="container-xxl">
        <br />
        <motion.div
          class="col-xl-6  mx-auto"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
        >
          <Form>
            <Form.Group>
              <h2>Create Account</h2>
              <h5>Username</h5>
              <Form.Control
                id="username"
                type="text"
                placeholder="Enter username"
                onClick={enterUsername}
                {...register("username", { required: false })}
              />
            </Form.Group>

            <Form.Group>
              <h5>Password</h5>
              <Form.Control
                id="password"
                type="password"
                placeholder="Enter password"
                onClick={enterPassword}
                {...register("password", { required: false })}
              />
            </Form.Group>

            <Form.Group>
              <h5>First Name</h5>
              <Form.Control
                id="firstName"
                type="text"
                placeholder="Enter first name"
                onClick={enterFName}
                {...register("firstName", { required: false })}
              />
            </Form.Group>

            <Form.Group>
              <h5>Last Name</h5>
              <Form.Control
                id="lastName"
                type="test"
                placeholder="Enter last name"
                required="true"
                onClick={enterLName}
                {...register("lastName", { required: false })}
              />
            </Form.Group>

            <Form.Group>
              <h5>Security Question</h5>
              <Form.Control
                as="select"
                {...register("securityQuestion", { required: false })}
              >
                <option value="What were the last four digits of your childhood telephone number?">
                  What were the last four digits of your childhood telephone
                  number?
                </option>
                <option value="In what town or city was your first full time job?">
                  In what town or city was your first full time job?
                </option>
                <option value="What is the name of your favorite childhood friend?">
                  What is the name of your favorite childhood friend?
                </option>
                <option value="hat was the name of your first stuffed animal?">
                  What was the name of your first stuffed animal?
                </option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <h5>Security Question Answer</h5>
              <Form.Control
                id="securityAnswer"
                type="test"
                placeholder="Enter answer"
                required="true"
                onClick={enterAnswer}
                {...register("securityAnswer", { required: false })}
              />
            </Form.Group>
            <p id="error"></p>
            <motion.button
              className="custom-btn"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              whileHover={{ scale: 1.05 }}
            >
              Create Account
            </motion.button>

            <p className="forgot-password text-right">
              Already have an account? <a href="/login">Log In</a>
            </p>
          </Form>
        </motion.div>
      </div>
    </>
  );
}

function enterUsername() {
  let form = document.getElementById("username");
  form.style.borderColor = "";
  form.style.borderWidth = "";
}

function enterPassword() {
  let form = document.getElementById("password");
  form.style.borderColor = "";
  form.style.borderWidth = "";
}

function enterFName() {
  let form = document.getElementById("firstName");
  form.style.borderColor = "";
  form.style.borderWidth = "";
}

function enterLName() {
  let form = document.getElementById("lastName");
  form.style.borderColor = "";
  form.style.borderWidth = "";
}

function enterAnswer() {
  let form = document.getElementById("securityAnswer");
  form.style.borderColor = "";
  form.style.borderWidth = "";
}
