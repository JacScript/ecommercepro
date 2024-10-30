import axios from "axios";

const BASE_URL = "http://localhost:8089";


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Attach the token from localStorage dynamically to each request
userRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});












// import axios from "axios";

// const BASE_URL = "http://localhost:8089";

// // Function to retrieve the token from localStorage
// const getToken = () => {
//   const persistedData = JSON.parse(localStorage.getItem("persist:root"));
//   return persistedData?.user ? JSON.parse(persistedData.user).currentUser.accessToken : null;
// };

// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { Authorization: `Bearer ${getToken()}` },  // Ensure the correct token retrieval method
// });

// // Call this function when registering a user
// export const registerUser = async (userData) => {
//   try {
//     const response = await publicRequest.post("/register", userData);
//     const { accessToken } = response.data;

//     // Save token and user data to localStorage
//     if (accessToken) {
//       const currentUser = { ...response.data, accessToken }; // Save entire response if needed
//       localStorage.setItem("persist:root", JSON.stringify({ user: JSON.stringify({ currentUser }) }));
//     }
//     return response.data;
//   } catch (error) {
//     console.error("Registration error:", error);
//     throw error;
//   }
// };


































// import axios from "axios";

// const BASE_URL = "http://localhost:8089";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;   

// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   header: { token: `Bearer ${TOKEN}` },
// });