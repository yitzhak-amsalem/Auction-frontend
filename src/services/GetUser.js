import axios from "axios";

export const getUser = (token, callback) => {
    axios.get("http://localhost:8989/get-user",
        {
            params: token
        })
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}