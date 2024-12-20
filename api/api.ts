import axios from "axios";

export const Url1 = "https://capital-obviously-terrier.ngrok-free.app";
export const Url2 = "https://social-smart-raven.ngrok-free.app";

export const baseURL = Url1;
const version = "api/v1";
const assoc = `${baseURL}/${version}`;

const API = axios.create({
  baseURL: assoc,
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
//   console.log("\n");
//   console.log("\n");
//   console.log("\n");
//   console.log("\n");
//   console.log("Outgoing Request:", JSON.stringify(config, null, 2));
//   return config;
// });

// API.interceptors.response.use(
//   (response) => {
//     console.log("\n");
//     console.log("\n");
//     console.log("\n");
//     console.log("\n");
//     console.debug("Incoming Response:", JSON.stringify(response, null, 2));
//     return response;
//   }
// (error) => {
//   console.log("\n");
//   console.log("\n");
//   console.log("\n");
//   console.log("\n");
//   console.error(
//     "Returned Error Response:",
//     JSON.stringify(error.response, null, 2) ||
//       JSON.stringify(error.message, null, 2)
//   );
//   return Promise.reject(error);
// }
// );

export default API;
