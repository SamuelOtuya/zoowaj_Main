import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.0.25:8000/api/v1/",
  // baseURL: "https://capital-obviously-terrier.ngrok-free.app/api/v1/"
});
export default API;
