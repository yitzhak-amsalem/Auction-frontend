import React, {useState, useEffect} from "react";
import {getUsersTable} from "../services/GetTable";
import {getOpenAuctions} from "../services/GetTable";
import {getSumOfEarings} from "../services/GetEarnings";
import DrawProduct from "../components/DrawProduct";

export default function AdminControl() {
    const [usersTable, setUsersTable] = useState([]);
    const [openAuctions, setOpenAuctions] = useState([]);
    const [sumOfEarings, setSumOfEarings] = useState([]);

    useEffect(() => {
        getUsersTable( (response) => {
            const updatedTable = response.data;
            setUsersTable(updatedTable);
        })
    }, []);

    useEffect(() => {
        getOpenAuctions( (response) => {
            const updatedTable = response.data;
            setOpenAuctions(openAuctions);
        })
    }, []);

    useEffect(() => {
        getSumOfEarings( (response) => {
            const updatedTable = response.data;
            setSumOfEarings(sumOfEarings);
        })
    }, []);

    return (

        <div className={"users-auctions-tables"}>
            <DrawProduct table={usersTable}/>
            <DrawProduct table={openAuctions}/>
            <h1>
                The System has earned {sumOfEarings} for the sales
            </h1>
        </div>
    );



}
