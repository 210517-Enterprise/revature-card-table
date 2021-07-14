import { useState, useEffect } from "react";
import {useForm} from 'react-hook-form';

export default function Register() {
    const {register, handleSubmit} = useForm();

    const onSubmit = ((newUser) => {
        fetch("http://localhost:8080/revature-card-table/users/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then((response) => {
            console.log(response);
        }).catch((err) => console.log(err));
    });

    const checkKeyDown = (e) => {
        if (e.code === 'Enter') e.preventDefault();
      };

    return (
        <>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
                <label>Username: <input {...register("username")}/></label> 
                <br/>
                <label>Password: <input type="password" {...register("password")}/></label>
                <br/>
                <label>First Name: <input {...register("firstName")}/></label>
                <br/>
                <label>Last Name: <input {...register("lastName")}/></label>
                <br/>
                <input type="submit"/>
            </form>
        </>
    );
}