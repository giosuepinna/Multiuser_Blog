import { io } from "socket.io-client";

const socket = io("https://todo-pp.longwavestudio.dev/multiuserblog", {
  autoConnect: false,
});

export const connectSocket = (token) => {
  if (token) {
    socket.auth = { token };
    socket.connect();
  }
};

export default socket;
