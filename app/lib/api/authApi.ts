import { clientApi } from "./clientApi";

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
  const response = await clientApi.post("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await clientApi.post("/auth/login", data);

  return response.data;
};

export const logoutUser = async () => {
  const response = await clientApi.post("/auth/logout");

  return response.data;
};

export const refreshUser = async () => {
  const response = await clientApi.post("/auth/refresh", undefined, {
    skipAuthRefresh: true,
  });

  return response.data;
};