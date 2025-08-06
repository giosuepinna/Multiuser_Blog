import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

let socket;

const connectSocket = (token) => {
  if (!token) return null;

  if (socket) {
    socket.disconnect();
    console.log("🔌 Disconnetto socket.");
  }

  console.log("🔌 Connetto socket con token:", token);

  socket = io("https://todo-pp.longwavestudio.dev/", { // <- ATTENZIONE qui, aggiunto /multiuserblog
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
    console.log("📡 SOCKET EVENTO RICEVUTO -->", event);
    if (args.length > 0) {
      console.log("📦 Contenuto evento:", args[0]);
    }
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
    } else {
      if (socket) {
        console.log("🔌 Disconnetto socket per mancanza token.");
        socket.disconnect();
        socket = null;
      }
      setSocketInstance(null);
    }

    return () => {
      if (socket) {
        console.log("🔌 Disconnetto socket (cleanup).");
        socket.disconnect();
        socket = null;
      }
    };
  }, [user?.accessToken]);

  return (
    <SocketContext.Provider value={{ socket: socketInstance }}>
      {children}
    </SocketContext.Provider>
  );
};
