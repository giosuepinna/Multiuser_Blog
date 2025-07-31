import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

let socket;

const connectSocket = (token) => {
  if (!token) return;

  if (socket) {
    socket.disconnect();
    console.log("🔌 Disconnetto socket.");
  }

  console.log("🔌 Connetto socket con token:", token);

  socket = io("https://todo-pp.longwavestudio.dev", {
    transports: ["websocket"],
    auth: {
      token: `Bearer ${token}`,
    },
  });

  socket.on("connect", () => {
    console.log("✅ Socket connesso:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Errore connessione socket:", err.message);
  });

  socket.onAny((event, ...args) => {
    console.log("📡 [socket.onAny] Evento ricevuto:", event, ...args);
  });

  return socket;
};

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    if (user?.accessToken) {
      const newSocket = connectSocket(user.accessToken);
      setSocketInstance(newSocket);
    }

    return () => {
      if (socket) {
        console.log("🔌 Disconnetto socket.");
        socket.disconnect();
      }
    };
  }, [user?.accessToken]);

  return (
    <SocketContext.Provider value={{ socket: socketInstance }}>
      {children}
    </SocketContext.Provider>
  );
};
