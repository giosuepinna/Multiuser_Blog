import React, { createContext, useContext, useState, useEffect } from "react";
import { connectSocket } from "../socket"; // ✅ IMPORT FONDAMENTALE

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser.token || parsedUser.accessToken) {
          setUser(parsedUser);
          connectSocket(parsedUser.token || parsedUser.accessToken); // ✅ RIATTIVA SOCKET SE GIÀ LOGGATO
        }
      } catch (err) {
        console.error("Errore parsing utente da localStorage:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData) => {
    const userWithToken = {
      ...userData,
      token: userData.token || userData.accessToken || "",
    };
    setUser(userWithToken);
    localStorage.setItem("user", JSON.stringify(userWithToken));

    connectSocket(userWithToken.token); // ✅ CONNETTI SOCKET DOPO LOGIN
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // eventualmente potresti anche fare socket.disconnect() qui
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
