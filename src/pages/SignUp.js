import React, {useState, useEffect} from "react";
import "../css/logIn.css";
import ErrorMessage from "../ErrorMessage";
import {sendApiPostRequest} from "../services/ApiUserRequests";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {TextField} from "@mui/material";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [success, setSuccess] = useState(false);
    const [errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
        } else {
            navigate("../dashboard")
        }
    }, [])

    const usernameChanged = (event) => {
        setUsername(event.target.value)
    }

    const passwordChanged = (event) => {
        setPassword(event.target.value);
    }

    const password2Changed = (event) => {
        setPassword2(event.target.value);
    }

    const submit = () => {
        sendApiPostRequest("http://localhost:8989/sign-up", {username: username, password: password}, (response) => {
            if (response.data.success) {
                setSuccess(true)
                setUsername("")
                setPassword("")
                setPassword2("")
                setTimeout(() => {
                    navigate("../Login")
                }, 4000)
            } else {
                setErrorCode(response.data.errorCode);
                setTimeout(() => {
                    setErrorCode(0)
                }, 3000)
            }

        })
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>

            <div className={"login-form"}>
                <h1>Sign Up Form</h1>
                <div className={"login-container"}>
                    <TextField
                        style={{margin: "10px", width: "200px"}}
                        id={"filled-basic"}
                        variant={"filled"}
                        label={"Enter your user name"}
                        value={username}
                        onChange={usernameChanged}
                        required
                    />
                    <TextField
                        style={{margin: "10px", width: "200px"}}
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        value={password}
                        onChange={passwordChanged}
                        required
                    />
                    {
                        password.length < 6 && password.length > 0 &&
                        <ErrorMessage errorCode={1002} lineBreak={false}/>
                    }
                    <TextField
                        style={{margin: "10px", width: "200px"}}
                        id="filled-password-input"
                        label="Repeat"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        value={password2}
                        onChange={password2Changed}
                        required
                    />
                    {
                        password !== password2 && password2.length > 0 &&
                        <ErrorMessage errorCode={1005} lineBreak={true}/>
                    }
                    {
                        success ?
                            <>
                                <div className={"success-message"}>Sign Up successfully. You are taken to the login
                                    page
                                </div>
                            </>
                            :
                            errorCode > 0 &&
                            <ErrorMessage errorCode={errorCode} lineBreak={true}/>
                    }
                    <button className={"sign-button"} onClick={submit} disabled={
                        password.length < 6 ||
                        (password !== password2) ||
                        username.length === 0
                    }>Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;