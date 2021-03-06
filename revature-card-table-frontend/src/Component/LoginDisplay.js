import axios from "axios";
import { motion } from "framer-motion";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
//import { render } from "@testing-library/react";
import "../CSS/LoginDisplay.css";
export default function LoginDisplay({ setToken }) {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const location = useLocation();

  const onSubmit = (user) => {
    if (user.username && user.password) {
      axios
        .get(
          `http://localhost:8080/revature-card-table/users/login?username=${user.username}&password=${user.password}`
        )
        .then((response) => {
          if (response.data.user_id === undefined) {
            let error_p = document.getElementById("error");
            error_p.innerText =
              "Authentication Error - Check your Username and Password";
            error_p.style.color = "#ff3322";

            let usr_input = document.getElementById("username");
            usr_input.value = "";
            usr_input.style.borderLeftColor = "#ff3322";
            usr_input.style.borderLeftWidth = "5px";

            let pwd_input = document.getElementById("password");
            pwd_input.value = "";
            pwd_input.style.borderLeftColor = "#ff3322";
            pwd_input.style.borderLeftWidth = "5px";
          } else {
            setToken({
              username: `${user.username}`,
              id: `${response.data.user_id}`,
              first_name: `${response.data.firstName}`,
              last_name: `${response.data.lastName}`,
              isLoggedIn: true,
            });

            sessionStorage.setItem('user', JSON.stringify({
              username: `${user.username}`,
              id: `${response.data.user_id}`,
              first_name: `${response.data.firstName}`,
              last_name: `${response.data.lastName}`,
              isLoggedIn: true,
            }))

            if (location.state) {
              history.push({
                pathname: location.state.from.pathname
              })
            } else {
              history.push("/");
            }
          }
        })
        .catch((error) => {
          console.log("Failure to login user", error);
        });
    }

    if (!user.username) {
      let error_p = document.getElementById("error");
      error_p.innerText = `Authentication Error
      Complete the form to login`;
      error_p.style.color = "#ff3322";

      let usr_input = document.getElementById("username");
      usr_input.value = "";
      usr_input.style.borderLeftColor = "#ff3322";
      usr_input.style.borderLeftWidth = "5px";
    }

    if (!user.username) {
      let error_p = document.getElementById("error");
      error_p.innerText = `Authentication Error
      Complete the form to login`;
      error_p.style.color = "#ff3322";

      let pwd_input = document.getElementById("password");
      pwd_input.value = "";
      pwd_input.style.borderLeftColor = "#ff3322";
      pwd_input.style.borderLeftWidth = "5px";
    }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const updateToken = (user) => {
    if (user.username === "") {
      let error_p = document.getElementById("error");
      error_p.innerText = "Enter your username to reset your password";
      error_p.style.color = "#ff3322";
    } else {
      setToken({
        username: `${user.username}`,
        id: "",
        first_name: "",
        last_name: "",
        isLoggedIn: false,
      });
      history.push("/forgot-password");
    }
  };
  return (
    <>
      <div id="page-layout" class="container-xxl">
        <br /> <br />
        <motion.div
          class="col-lg-6 mx-auto"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
        >
          <Form>
            <Form.Group>
              <h2>Log In</h2>

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

            <p id="error"></p>
            <motion.button
              className="custom-btn"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              whileHover={{ scale: 1.05 }}
            >
              Login
            </motion.button>
            <p className="forgot-password text-right">
              <a href="/forgot-password" onClick={handleSubmit(updateToken)}>
                Forgot Password?
              </a>
            </p>
          </Form>
        </motion.div>
      </div>
    </>
  );
}

function enterUsername() {
  let form = document.getElementById("username");
  form.style.backgroundColor = "white";
}

function enterPassword() {
  let form = document.getElementById("password");
  form.style.backgroundColor = "white";
}
