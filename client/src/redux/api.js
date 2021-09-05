import axios from "axios";

// ** Axios Setup
const instance = axios.create({
    // .. where we make our configurations
    baseURL: "http://localhost:8080/",
});

instance.interceptors.request.use((req) => {
    var token = localStorage.getItem("token");
    if (token) req.headers.Authorization = "Bearer " + token;
    console.log(`[${req.method}] ${req.url}`);
    console.log(`Headers :`);
    console.log(req.headers);
    console.log(`Params : `);
    console.log(req.params);
    console.log(`Data : `);
    console.log(req.data);
    return req;
});

export default instance;