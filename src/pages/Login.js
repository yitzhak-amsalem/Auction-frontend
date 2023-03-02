import React, {useState} from "react";
import {sendApiPostRequest} from "../services/ApiUserRequests";
import "../css/logIn.css";
import {TextField} from "@mui/material";

function Login() {
    const [isActive, setIsActive] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userToken, setUserToken] = useState("");
    let numOfAuctions = 0
    let numOfBets = 0
    let numOfUsers = 0

    const updateIsActive = () => {
        sendApiPostRequest("http://localhost:8989/login", {userName: userName, password: password}, (response) => {
            if (response.data.success) {
                setIsActive(true);
                setUserToken(response.data.userToken)
                setUserName("");
                setPassword("");
            } else {
                if (response.data.errorCode === 1) {
                    alert("The password isn't correct");
                } else {
                    alert("The username isn't correct");
                }
            }
        })
    }

    const updateUserName = (e) => {
        setUserName(e.target.value);
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
    const logOut = () => {
        setIsActive(false);
        setUserToken("");
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            {
                isActive ?
                    <div>
                        <button id={"sign-out-button"} onClick={logOut}>Sign out</button>
                    </div>
                    :
                    <div className={"login-form"}>
                        <h1>Login Form</h1>
                        <div className={"login-container"}>
                            <TextField
                                style={{margin: "10px", width: "200px"}}
                                id={"filled-basic"}
                                variant={"filled"}
                                label={"Enter your user name"}
                                value={userName}
                                onChange={updateUserName}
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
                                onChange={updatePassword}
                                required
                            />
                            <button id={"sign-in-button"} disabled={userName.length === 0 || password.length === 0}
                                    onClick={updateIsActive}>Sign In
                            </button>
                        </div>
                        <h1>{numOfUsers} users are in the system</h1>
                        <h1>{numOfAuctions} auction are uploded to the system</h1>
                        <h1>{numOfBets} Bets were  auctioned in the system</h1>
                    </div>
            }
        </div>
    )
}

export default Login;