import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_EXPRESS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("mental-jwt-token")}`
  },
});
