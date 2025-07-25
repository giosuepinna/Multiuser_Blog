import React, { createContext, useContext, useEffect, useState } from "react";
import getSocket, { connectSocket } from "../socket";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    if (user?.accessToken) {
      console.log("🔌 Connetto socket con token:", user.accessToken);
      connectSocket(user.accessToken);

      const socket = getSocket();

      if (socket) {
        // Log globale per ogni evento ricevuto
        socket.onAny((event, ...args) => {
          console.log("📡 [socket.onAny] Evento ricevuto:", event, ...args);
        });

        // Log specifico per il post creato
        socket.on("POST_CREATED", (data) => {
          console.log("🆕 Evento POST_CREATED ricevuto:", data);
        });

        setSocketInstance(socket);
      }
    } else {
      console.warn("⚠️ Nessun accessToken disponibile per il socket.");
    }

    return () => {
      const socket = getSocket();
      if (socket) {
        console.log("🔌 Disconnetto socket.");
        socket.disconnect();
      }
    };
  }, [user?.accessToken]);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};
