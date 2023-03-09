import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {getMyOffers} from "../services/GetMyOffers";
import "../css/Table.css"
import ErrorMessage from "../ErrorMessage";


export default function MyOffers() {
    const [myOffers, setMyOffers] = useState([]);
    const navigate = useNavigate();
    const [token, setToken] = useState("")
    const [success, setSuccess] = useState(0);



    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            navigate("../login");
        } else {
            getMyOffers(token, (response) => {
                if (response.data.success){
                    setSuccess(response.data.success)
                    setMyOffers(response.data.myOffers)
                }
                setToken(token)
            })
        }
    }, [])

    const goToProduct = (productID) => {
        navigate(`/product/${productID}`)
    }

    return (
        <div className={"my-details-table"}>
            {
                myOffers.length > 0 ?
                    <table>
                        <thead>
                        <tr id={"table-row-header"}>
                            <th className={"border-header"}>product</th>
                            <th className={"border-header"}>amount</th>
                            <th className={"border-header"}>open</th>
                            <th className={"border-header"}>win</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            myOffers.map((offer, i) => {
                                return (
                                    <tr style={{cursor: "pointer"}} onClick={() => goToProduct(offer.productID)}
                                        key={i}>
                                        <td>{offer.productName}</td>
                                        <td>{offer.amountOffer}</td>
                                        <td>{offer.isOpen ? "open" : "close"}</td>
                                        {
                                            offer.isOpen ?
                                                <td>-</td>
                                                :
                                                <td>{offer.isWin ? "win!" : "maybe next time"}</td>
                                        }
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    :
                    <div>
                        {
                            success &&
                            <div className={"error-message"}
                                 style={{fontSize: "2.5em", marginTop: "50px", backgroundColor: ""}}>
                                You don't have any offer.
                            </div>
                        }
                    </div>
            }
        </div>
    );


}