import React, {useState, useEffect} from "react";
import {getAllAuctions, getAllUsers, getUsersTable} from "../services/GetAdmins";
import {getOpenAuctions} from "../services/GetAdmins";
import {getSumOfEarings} from "../services/GetLoginDetails";
import DrawProduct from "../components/DrawProduct";
import {getUserDetails} from "../services/GetUserDetails";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function AdminControl() {
    const [allUsers, setAllUsers] = useState([]);
    const [auctions, setAuctions] = useState([]);
    const [token, setToken] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [username, setUsername] = useState("")
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token")
        if (token === undefined) {
            navigate("../login");
        } else {
            getUserDetails(token, (response) => {
                if (response.data.success) {
                    if (!response.data.admin){
                        navigate("../login");
                    } else {
                        setUsername(response.data.username)
                        setIsAdmin(response.data.admin)
                        setToken(token)
                    }
                }
                setSuccess(response.data.success)
            })
        }
        getAllAuctions(token, (response) => {
            if (response.data.success) {
                //setAuctions(response.data.allAuctions)
            }
            setSuccess(response.data.success)
        })
        getAllUsers(token, (response) => {
            if (response.data.success) {
                //setAllUsers(response.data.allAuctions)
            }
            setSuccess(response.data.success)
        })
    }, []);

    const goToUser = (user) =>{

    }
    const goToProduct = (productID) => {
        navigate(`/product/${productID}`)
    }

    return (
        <div className={"admin-page"}>
            <div className={"my-details-table"}>
            {
                allUsers.length > 0 ?
                    <table>
                        <thead>
                        <tr id={"table-row-header"}>
                            <th className={"border-header"}>Users</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            allUsers.map((user, i) => {
                                return (
                                    <tr style={{cursor: "pointer"}} onClick={() => goToUser(user)}
                                        key={i}>
                                        <td>{user.username}</td>
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
                                No users.
                            </div>
                        }
                    </div>
            }
            </div>
            <div className={"my-details-table"}>
            {
                auctions.length > 0 ?
                    <table>
                        <thead>
                        <tr id={"table-row-header"}>
                            <th className={"border-header"}>product name</th>
                            <th className={"border-header"}>product image</th>
                            <th className={"border-header"}>opening date</th>
                            <th className={"border-header"}>sum offers</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            auctions.map((auction, i) => {
                                return (
                                    <tr style={{cursor: "pointer"}} onClick={() => goToProduct(auction.productID)}
                                        key={i}>
                                        <td>{auction.productName}</td>
                                        <td>{auction.productImage}</td>
                                        <td>{auction.openingDate}</td>
                                        <td>{auction.sumOffers}</td>
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
                                No auctions.
                            </div>
                        }
                    </div>
            }
            </div>
        </div>
    );



}
