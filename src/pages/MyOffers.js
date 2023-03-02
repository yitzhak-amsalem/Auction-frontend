import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import {getUser} from "../services/GetUser";
import {useNavigate} from "react-router-dom";
import {getMyOffers} from "../services/GetMyOffers";


export default function MyOffers() {
    const [myOffers, setMyOffers] = useState([]);
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
            getMyOffers(token, (response) => {
                setMyOffers(response.data)
            })
        }
    },[])

    return (
        <div className={"my-Offers-table"}>

        </div>
    );


}