import axios from "axios";
import config from "@/config";

const API = axios.create({
    baseURL: config.apiBaseUrl, // change if needed
});

export default API;
