"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import apiClient, { clearToken, getApiErrorMessage, setToken } from "@/lib/axios";

type User = { id: string; fullName: string; email: string };

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<User>("/api/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    try {
      const { data } = await apiClient.post<{ token: string; user: User }>("/api/auth/login", {
        email,
        password,
      });
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Login failed"));
    }
  }

  async function register(fullName: string, email: string, password: string) {
    try {
      const { data } = await apiClient.post<{ token: string; user: User }>("/api/auth/register", {
        fullName,
        email,
        password,
      });
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Registration failed"));
    }
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
