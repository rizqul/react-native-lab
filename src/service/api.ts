import axios from "axios";
import { API_BASE_URL } from "@env";
import { storage } from "../utils/storage";

export const api = axios.create({
  baseURL: API_BASE_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const setApiToken = async (token: string) => {
  await storage.saveToken(token);
};

export const clearApiToken = async () => {
  await storage.clearAuth();
};
