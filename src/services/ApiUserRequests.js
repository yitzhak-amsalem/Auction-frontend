import axios from "axios";

export const sendApiPostRequest = (request, params, callback) => {
    axios.post(request, null, {
        params
    }).then(response => {
        if (callback) {
            callback(response);
        }
    })
}
