import { api } from "./api";
import { storage } from "../utils/storage";
import { LoginForm, LoginResponse } from "../utils/types/auth";

export async function login(credentials: LoginForm): Promise<LoginResponse> {
  const res = await api.post("/auth/login", credentials);
  const { token, customer } = res.data;

  await storage.saveToken(token);
  await storage.saveCustomer(customer);

  return res.data;
}

export async function logout(): Promise<void> {
  await storage.clearAuth();
}

export async function getCurrentUser() {
  return await storage.getCustomer();
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await storage.getToken();
  return !!token;
}
