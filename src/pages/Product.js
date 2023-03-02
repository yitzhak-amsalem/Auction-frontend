import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAuctionDetails} from "../services/GetAuctionDetails";
import DrawProduct from "../components/DrawProduct";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {getUser} from "../services/GetUser";
import {sendApiPostRequest} from "../services/ApiUserRequests";
import ErrorMessage from "../ErrorMessage";

export default function Product() {
    const navigate = useNavigate();
    let { productID } = useParams();
    const [user, setUser] = useState({});
    const [newOffer, setNewOffer] = useState(0);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(0);
    const [myOffers, setMyOffers] = useState(0);

    const product = {
        name: "table",
        description: "work table",
        img: "data:image/jpeg;base64,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",
        owner: "ya",
    }
    const [auction, setAuction] = useState({
        isOpen: true,
        openingDate: "1/3/23",
        offers: 2,
        product: product,
    })

    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            navigate("../login");
        } else {
            getUser(token, (response) => {
                setUser(response.data.user);
            })
            getAuctionDetails(productID, (response) => {
                setAuction(response.data)
                setMyOffers(auction.offers.filter(offer => offer.offers === error))
            })
        }
    },[])

    const makeAnOffer = () => {
        let message;
        sendApiPostRequest("http://localhost:8989/make-an-offer", newOffer, (response)=>{
            if (response.data.success) {
                message = "ההצעה נשלחה בהצלחה!"
            } else {
                message = <ErrorMessage errorCode={response.data.errorCode} lineBreak={true}/>
            }
        })
        return message
    }

    return (
        <div className={"Product"}>
            <DrawProduct productToPaint={auction.product}/>
            <p>תאריך פתיחת המכרז:{auction.openingDate}</p>
            <p>כמות ההצעות שיש על המכרז:{auction.offers.length}</p>
            <p>ההצעות שלי:</p>
            {
                myOffers.length > 0 ?
                    myOffers.map((offer, i) => {
                        return(
                            <div key={i}>
                                {i + ". " + offer.amount}
                            </div>
                        )
                    })
                    :
                    <div>טרם הצעת הצעות למוצר זה</div>
            }
            <p>שם המשתמש שהציע את המוצר:{auction.product.owner}</p>

            <input type={"number"} value={error} placeholder={"הכנס הצעה חדשה"}
                   onChange={(e ) => setNewOffer(e.target.value)}/>
            <button onClick={makeAnOffer} disabled={newOffer <= 0}>שלח הצעה</button>
        </div>
    )

}