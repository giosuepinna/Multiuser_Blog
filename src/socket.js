import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (token) => {
  if (!token) {
    console.warn("⚠️ Nessun token disponibile per la connessione socket.");
    return;
  }

  if (!socket || socket.disconnected) {
    socket = io("https://todo-pp.longwavestudio.dev/multiuserblog", {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Socket connesso:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Errore di connessione socket:", err.message);
    });
  }
};

export const getSocket = () => socket;
export default getSocket;
