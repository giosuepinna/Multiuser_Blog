import React, { createContext, useContext, useEffect } from "react";
import socket, { connectSocket } from "../socket";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.accessToken) {
      console.log("🔌 Connetto socket con token:", user.accessToken);
      connectSocket(user.accessToken);
    } else {
      console.warn("⚠️ Nessun accessToken disponibile per il socket.");
    }

    return () => {
      console.log("🔌 Disconnetto socket.");
      socket.disconnect();
    };
  }, [user?.accessToken]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

