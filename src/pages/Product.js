import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAuctionDetails} from "../services/GetAuctionDetails";
import DrawProduct from "../components/DrawProduct";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {sendApiPostRequest} from "../services/ApiUserRequests";
import ErrorMessage from "../ErrorMessage";

export default function Product() {
    const navigate = useNavigate();
    let { productID } = useParams();
    const [amount, setAmount] = useState(0);
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState("")
    const [error, setError] = useState(0);
    const [auction, setAuction] = useState(undefined)

    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            navigate("../login");
        } else {
            console.log(productID)
            getAuctionDetails(productID, token, (response) => {
                if (response.data.success) {
                    setToken(token)
                    setAuction(response.data.auction)
                    console.log(auction)
                } else {
                    return(
                        <ErrorMessage errorCode={response.data.errorCode} lineBreak={true}/>
                    )
                }

            })
        }
    },[])

    const makeAnOffer = () => {
        let message;
        sendApiPostRequest("http://localhost:8989/make-an-offer", {token, amount, auction}, (response)=>{
            if (response.data.success) {
                message = "ההצעה נשלחה בהצלחה!"
            } else {
                message = <ErrorMessage errorCode={response.data.errorCode} lineBreak={true}/>
            }
        })
        return message
    }

    return (
        <div className={"product"}>
            {
                auction !== undefined &&
                <div>
                    {/*<DrawProduct productToPaint={auction.productObj}/>*/}
                    <p>תאריך פתיחת המכרז:{auction.openingDate}</p>
                    <p>כמות ההצעות שיש על המכרז:{auction.sumOffers}</p>
                    <p>ההצעות שלי:</p>
                    {
                        auction.myOffers.length > 0 ?
                            auction.myOffers.map((offer, i) => {
                                return(
                                    <div key={i}>
                                        {(i+1) + ". " + offer.amountOffer}
                                    </div>
                                )
                            })
                            :
                            <div>טרם הצעת הצעות למוצר זה</div>
                    }
                    <p>שם המשתמש שהציע את המוצר:{auction.productObj.owner.username}</p>

                    <input type={"number"} value={amount} placeholder={"הכנס הצעה חדשה"}
                           onChange={(e ) => setAmount(e.target.value)}/>
                    <button onClick={makeAnOffer} disabled={amount <= 0}>שלח הצעה</button>
                </div>
            }
        </div>
    )

}