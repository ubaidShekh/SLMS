import axios from "axios";

export const API = axios.create({
  baseURL: "https://attendanceapp-rcqk.onrender.com",
  timeout: 10000, // 10 sec timeout
  headers: {
    "Content-Type": "application/json",
  },
});
