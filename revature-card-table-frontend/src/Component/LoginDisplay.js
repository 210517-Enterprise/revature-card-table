import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { render } from "@testing-library/react";

export default function LoginDisplay({ setToken }) {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (user) => {
    axios
      .get(
        `http://localhost:8080/revature-card-table/users/login?username=${user.username}&password=${user.password}`
      )
      .then((response) => {
        if (response.data.user_id === undefined) {
          console.log("Failure");
          let error_p = document.getElementById("error");
          error_p.innerText = "Username or password are incorrect";

          let usr_input = document.getElementById("username");
          usr_input.value = "";
          usr_input.style.backgroundColor = "#ff968f";

          let pwd_input = document.getElementById("password");
          pwd_input.value = "";
          pwd_input.style.backgroundColor = "#ff968f";
        } else {
          setToken({
            username: `${user.username}`,
            id: `${response.data.user_id}`,
            isLoggedIn: true,
          });
          history.push("/");
        }
      })
      .catch((error) => {
        console.log("Failure to login user", error);
      });
  };

  return (
    <>
      <div id="homepage" class="container-fluid">
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: true })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </Form.Group>

          <p id="error"></p>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}
