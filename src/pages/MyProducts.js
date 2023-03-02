import React, {useState, useEffect} from "react";
import DrawProduct from "../components/DrawProduct";


export default function MyProducts() {

    const [MyProducts, setMyProducts] = useState([]);

    /*useEffect(() => {
        getLeagueTableLive((response) => {
            const updatedTable = response.data;
            setLeagueTableLive(updatedTable);
        })
    }, );*/

    return (
        <div className={"My-Products"}>
            <DrawProduct table={MyProducts}/>
        </div>
    );


}
