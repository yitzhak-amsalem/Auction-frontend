import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {getMyOffers} from "../services/GetMyOffers";
import "../css/Table.css"
import {getUserDetails} from "../services/GetUserDetails";

export default function MyOffers() {
    const [myOffers, setMyOffers] = useState([]);
    const navigate = useNavigate();
    const [success, setSuccess] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            navigate("../login");
        } else {
            getUserDetails(token, (response) => {
                if (response.data.success) {
                    if (response.data.admin) {
                        setIsAdmin(true);
                    } else {
                        getMyOffers(token, (response) => {
                            if (response.data.success) {
                                setSuccess(response.data.success)
                                setMyOffers(response.data.myOffers)
                            }
                        })
                    }
                }
                setSuccess(response.data.success)
            })
        }
    }, [])

    const goToProduct = (productID) => {
        navigate(`/product/${productID}`)
    }

    return (
        <div className={"my-details-table"}>
            {
                isAdmin ?
                    <div className={"error-message"}
                         style={{fontSize: "2.5em", marginTop: "50px", backgroundColor: ""}}>
                        Admin can't have offers.
                    </div>
                    :
                    myOffers.length > 0 ?
                        <table>
                            <thead>
                            <tr id={"table-row-header"}>
                                <th className={"border-header"}>Product</th>
                                <th className={"border-header"}>Amount</th>
                                <th className={"border-header"}>Status</th>
                                <th className={"border-header"}>Win</th>
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