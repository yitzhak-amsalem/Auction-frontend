import axios from "axios";

export const getUserDetails = (token, callback) => {
    axios.get("http://localhost:8989/get-user-details",
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
export const getAdminCredit = (token, callback) => {
    axios.get("http://localhost:8989/get-admin-credit",
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