import React, { useState } from "react";
import { useSocket } from "../contexts/SocketContext";

const NewPost = () => {
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
      setError("Titolo e contenuto sono obbligatori");
      return;
    }

    if (!socket) {
      setError("Connessione socket non disponibile");
      return;
    }

    const postPayload = {
      title,
      content,
      publishDate: Date.now(),
      tags: tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t !== ""),
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
        setError(response.error?.message || "Errore nella creazione del post");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        placeholder="Titolo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Contenuto"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (separati da virgola)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Crea Post</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default NewPost;
