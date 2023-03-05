import axios from "axios";

export const getMyOffers = (token, callback) => {
    axios.get("http://localhost:8989/get-my-offers",
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