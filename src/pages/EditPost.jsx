import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const mockPosts = [
  {
    id: "1",
    title: "Prova post",
    content: "<p>Prova creazione post</p>",
    tags: ["demo", "test"],
  },
  // puoi aggiungere altri post se vuoi
];

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const post = mockPosts.find((p) => p.id === id);
    if (post) {
      setTitle(post.title);
      // rimuovo tag html per textarea
      setContent(post.content.replace(/<[^>]+>/g, ""));
      setTags(post.tags.join(", "));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !content.trim()) {
      setError("Titolo e contenuto sono obbligatori");
      return;
    }

    // Simulazione salvataggio (in futuro collegare a backend)
    setSuccess("Post aggiornato con successo!");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Modifica Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Titolo:
          <input
            type="text"
            placeholder="Titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
            required
          />
        </label>
        <label>
          Contenuto:
          <textarea
            placeholder="Contenuto"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", height: 200, margin: "0.5rem 0" }}
            required
          />
        </label>
        <label>
          Tags (separati da virgola):
          <input
            type="text"
            placeholder="tag1, tag2, tag3"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Aggiorna Post
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
    </div>
  );
};

export default EditPost;
