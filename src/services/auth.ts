import axios from "axios";
import api from "./api";

interface LoginResponse {
  fetchAccessToken: string;
}

export const login = async (email: string, name: string) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", {
      name,
      email,
    });

    const { fetchAccessToken } = response.data;

    // Expires in 1 hour
    const expirationTime: number = Date.now() + 3_600_000;

    localStorage.setItem("accessToken", fetchAccessToken);
    localStorage.setItem("expirationTime", expirationTime.toString());
  } catch (e) {
    console.error("Login failed", e);
    throw new Error("Unable to login");
  }
};

export const logout = async () => {
  if (!isTokenValid) {
    return;
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("expirationTime");
};

export const isTokenValid = (): boolean => {
  if (!localStorage.getItem("accessToken")) {
    return false;
  }
  // Token is invalid after an hour
  return Date.now() - Number(localStorage.getItem("expirationTime")) < 1000;
};
