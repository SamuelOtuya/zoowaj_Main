import axios from "axios";

export const Url1 = "https://capital-obviously-terrier.ngrok-free.app/api/v1";
export const Url2 = "https://social-smart-raven.ngrok-free.app/api/v1/";

const API = axios.create({
  baseURL: Url1,
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

// API.interceptors.request.use((config) => {
//   console.log("Outgoing Request:", config);
//   return config;
// });

// API.interceptors.response.use(
//   (response) => {
//     console.log("Incoming Response:", response);
//     return response;
//   },
//   (error) => {
//     console.error("Returned Error Response:", error.response || error.message);
//     return Promise.reject(error);
//   }
// );

export default API;
