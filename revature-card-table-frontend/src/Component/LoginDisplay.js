import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { render } from "@testing-library/react";
import "../CSS/LoginDisplay.css"

export default function LoginDisplay({ setToken }) {
  const { register, handleSubmit } = useForm();
  const { registerUN, handleForgotPwd} = useForm();
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
          error_p.innerText = "Authentication Error - Check your Username and Password";
          error_p.style.color = "#ff968f";

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
            first_name: `${response.data.firstName}`,
            last_name: `${response.data.lastName}`,
            isLoggedIn: true,
          });
          history.push("/");
        }
      })
      .catch((error) => {
        console.log("Failure to login user", error);
      });
  };

  const updateToken = (user) => {
    console.log("updating token w " + user.username);
    setToken({
      username: `${user.username}`,
      id: "",
      first_name: "",
      last_name: "",
      isLoggedIn: false
    })

    history.push("/forgot-password");
  }
  return (
    <>
      <div id="page-layout" class="container-xxl">
          <div class="col-xl-6  mx-auto">
            <Form>
              <Form.Group>
                <h2>Log In</h2>
                <h5>Username</h5>
                <Form.Control
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  {...register("username", { required: true })}
                />
              </Form.Group>

              <Form.Group>
                <h5>Password</h5>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  {...register("password", { required: false })}
                />
              </Form.Group>

              <p id="error"></p>
              <Button
                className="btn btn-primary btn-block"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </Button>
              <p className="forgot-password text-right">
                    <a href="/forgot-password" onClick={handleSubmit(updateToken)}>Forgot Password?</a>
                </p>
            </Form>
          </div>
      </div>
    </>
  );
}
