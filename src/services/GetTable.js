import axios from "axios";

export const getAuctionTable = (callback) => {
    axios.get("http://localhost:8989/get-auction-table")
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}
export const getUsersTable = (callback) => {
    axios.get("http://localhost:8989/get-users-table")
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}

export const getOpenAuctions = (callback) => {
    axios.get("http://localhost:8989/get-open-auctions-table")
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}
