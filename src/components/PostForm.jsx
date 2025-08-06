import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";

const PostForm = () => {
  const { user } = useAuth();
  const socket = useSocket();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!socket || !user) {
      setMessage("⚠️ Nessuna connessione socket o utente non loggato.");
      return;
    }

    const newPost = {
      title,
      content,
      publishDate: Date.now(),
      authorId: user.sub,
      userIds: [user.sub],
      image: "",
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    };

    console.log("📤 Invio evento CREATE_POST:", newPost);

    socket.emit("CREATE_POST", newPost, (response) => {
      // callback per gestire la risposta se backend la invia
      if (response && response.success) {
        setMessage("✅ Post creato con successo!");
        setTitle("");
        setContent("");
        setTags("");
      } else if (response && response.error) {
        setMessage(`❌ Errore: ${response.error.message || "Generico"}`);
      } else {
        setMessage("✅ Post inviato!");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crea un nuovo post</h3>
      <input
        type="text"
        placeholder="Titolo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Contenuto"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tag separati da virgola"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Pubblica</button>
      <p>{message}</p>
    </form>
  );
};

export default PostForm;
