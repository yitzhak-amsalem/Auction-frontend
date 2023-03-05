import React, {useEffect, useState} from "react";
import {sendApiPostRequest} from "../services/ApiUserRequests";
import "../css/logIn.css";
import {TextField} from "@mui/material";
import ErrorMessage from "../ErrorMessage";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
    const [isActive, setIsActive] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userToken, setUserToken] = useState("");
    const[errorCode, setErrorCode] = useState(0);
    const[numOfAuctions, setNumOfAuctions] = useState(0);
    const[numOfBets, setNumOfBets] = useState(0);
    const[numOfUsers, setNumOfUsers] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
        } else {
            navigate("../dashboard")
        }
    }, [])

    const updateIsActive = () => {
        sendApiPostRequest("http://localhost:8989/login", {username: userName, password: password}, (response) => {
            if (response.data.success) {
                setErrorCode(0)
                Cookies.set("token", response.data.token);
                navigate("../dashboard")
            } else {
                setErrorCode(response.data.errorCode);
            }
        })
    }

    const updateUserName = (e) => {
        setUserName(e.target.value);
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
  const signup=()=>{
      navigate("../SignUp")
  }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            {
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

                            {
                                errorCode > 0 &&
                                <ErrorMessage errorCode={errorCode} lineBreak={true}/>
                            }
                            <button id={"sign-in-button"} disabled={userName.length === 0 || password.length === 0}
                                    onClick={updateIsActive}>Sign In
                            </button>
                            <button id={"sign-up-button"}
                                    onClick={signup}>Create new account
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