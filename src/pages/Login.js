import {sendApiGetRequest, sendApiPostRequest} from "../services/ApiUserRequests";
import React, {useContext, useEffect, useState} from "react";
import "../css/logIn.css";
import {TextField} from "@mui/material";
import ErrorMessage from "../ErrorMessage";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {AuthContext} from "../components/AuthProvider";

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorCode, setErrorCode] = useState(0);
    const [numOfAuctions, setNumOfAuctions] = useState(0);
    const [numOfOffers, setNumOfOffers] = useState(0);
    const [numOfUsers, setNumOfUsers] = useState(0);
    const [type, setType] = useState("login");

    const navigate = useNavigate();
    const {setUpdateNavbar} = useContext(AuthContext);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            sendApiGetRequest("http://localhost:8989/get-statistics", (response) => {
                if (response.data.success) {
                    setErrorCode(0)
                    setNumOfUsers(response.data.statisticsModel.numOfUsers)
                    setNumOfOffers(response.data.statisticsModel.numOfOffers)
                    setNumOfAuctions(response.data.statisticsModel.numOfAuction)
                } else {
                    setErrorCode(response.data.errorCode);
                }
            })
        } else {
            navigate("../dashboard")
        }
    }, [])

    const submit = () => {
        if (type === "login") {
            sendApiPostRequest("http://localhost:8989/login", {username: userName, password: password}, (response) => {
                if (response.data.success) {
                    Cookies.set("token", response.data.token);
                    setUpdateNavbar(true)
                    navigate("../dashboard")
                } else {
                    setErrorCode(response.data.errorCode);
                    setTimeout(() => {
                        setErrorCode(0)
                    }, 2000)
                }
            })
        } else {
            sendApiPostRequest("http://localhost:8989/login-as-admin", {username: userName, password: password}, (response) => {
                if (response.data.success) {
                    Cookies.set("token", response.data.token);
                    setUpdateNavbar(true)
                    navigate("../admin-control")
                } else {
                    setErrorCode(response.data.errorCode);
                    setTimeout(() => {
                        setErrorCode(0)
                    }, 2000)
                }
            })
        }

    }

    const updateUserName = (e) => {
        setUserName(e.target.value);
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
    const typeChanged = (event) => {
        setType(event.target.value);
    }
    const signup = () => {
        navigate("../sign-up")
    }
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
            <div className={"login-form"}>
                <h1>Login Form</h1>
                <div className={"login-type"}>
                 <span style={{marginRight: "5px"}}>
                     <input type={"radio"} name={"type"} value={"login"}
                            checked={type === "login"} onChange={typeChanged} />Login
                 </span>
                    <input type={"radio"} name={"type"} value={"login as admin"}
                           checked={type === "login as admin"} onChange={typeChanged}/>Login as admin
                </div>
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
                    <button className={"sign-button"} disabled={userName.length === 0 || password.length === 0}
                            onClick={submit}>Sign In
                    </button>
                    <button className={"sign-button"}
                            onClick={signup}>Create new account
                    </button>
                </div>
            </div>
            <div className={"live-stats"}>
                <h2>{numOfUsers} users are in the system</h2>
                <h2>{numOfAuctions} auction are uploded to the system</h2>
                <h2 style={{borderRight: "none"}}>{numOfOffers} Bets were auctioned in the system</h2>
            </div>
        </div>
    )
}

export default Login;