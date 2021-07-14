import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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

  const onSubmit = (newUser) => {
    axios
      .post(
        "http://localhost:8080/revature-card-table/users/register",
        JSON.stringify(newUser),
        { headers }
      )
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
        console.log(newUser);
        console.log(JSON.stringify(newUser));
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
      <h1>Register Page</h1>
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
      </form>
    </>
  );
}
