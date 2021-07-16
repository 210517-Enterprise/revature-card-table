import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function ForgotPassword({ username }){
    const { register, handleSubmit } = useForm();
    const [ secQuest, updateSecQuest ] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/revature-card-game/${username}`)
        .then((response) => updateSecQuest(response.data.securityQuestion))
    }, []);


    return (
        <>
            <Form>
                <Form.Group>
                    <h2>{secQuest}</h2>
                    <Form.Control type="text" id="answer" placeholder="Answer"
                    {...register("answer", {required: true})}/>
                </Form.Group>

                <Form.Group>
                    <h6>New Password</h6>
                    <Form.Control type="password" id="pwd" placeholder="Password"
                    {...register("pwd", {required: true})}/>
                </Form.Group>

                <Form.Group>
                    <h6>Confirm Password</h6>
                    <Form.Control type="password" id="confirmPwd" placeholder="Password"
                    {...register("confirmPwd", {required: true})}/>
                </Form.Group>
            </Form>

        </>
    );
}