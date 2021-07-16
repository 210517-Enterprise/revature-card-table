import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { render } from "@testing-library/react";
import "../CSS/LoginDisplay.css"

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

  return (
    <>
      <div id="homepage" class="container-xxl">
        <div class="row">
          <div class="col-sm-6  mx-auto">
            <Form>
              <Form.Group className="form-group">
                <h3>Log In</h3>
                <label>Username</label>
                <Form.Control
                  id="username"
                  width="150px"
                  type="text"
                  placeholder="Enter username"
                  {...register("username", { required: true })}
                />
              </Form.Group>

              <Form.Group className="form-group">
                <label>Password</label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  {...register("password", { required: true })}
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
                    Forgot <a href="#">password?</a>
                </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
