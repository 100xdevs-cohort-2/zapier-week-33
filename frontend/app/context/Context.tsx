"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  currentUser: any; // You should replace 'any' with the actual type of currentUser
  setCurrentUser: (currentUser: any) => void; // You should replace 'any' with the actual type of currentUser
  token: string;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// our hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null); // You should replace 'any' with the actual type of currentUser
  const [token, setToken] = useState<string>("");

  const value: AuthContextType = {
    currentUser,
    setCurrentUser,
    token,
    setToken,
  };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
};
