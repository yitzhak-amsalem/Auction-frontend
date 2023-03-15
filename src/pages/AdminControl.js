import React, {useState, useEffect} from "react";
import {getAllAuctions, getAllUsers} from "../services/AdminServices";
import {getUserDetails} from "../services/GetUserDetails";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import UserDetails from "../components/UserDetails";
import "../css/Admin.css"

export default function AdminControl() {
    const [allUsers, setAllUsers] = useState([]);
    const [auctions, setAuctions] = useState([]);
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (user) => {
        setSelectedUser(prevState => prevState === user ? null : user);
    }

    useEffect(() => {
        const token = Cookies.get("token")
        if (token === undefined) {
            navigate("../login");
        } else {
            getUserDetails(token, (response) => {
                if (response.data.success) {
                    if (!response.data.admin) {
                        navigate("../dashboard");
                    } else {
                        getAllAuctions(token, (response) => {
                            if (response.data.success) {
                                setAuctions(response.data.allAuctions)
                            }
                            setSuccess(response.data.success)
                        })
                        getAllUsers(token, (response) => {
                            if (response.data.success) {
                                setAllUsers(response.data.users)
                            }
                            setSuccess(response.data.success)
                        })
                    }
                }
                setSuccess(response.data.success)
            })
        }
    }, []);

    const goToProduct = (productID) => {
        navigate(`/product/${productID}`)
    }

    const updateUserCredit = (user, amount) => {
        user.credit = amount
    }

    return (
        <div className={"admin-page"}>
            <div className={"my-details-table users-table-admin"}>
                {
                    allUsers.length > 0 ?
                        <table style={{
                            borderRadius: "15px"
                        }}>
                            <thead>
                            <tr id={"table-row-header"} style={{fontSize: "1em"}}>
                                <th style={{borderRight: "none"}} className={"border-header"}>Users</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                allUsers.map((user, i) => {
                                    return (
                                        <>
                                            <tr style={{
                                                cursor: "pointer",
                                                backgroundColor: user === selectedUser ? "#AB0101FF" : "",
                                                color: user === selectedUser && "white",
                                                borderBottom: (i + 1 < allUsers.length) && "1px solid #AB0101FF",
                                            }}
                                                onClick={() => handleUserClick(user)}
                                                key={i}>
                                                <td>
                                                    {user.username} {
                                                    selectedUser !== user ?
                                                        <span>&#8595;</span>
                                                        :
                                                        <span>&#8593;</span>
                                                }
                                                </td>
                                            </tr>
                                            <tr style={{
                                                backgroundColor: "#fce0e0",
                                                color: "black",
                                            }}>
                                                {
                                                    selectedUser === user && <UserDetails
                                                        updateUserCredit={(amount) => updateUserCredit(user, amount)}
                                                        user={selectedUser}/>
                                                }
                                            </tr>
                                        </>
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
            <div className={"my-details-table auction-table-admin"}>
                {
                    auctions.length > 0 ?
                        <table style={{
                            borderRadius: "15px"
                        }}>
                            <thead>
                            <tr id={"table-row-header"} style={{fontSize: "1em"}}>
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
                                        <tr style={{cursor: "pointer", padding: "0px"}}
                                            onClick={() => goToProduct(auction.productObj.productID)}
                                            key={i}>
                                            <td>{auction.productObj.name}</td>
                                            <td>
                                                <img
                                                    style={{
                                                        width: "80px",
                                                        height: "80px",
                                                        border: "none",
                                                        padding: "0px",
                                                        margin: "0px"
                                                    }}
                                                    alt={auction.productObj.description}
                                                    src={auction.productObj.imageLink}/>
                                            </td>
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