/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState,useEffect} from "react";
import "../css/logIn.css";
import ErrorMessage from "../ErrorMessage";
import {sendApiPostRequest} from "../services/ApiUserRequests";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function signUp(){
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[password2, setPassword2] = useState("");
    const[errorCode, setErrorCode] = useState(0);
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
                setErrorCode(0)
                navigate("../Login")
            } else {
                setErrorCode(response.data.errorCode);
            }
        })
        }

    return(
        <div>
         <table>
        <tr>
            <td>
                Username:
            </td>
            <td>
                <input type={"text"} value={username} onChange={usernameChanged}/>
            </td>
        </tr>
        <tr>
            <td>
                Password:
            </td>
            <td>
                <input type={"password"} value={password} onChange={passwordChanged}/>
            </td>
            <td>
                {
                    password.length < 6 &&  password.length > 0 &&
                    <ErrorMessage errorCode={1008} lineBreak={false}/>
                }
            </td>
        </tr>
        {
            <tr>
                <td>Repeat Password:</td>
                <td><input type={"password"} value={password2} onChange={password2Changed}/></td>
                <td>
                    {
                        password != password2 &&
                        <ErrorMessage errorCode={1007} lineBreak={true}/>
                    }
                </td>
            </tr>
        }

    </table>

    {
        errorCode > 0 &&
        <ErrorMessage errorCode={errorCode} lineBreak={true}/>
    }
    <button onClick={submit} disabled={
        password.length < 6 ||
        (password != password2 ) ||
        username.length == 0
    }>Sign Up</button>

</div>
    )
}
export default signUp;