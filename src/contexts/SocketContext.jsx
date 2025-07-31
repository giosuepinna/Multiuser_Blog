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

  // 🎯 Log avanzato di tutti gli eventi socket ricevuti
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
  const [lastPostUpdated, setLastPostUpdated] = useState(null);

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

  // 🎯 Listener per POST_UPDATED
  useEffect(() => {
    if (!socketInstance) return;

    const handlePostUpdated = (data) => {
      console.log("📩 POST_UPDATED ARRIVATO:", data);
      setLastPostUpdated(data);
    };

    socketInstance.on("POST_UPDATED", handlePostUpdated);

    return () => {
      socketInstance.off("POST_UPDATED", handlePostUpdated);
    };
  }, [socketInstance]);

  return (
    <SocketContext.Provider value={{ socket: socketInstance, lastPostUpdated }}>
      {children}
    </SocketContext.Provider>
  );
};
