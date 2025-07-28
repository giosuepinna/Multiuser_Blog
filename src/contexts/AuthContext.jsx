import React, { createContext, useContext, useState, useEffect } from "react";
import { connectSocket } from "../socket";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    // 🔴 Disabilita il login automatico eliminando sempre l'utente salvato
    localStorage.removeItem("user");
    setLoadingUser(false);
  }, []);

  const login = (userData) => {
    const token = userData.token || userData.accessToken || "";
    const userWithToken = { ...userData, token };
    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));
    connectSocket(token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
