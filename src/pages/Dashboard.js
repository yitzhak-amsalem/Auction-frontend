import React, {useState, useEffect} from "react";
import {getAllAuctions, getAuctionTable} from "../services/GetAdmins";
import DrawProduct from "../components/DrawProduct";

export default function Dashboard() {
    const [auctionTable, setAuctionTable] = useState([]);

    useEffect(() => {
        getAllAuctions( (response) => {
            const updatedTable = response.data;
            setAuctionTable(updatedTable);
        })
    }, []);

    return (
        <div className={"auction-table"}>
               //TODO filter this with search- to ask dvir and itzchk ho we want to tdo this
        </div>
    );
}
