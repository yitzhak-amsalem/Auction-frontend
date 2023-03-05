import axios from "axios";

export const getAuctionDetails = (productID, token, callback) => {
    axios.get("http://localhost:8989/get-auction-by-product",
        {
            params: {
                productID: productID,
                token: token
            }
        })
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}