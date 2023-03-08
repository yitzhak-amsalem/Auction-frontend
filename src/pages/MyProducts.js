import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {getMyProducts} from "../services/GetMyProducts";


export default function MyProducts() {

    const [MyProducts, setMyProducts] = useState([]);
    const [token, setToken] = useState("")
    const navigate = useNavigate();


    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            navigate("../login");
        } else {
            getMyProducts(token, (response) => {
                setMyProducts(response.data)
            })
        }
    }, [])
    const goToProduct = (productID) => {
        navigate(`/product/${productID}`)


        return (
            <div id={"my-Offers-table"}>
                {
                    MyProducts.length > 0 &&
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
                            MyProducts.map((product, i) => {
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
                }

            </div>
        );

    }

}