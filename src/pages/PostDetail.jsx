import React from "react";
import { useParams } from "react-router-dom";

const mockPosts = [
  {
    id: 1,
    title: "Benvenuti nel mio blog",
    author: "Mario Rossi",
    date: "2025-07-13",
    content: "Questo è il post completo. Ti racconto tutto quello che ho imparato per creare un blog con React.",
  },
  {
    id: 2,
    title: "React è potente",
    author: "Luca Bianchi",
    date: "2025-07-12",
    content: "Oggi parliamo di React. Un framework dichiarativo, componibile, veloce e fantastico.",
  },
];

const PostDetail = () => {
  const { id } = useParams();
  const post = mockPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <p style={{ padding: "2rem" }}>Post non trovato.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{post.title}</h1>
      <p style={{ fontStyle: "italic" }}>
        scritto da <strong>{post.author}</strong> il {new Date(post.date).toLocaleDateString()}
      </p>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
