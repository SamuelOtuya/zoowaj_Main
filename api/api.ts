import axios from "axios";


const API=axios.create({
    baseURL: "http://192.168.100.51:8000/api/v1/"
})
export default API;