import axios from "axios";

export const getAuctionDetails = (productID, callback) => {
    axios.get("http://localhost:8989/get-auction",
        {
            params: productID
        })
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}