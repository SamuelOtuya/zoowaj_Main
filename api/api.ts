import axios from "axios";

const API = axios.create({
  baseURL: "https://capital-obviously-terrier.ngrok-free.app/api/v1/",
});

// Function to set the authorization token
export const setAuthToken = (token: string) => {
  if (token) {
    // Apply the token to every request header
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete auth header if no token is present
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;
