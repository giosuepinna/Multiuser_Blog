import React, { useEffect, useState } from "react";

const dummyPosts = [
  {
    id: "1",
    title: "Primo post",
    author: "Mario Rossi",
    date: "2025-08-07",
    content: "Questo è il contenuto del primo post di esempio.",
  },
  {
    id: "2",
    title: "Secondo post",
    author: "Luisa Bianchi",
    date: "2025-08-06",
    content: "Ecco un altro post per mostrare l'elenco.",
  },
  {
    id: "3",
    title: "Terzo post",
    author: "Carlo Verdi",
    date: "2025-08-05",
    content: "Ancora un altro post di esempio, semplice e chiaro.",
  },
];

const PostManager = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Qui puoi in futuro fare fetch da backend o socket
    setPosts(dummyPosts);
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Elenco Post</h1>
      {posts.length === 0 && <p>Nessun post disponibile.</p>}

      {posts.map((post) => (
        <article
          key={post.id}
          style={{
            marginBottom: "1.8rem",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            backgroundColor: "#f9fafb",
          }}
        >
          <h2 style={{ margin: "0 0 0.5rem 0", color: "#1e293b" }}>{post.title}</h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", margin: "0 0 1rem 0" }}>
            Autore: {post.author} - Data: {post.date}
          </p>
          <p style={{ color: "#334155" }}>{post.content}</p>
        </article>
      ))}
    </div>
  );
};

export default PostManager;
