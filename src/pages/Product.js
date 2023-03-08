import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAuctionDetails} from "../services/GetAuctionDetails";
import DrawProduct from "../components/DrawProduct";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {sendApiPostRequest} from "../services/ApiUserRequests";
import ErrorMessage from "../ErrorMessage";
import {TextField} from "@mui/material";
import {AuthContext} from "../components/AuthProvider";

export default function Product() {
    const navigate = useNavigate();
    let {productID} = useParams();
    const [amount, setAmount] = useState(0);
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState("")
    const [errorCode, setErrorCode] = useState(0);
    const [auction, setAuction] = useState(undefined)
    const { setUpdateNavbar } = useContext(AuthContext);

    const updateAuction = () => {
        const token = Cookies.get("token");
        getAuctionDetails(productID, token, (response) => {
            if (response.data.success) {
                setAuction(response.data.auction)
            } else {
                setErrorCode(response.data.errorCode)
                setTimeout(() => {
                    setSuccess(false)
                    setErrorCode(0)
                }, 3000)
            }
        })
    }

    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            navigate("../login");
        } else {
            updateAuction(token)
            setToken(token)
        }
    }, [])

    const makeAnOffer = () => {
        sendApiPostRequest("http://localhost:8989/make-an-offer", {token, amount, productID}, (response) => {
            setSuccess(response.data.success)
            setErrorCode(response.data.errorCode)
            setTimeout(() => {
                setSuccess(false)
                setErrorCode(0)
            }, 3000)
            setAmount(0)
            updateAuction(token)
            if (response.data.success){
                setUpdateNavbar(true)
            }
        })
    }

    return (
        <div className={"product-page"}>
            {
                auction !== undefined ?
                    <div>
                        {/*<DrawProduct productToPaint={auction.productObj}/>*/}
                        <p>Opening Date: {auction.openingDate}</p>
                        <p>Sum offers: {auction.sumOffers}</p>
                        <p>My Offers:</p>
                        {
                            auction.myOffers.length > 0 ?
                                auction.myOffers.map((offer, i) => {
                                    return (
                                        <div key={i} style={{direction: "ltr"}}>
                                            {(i + 1) + ". " + offer.amountOffer}
                                        </div>
                                    )
                                })
                                :
                                <div>טרם הצעת הצעות למוצר זה</div>
                        }
                        <p>Auction Owner: {auction.productObj.owner.username}</p>
                        {
                            auction.isOpen ?
                                <div style={{
                                    margin: "15px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column"
                                }}>
                                    <TextField
                                        id="outlined-number"
                                        label="Enter a new offer"
                                        type={"number"}
                                        size={"medium"}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setAmount(e.target.value)}
                                        value={amount}
                                        variant="filled"
                                    />
                                    <button className={"button"} onClick={makeAnOffer}
                                            disabled={amount <= 0 || amount <= Math.max(...auction.myOffers.map(offer => offer.amountOffer))}>Send
                                        Offer
                                    </button>
                                    {
                                        (success && errorCode === null) ?
                                            <>
                                                <div id={"success-message"}>The offer send successfully</div>
                                            </>
                                            :
                                            errorCode > 0 &&
                                            <ErrorMessage errorCode={errorCode} lineBreak={true}/>
                                    }
                                </div>
                                :
                                <div>The auction is closed</div>
                        }
                    </div>
                    :
                    <div style={{fontSize: "2.5em", marginTop: "50px"}}>
                        {
                            errorCode > 0 &&
                            <ErrorMessage errorCode={errorCode} lineBreak={true}/>
                        }
                    </div>
            }
        </div>
    )

}