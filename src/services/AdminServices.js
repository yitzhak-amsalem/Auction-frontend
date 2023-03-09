import axios from "axios";

export const getAllAuctions = (token, callback) => {
    axios.get("http://localhost:8989/get-all-auctions",
        {
            params: {
                token
            }
        })
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}
export const getAllUsers = (token, callback) => {
    axios.get("http://localhost:8989/get-all-users",
        {
            params: {
                token
            }
        })
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}

