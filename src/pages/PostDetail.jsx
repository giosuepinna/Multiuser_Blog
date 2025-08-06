import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const mockPost = {
  id: "1",
  title: "Creazione di un post",
  content: "<p>Questo è un contenuto di esempio per il post di dettaglio.</p>",
  author: "Giosuè Pinna",
  date: "2025-08-01",
  tags: [, "react", "blog"],
  comments: [
    {
      id: "c1",
      author: "Mario",
      text: "Bel post, complimenti!",
      date: "2025-08-02",
    },
    {
      id: "c2",
      author: "Anna",
      text: "Interessante, grazie per la condivisione.",
      date: "2025-08-07",
    },
  ],
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Per ora ignoriamo id, carichiamo sempre mock
  useEffect(() => {
    // Simula caricamento
    setTimeout(() => {
      setPost(mockPost);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <p>Caricamento post...</p>;

  if (!post) return <p>Post non trovato.</p>;

  return (
    <div style={{ padding: "1rem 2rem", maxWidth: 700, margin: "auto" }}>
      <h1>{post.title}</h1>
      <p style={{ fontStyle: "italic", color: "#555" }}>
        Autore: {post.author} - Data: {post.date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} style={{ marginBottom: "1.5rem" }} />

      <div style={{ marginBottom: "1rem" }}>
        <strong>Tags: </strong>
        {post.tags.map((tag) => (
          <span
            key={tag}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.3rem 0.7rem",
              borderRadius: "12px",
              marginRight: "0.5rem",
              fontSize: "0.85rem",
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      <div>
        <h3>Commenti</h3>
        {post.comments.length === 0 && <p>Nessun commento.</p>}
        {post.comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "0.5rem 0",
            }}
          >
            <p style={{ margin: 0, fontWeight: "600" }}>{comment.author}</p>
            <p style={{ margin: "0.2rem 0", fontSize: "0.9rem" }}>{comment.text}</p>
            <p style={{ fontSize: "0.75rem", color: "#888" }}>{comment.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
