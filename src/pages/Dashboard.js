import React, {useState, useEffect} from "react";
import {getAllAuctions} from "../services/AdminServices";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {getUserDetails} from "../services/GetUserDetails";

export default function Dashboard() {
    const [auctions, setAuctions] = useState([]);
    const [token, setToken] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [searchProduct, setSearchProduct] = useState("")
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        const token = Cookies.get("token")
        if (token === undefined) {
            navigate("../login");
        } else {
            getUserDetails(token, (response) => {
                if (response.data.success) {
                    if (response.data.admin) {
                        navigate("../login");
                    } else {
                        setIsAdmin(response.data.admin)
                        setToken(token)
                    }
                }
                setSuccess(response.data.success)
            })
        }
        getAllAuctions(token, (response) => {
            if (response.data.success) {
                setAuctions(response.data.allAuctions)
            }
            setSuccess(response.data.success)
        })
    }, []);

    const goToProduct = (productID) => {
        navigate(`/product/${productID}`)
    }


    return (
        <div className={"dashboard-page"}>
            <div>
                Search:
                <input value={searchProduct} placeholder={"Enter a product name..."} onChange={(e) => setSearchProduct(e.target.value)}/>
            </div>
            <div className={"my-details-table"}>
                {
                    auctions.length > 0 ?
                        <table style={{
                            width: "50%",
                            borderRadius: "15px"
                        }}>
                            <thead>
                            <tr id={"table-row-header"}>
                                <th className={"border-header"}>Product name</th>
                                <th className={"border-header"}>Product image</th>
                                <th className={"border-header"}>Opening date</th>
                                <th className={"border-header"}>My offers</th>
                                <th className={"border-header"}>Sum offers</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                auctions.filter(auction => auction.productObj.name.startsWith(searchProduct)).map((auction, i) => {
                                    return (
                                        <tr style={{cursor: "pointer"}}
                                            onClick={() => goToProduct(auction.productObj.productID)}
                                            key={i}>
                                            <td>{auction.productObj.name}</td>
                                            <td>
                                                <img style={{width: "100px", height: "100px"}}
                                                     src={auction.productObj.imageLink}/>
                                            </td>
                                            <td>{auction.openingDate}</td>
                                            <td>{auction.myOffers.length}</td>
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