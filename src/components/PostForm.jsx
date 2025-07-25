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

    console.log("👤 user:", user);

    const newPost = {
      userId: user.sub,
      author: user.email,
      title,
      content,
      tags: tags.split(",").map((t) => t.trim()),
    };

    console.log("📤 Invio evento CREATE_POST:", newPost);
    socket.emit("CREATE_POST", newPost);

    setMessage("✅ Post inviato!");
    setTitle("");
    setContent("");
    setTags("");
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

