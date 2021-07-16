import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { render } from "@testing-library/react";
import "../CSS/LoginDisplay.css";
import { motion } from "framer-motion";
import styled from "styled-components";
import Spades from "../Images/spades1.png";
import Hearts from "../Images/hearts1.png";
import Clubs from "../Images/clubs1.png";
import Diamonds from "../Images/diamonds1.png";

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
          error_p.innerText =
            "Authentication Error - Check your Username and Password";
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

  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <div id="page-layout" class="row h-100" padding-top="10em">
        <motion.div
          class="col-md-5 my-auto"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
        >
          <Form>
            <Form.Group>
              <h2>Log In</h2>
              <br />
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
                {...register("password", { required: true })}
              />
            </Form.Group>

            <p id="error"></p>
            <motion.button
              className="btn btn-primary btn-block"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              whileHover={{ scale: 1.05 }}
            >
              Login
            </motion.button>
            <p className="forgot-password text-right">
              <a href="#">Forgot Password?</a>
            </p>
          </Form>
        </motion.div>

        <motion.div
          class="col-md-7 my-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.75,
          }}
        >
          <motion.img
            src={Spades}
            width="300"
            class="rotateimg90"
            whileTap={{ scale: 0.9 }}
            drag={true}
            whileHover={{ scale: 1.1 }}
            dragElastic={0.2}
            dragMomentum={false}
            // dragConstraints={{left:-100, right: 100, top: 100, bottom:-100}}
          ></motion.img>
          <motion.img
            src={Hearts}
            width="300"
            whileTap={{ scale: 0.9 }}
            drag={true}
            whileHover={{ scale: 1.1 }}
            dragMomentum={false}
            // dragConstraints={{left:-100, right: 100, top: 100, bottom:-100}}
          ></motion.img>
          <motion.img
            src={Clubs}
            width="300"
            whileTap={{ scale: 0.9 }}
            drag={true}
            whileHover={{ scale: 1.1 }}
            dragMomentum={false}
            // dragConstraints={{left:-100, right: 100, top: 100, bottom:-100}}
          ></motion.img>
          <motion.img
            src={Diamonds}
            height="300"
            whileTap={{ scale: 0.9 }}
            drag={true}
            whileHover={{ scale: 1.1 }}
            dragMomentum={false}
            // dragConstraints={{left:-100, right: 100, top: 100, bottom:-100}}
          ></motion.img>
        </motion.div>
      </div>
    </>
  );
}
