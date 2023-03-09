import axios from "axios";

export const getMyProducts = (token, callback) => {
    axios.get("http://localhost:8989/get-my-products",
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