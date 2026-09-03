import { nextServer } from "../api";

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await nextServer.post("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await nextServer.post("/auth/login", data);

  return response.data;
};

export const logoutUser = async () => {
  const response = await nextServer.post("/auth/logout");

  return response.data;
};

export const refreshUser = async () => {
  const response = await nextServer.post("/auth/refresh", undefined, {
    skipAuthRefresh: true,
  });

  return response.data;
};