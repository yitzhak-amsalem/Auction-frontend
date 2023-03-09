import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {getMyProducts} from "../services/GetMyProducts";
import ErrorMessage from "../ErrorMessage";


export default function MyProducts() {
    const [myProducts, setMyProducts] = useState([]);
    const [token, setToken] = useState("")
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            navigate("../login");
        } else {
            getMyProducts(token, (response) => {
                if (response.data.success) {
                    setSuccess(response.data.success)
                    setMyProducts(response.data.myProducts)
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
                myProducts.length > 0 ?
                    <table>
                        <thead>
                        <tr id={"table-row-header"}>
                            <th className={"border-header"}>product Name</th>
                            <th className={"border-header"}>max Amount</th>
                            <th className={"border-header"}>open</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            myProducts.map((product, i) => {
                                return (
                                    <tr style={{cursor: "pointer"}} onClick={() => goToProduct(product.productID)}
                                        key={i}>
                                        <td>{product.productName}</td>
                                        <td>{product.maxAmount}</td>
                                        <td>{product.isOpen ? "open" : "close"}</td>
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
                                Your don't have any product.
                            </div>
                        }
                    </div>
            }
        </div>
    );
}