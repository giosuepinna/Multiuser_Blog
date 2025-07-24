import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../contexts/SocketContext";

const NewPost = () => {
  const socket = useSocket();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      content: formData.content,
      publishDate: Date.now(),
      tags: formData.tags.split(",").map((tag) => tag.trim().toLowerCase()),
    };

    socket.emit("CREATE_POST", payload, (response) => {
      if (response?.success) {
        navigate("/");
      } else {
        alert("Errore nella creazione del post:\n" + (response?.error?.message || "Errore sconosciuto"));
      }
    });
  };

  return (
    <div style={styles.container}>
      <h1>Nuovo Post</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Titolo"
          value={formData.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="content"
          placeholder="Contenuto"
          value={formData.content}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tag (separati da virgola)"
          value={formData.tags}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Pubblica</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
  },
  textarea: {
    height: "150px",
    padding: "0.5rem",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "0.75rem",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default NewPost;
