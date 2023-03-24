import React, {useState} from "react";
import {sendApiPostRequest} from "../services/ApiUserRequests";
import Cookies from "js-cookie";
import "../css/Admin.css"
import ErrorMessage from "../ErrorMessage";

export default function UserDetails({user, updateUserCredit}) {
    let userCredit = user.credit
    const [editCredit, setEditCredit] = useState(false);
    const [amount, setAmount] = useState(user.credit);
    const [success, setSuccess] = useState(undefined);
    const [errorCode, setErrorCode] = useState(0);
    const updateCredit = () => {
        const adminToken = Cookies.get("token")
        const userToken = user.token
        sendApiPostRequest("http://localhost:8989/update-user-credit",
            {adminToken, userToken, amount}, (response) => {
                if (response.data.success) {
                    setAmount(response.data.amount)
                }
                setSuccess(response.data.success)
                setErrorCode(response.data.errorCode)
                setTimeout(() => {
                    setSuccess(false)
                    setErrorCode(0)
                }, 3000)
            })
    }
    return (
        <p id={"user-details"}>
            <p style={{marginTop: "8px", marginBottom: 0}}>Sum Auctions: {user.sumAuctions}</p>
            <p id={"update"}>
                {
                    editCredit ?
                        <p style={{margin: "8px"}}>
                            credit: <input style={{width: "80px"}} type={"number"} value={amount}
                                           onChange={(e) => setAmount(e.target.value)}
                        />
                            <button className={"update-button"}
                                    disabled={userCredit == amount}
                                    onClick={() => {
                                        updateCredit()
                                        userCredit = amount
                                        updateUserCredit(amount)
                                        setEditCredit(false)
                                    }}>Update
                            </button>
                        </p>
                        :
                        <p style={{margin: "8px"}}>
                            credit: {user.credit} $
                        </p>
                }
                <button className={"update-button"}
                        onClick={() => setEditCredit(!editCredit)}>{editCredit ? "Close" : "Edit"}</button>
                {
                    (success && errorCode === null) ?
                        <>
                            <div style={{fontSize: "0.8em"}} className={"success-message"}>Update credit successfully
                            </div>
                        </>
                        :
                        errorCode > 0 &&
                        <ErrorMessage errorCode={errorCode} lineBreak={true}/>
                }
            </p>
        </p>
    );
}
