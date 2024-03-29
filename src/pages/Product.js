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
import {getUserDetails} from "../services/GetUserDetails";

export default function Product() {
    const navigate = useNavigate();
    let {productID} = useParams();
    const [amount, setAmount] = useState(0);
    const [success, setSuccess] = useState(undefined);
    const [token, setToken] = useState("")
    const [errorCode, setErrorCode] = useState(0);
    const [auction, setAuction] = useState(undefined)
    const [username, setUsername] = useState("")
    const {setUpdateNavbar} = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false)

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
        getUserDetails(token, (response) => {
            if (response.data.success) {
                setIsAdmin(response.data.admin)
                setUsername(response.data.username)
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
            if (response.data.success) {
                setUpdateNavbar(true)
            }
        })
    }
    const closeAuction = () => {
        sendApiPostRequest("http://localhost:8989/close-auction", {token, productID}, (response) => {
            setSuccess(response.data.success)
            setErrorCode(response.data.errorCode)
            setTimeout(() => {
                setSuccess(false)
                setErrorCode(0)
                updateAuction(token)
            }, 2000)
            if (response.data.success) {
                setUpdateNavbar(true)
            }
        })
    }

    return (
        <div className={"product-page"}>
            {
                auction !== undefined ?
                    <div style={{alignItems: "center", display: "flex", flexDirection: "column"}}>
                        <DrawProduct productToPaint={auction.productObj}/>
                        <p>Opening Date: {auction.openingDate}</p>
                        <p>Sum offers: {auction.sumOffers}</p>
                        <p>Min price: {auction.productObj.price}</p>
                        <p>
                            {
                                auction.productObj.owner.username === username ?
                                    <span> Your the owner of this auction </span>
                                    :
                                    <span>
                                        <span style={{display: "block", marginBottom: "10px"}}>Auction
                                            Owner: {auction.productObj.owner.username}
                                        </span>
                                        {
                                            auction.myOffers.length > 0 ?
                                                <>
                                                    <span style={{fontWeight: "bold"}}>My last Offers:</span>
                                                    {
                                                        auction.myOffers.map((offer, i) => {
                                                            return (
                                                                <span key={i} style={{display: "block", margin: "5px"}}>
                                                                    {(i + 1) + ". " + offer.amountOffer}
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </>
                                                :
                                                <span>You have not yet offer on this product</span>
                                        }
                                    </span>
                            }
                        </p>
                        {
                            auction.isOpen ?
                                auction.productObj.owner.username === username ?
                                    <div>
                                        <button className={"button"} disabled={auction.sumOffers < 3}
                                                onClick={closeAuction}>Close Auction
                                        </button>
                                        {
                                            (success && errorCode === null) ?
                                                <div className={"success-message"}>The auction close successfully</div>
                                                :
                                                errorCode > 0 &&
                                                <ErrorMessage errorCode={errorCode} lineBreak={true}/>
                                        }
                                    </div>
                                    :
                                    isAdmin ?
                                        <div style={{fontSize: "1.5em", fontWeight: "bold"}}>
                                            Admin can't make offers.
                                        </div>
                                        :
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
                                                    disabled={amount <= Math.max(...auction.myOffers.map(offer => offer.amountOffer)) || amount < auction.productObj.price}>
                                                Send Offer
                                            </button>
                                            {
                                                (success && errorCode === null) ?
                                                    <div className={"success-message"}>The offer send successfully</div>
                                                    :
                                                    errorCode > 0 &&
                                                    <ErrorMessage errorCode={errorCode} lineBreak={true}/>
                                            }
                                        </div>
                                :
                                <div style={{fontSize: "1.5em", fontWeight: "bold"}}>The auction is closed</div>
                        }
                    </div>
                    :
                    <div>
                        {
                            success !== undefined &&
                            <div className={"error-message"}
                                 style={{fontSize: "2.5em", marginTop: "50px", backgroundColor: ""}}>
                                No such product.
                            </div>
                        }
                    </div>
            }
        </div>
    )

}