import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import DrawProduct from "../components/DrawProduct";
import {getProduct} from "../services/GetMyProducts";
import {useNavigate} from "react-router-dom";


export default function MyProducts() {

    const [MyProducts, setMyProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProduct((response) => {
            const updatedTable = response.data;
            setMyProducts(updatedTable);
        })
    }, );
    useEffect(() => {
        const token = Cookies.get("token");
        if (token === undefined) {
            navigate("../login");
        } else {
            getProduct((response) => {
                const updatedTable = response.data;
                setMyProducts(updatedTable);
            })
        }
    },[])
    const goToProduct = (productID) => {
        navigate(`/product/${productID}`)
    }

    return (
        <div className={"My-Products"}>
            <DrawProduct table={MyProducts} onClick={() => goToProduct(offer.productID)}/>
        </div>
    );


}
