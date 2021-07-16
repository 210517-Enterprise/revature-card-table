//import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
        //alert(error.response.data);
      });
  };

  /* const onSubmit = ((newUser) => {
        fetch("http://localhost:8080/revature-card-table/users/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
            console.log(newUser);
        });
    }); */

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

  return (
    <>
      <div id="page-layout" class="container-xxl">
        <div>
          <div class="col-xl-6  mx-auto">
            <Form>
              <Form.Group>
                <h2>Create Account</h2>
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
              <Form.Group>
                <h5>First Name</h5>
                <Form.Control
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  {...register("firstName", { required: true })}
                />
              </Form.Group>
              <Form.Group>
                <h5>Last Name</h5>
                <Form.Control
                  id="lastName"
                  type="test"
                  placeholder="Enter last name"
                  required = "true"
                  {...register("lastName", { required: true })}
                />
              </Form.Group>

              <p id="error"></p>
              <Button
                className="btn btn-primary btn-block"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Create Account
              </Button>
              <p className="forgot-password text-right">
                    Already have an account? <a href="/login">Log In</a>
                </p>
            </Form>
            
            
            
            
            
            
            
            
            
{/*             
            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(e) => checkKeyDown(e)}
            >
              <label>
                Username:
                <input {...register("username", { required: true })} />
                {errors.username?.type === "required" && (
                  <div style={{ color: "red" }}>Username is required</div>
                )}
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <div style={{ color: "red" }}>Password is required</div>
                )}
              </label>
              <br />
              <label>
                First Name:
                <input {...register("firstName", { required: true })} />
                {errors.firstName?.type === "required" && (
                  <div style={{ color: "red" }}>First Name is required</div>
                )}
              </label>
              <br />
              <label>
                Last Name:
                <input {...register("lastName", { required: true })} />
                {errors.lastName?.type === "required" && (
                  <div style={{ color: "red" }}>Last Name is required</div>
                )}
              </label>
              <br />
              <input type="submit" />
            </form> */}
          </div>
        </div>
      </div>
    </>
  );
}
