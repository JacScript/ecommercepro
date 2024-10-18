import axios from "axios";

const BASE_URL = "http://localhost:8089";
const TOKEN =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTBiYmVjMjU5NjEwNWEyYTgxMDQwNyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MjkyNDc5MzIsImV4cCI6MTczMTgzOTkzMn0.CS2DmiF3p5bPRwoJtLsPAesPQyfeX-rd0lvSud76e5g";
//    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});