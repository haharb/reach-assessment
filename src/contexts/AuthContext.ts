import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface AuthContextProps {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const isAuthenticated = Boolean(token);

  const login = async (username: string, password: string) => {
    try {
      // Adjust URL and payload as needed.
      const response = await axios.post("https://your-api-endpoint/login", {
        username,
        password,
      });
      const receivedToken = response.data.token;
      localStorage.setItem("accessToken", receivedToken);
      setToken(receivedToken);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
