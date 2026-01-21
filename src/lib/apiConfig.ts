import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api", // Next.js automatically proxies this to your API routes
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // Only needed if backend is on a different domain (e.g. localhost:8080 vs localhost:3000)
});