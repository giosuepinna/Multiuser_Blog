import React from "react";
import { useSocket } from "../contexts/SocketContext";

const DeletePostButton = ({ postId, onDeleted }) => {
  const { socket } = useSocket();

  const handleDelete = () => {
    if (!socket) {
      alert("Connessione socket non disponibile");
      return;
    }
    socket.emit("DELETE_POST", { postId }, (response) => {
      if (response.success) {
        alert("Post eliminato con successo");
        if (onDeleted) onDeleted();
      } else {
        alert("Errore eliminazione post: " + (response.error?.message || "Errore sconosciuto"));
      }
    });
  };

  return <button onClick={handleDelete}>Elimina Post</button>;
};

export default DeletePostButton;
