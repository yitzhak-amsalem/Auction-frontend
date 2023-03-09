import axios from "axios";

export const getSumOfEarings = (callback) => {
    axios.get("http://localhost:8989/get-sum-of-earnings-table")
        .then(response => {
            if (callback) {
                callback(response);
            }
        })
}