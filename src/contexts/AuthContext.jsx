import React, { createContext, useContext, useState, useEffect } from "react";
import { connectSocket } from "../socket";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        // Controllo: deve esserci ID utente e token valido
        if (parsedUser?.id && (parsedUser.token || parsedUser.accessToken)) {
          const token = parsedUser.token || parsedUser.accessToken;
          const completeUser = { ...parsedUser, token };
          setUser(completeUser);
          connectSocket(token);
        } else {
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("❌ Errore parsing utente da localStorage:", err);
        localStorage.removeItem("user");
      }
    }

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
