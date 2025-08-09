// src/api/http.js
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE?.replace(/\/$/, "") ||
  "https://todo-pp.longwavestudio.dev";

export const http = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
