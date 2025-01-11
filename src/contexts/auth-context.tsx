"use client";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/interface/type";
import { LoginType } from "@/modules/auth/schema/login.schema";
import { Dosen } from "@/modules/dosen/dosen.interface";
import { Kaprodi } from "@/modules/kaprodi/kaprodi.interface";
import React, { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginType) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
