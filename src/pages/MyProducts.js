import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import {getUser} from "../services/GetUser";
import {useNavigate} from "react-router-dom";
import {getMyProducts} from "../services/GetMyProducts";


export default function MyProducts() {

    const [MyProducts, setMyProducts] = useState([]);
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            navigate("../login");
        } else {
            getUser(token, (response) => {
                setUser(response.data.user);
            })
            getMyProducts(token, (response) => {
                setMyProducts(response.data)
            })
        }
    },[])

    return (
        <div className={"my-products-table"}>

        </div>
    );

}






