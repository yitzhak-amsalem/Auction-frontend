import axios from "axios";

export const getProduct = (id, callback) => {
    axios.get("http://localhost:8989/get-product",
        {
            params: id
        })
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}