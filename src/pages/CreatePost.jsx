import React, { useState } from "react";
import { useSocket } from "../contexts/SocketContext";

const CreatePost = () => {
  const { socket } = useSocket();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !content.trim()) {
      setError("Titolo e contenuto sono obbligatori.");
      return;
    }

    if (!socket) {
      setError("Connessione socket non pronta");
      return;
    }

    const postPayload = {
      title,
      content,
      publishDate: Date.now(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      image: "",
      userIds: [],
    };

    socket.emit("CREATE_POST", postPayload, (response) => {
      if (response.success) {
        setSuccess("Post creato con successo!");
        setTitle("");
        setContent("");
        setTags("");
      } else {
        setError("Errore nella creazione del post: " + response.error.message);
      }
    });
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        padding: "1rem",
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ color: "#1e293b", marginBottom: "1rem" }}>Crea Nuovo Post</h1>
      <form onSubmit={handleSubmit}>
        <label
          style={{
            display: "block",
            marginBottom: 8,
            color: "#334155",
            fontWeight: "600",
          }}
        >
          Titolo
        </label>
        <input
          type="text"
          placeholder="Inserisci il titolo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "0.6rem 0.8rem",
            marginBottom: "1rem",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            fontSize: "1rem",
            outlineColor: "#3b82f6",
          }}
        />

        <label
          style={{
            display: "block",
            marginBottom: 8,
            color: "#334155",
            fontWeight: "600",
          }}
        >
          Contenuto
        </label>
        <textarea
          placeholder="Scrivi il contenuto del post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          style={{
            width: "100%",
            padding: "0.6rem 0.8rem",
            marginBottom: "1rem",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            fontSize: "1rem",
            outlineColor: "#3b82f6",
            resize: "vertical",
          }}
        />

        <label
          style={{
            display: "block",
            marginBottom: 8,
            color: "#334155",
            fontWeight: "600",
          }}
        >
          Tags (separati da virgola)
        </label>
        <input
          type="text"
          placeholder="es. react, javascript, blog"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{
            width: "100%",
            padding: "0.6rem 0.8rem",
            marginBottom: "1.5rem",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            fontSize: "1rem",
            outlineColor: "#3b82f6",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#3b82f6",
            color: "#fff",
            padding: "0.7rem 1.5rem",
            border: "none",
            borderRadius: 8,
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
        >
          Crea Post
        </button>

        {error && <p style={{ color: "#dc2626", marginTop: "1rem" }}>{error}</p>}
        {success && <p style={{ color: "#16a34a", marginTop: "1rem" }}>{success}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
