import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

export default function LoginDisplay() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (user) => {
        updateUsername(user.username);
        updatePassword(user.password);

        fetch(`http://localhost:8080/revature-card-game/users/login?username=${user.username}&password=${user.password}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => console.error(error));

    }

    const [username, updateUsername] = useState("");
    const [password, updatePassword] = useState("");

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter your username" {...register("username", {required: true})}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" {...register("password", {required: true})}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>Login</Button>
            </Form>
        </>
        );
}