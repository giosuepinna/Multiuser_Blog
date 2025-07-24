import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";

const CreatePost = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title || !content) {
      setError("Titolo e contenuto obbligatori.");
      return;
    }

    // Invia il post al backend via socket
    socket.emit("create-post", { title, content }, (response) => {
      if (response?.status === "ok") {
        console.log("✅ Post creato con successo via socket!");
        navigate("/"); // Torna alla home
      } else {
        console.error("❌ Errore socket:", response?.error || "Errore sconosciuto");
        setError(response?.error || "Errore durante la creazione del post");
      }
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Crea nuovo post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titolo:</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Contenuto:</label>
          <textarea
            value={content}
            required
            rows="6"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Pubblica</button>
      </form>
    </div>
  );
};

export default CreatePost;
