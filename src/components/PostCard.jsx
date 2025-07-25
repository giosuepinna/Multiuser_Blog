import React, { useState } from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const {
    _id,
    title,
    content,
    publishDate,
    authorId,
    tags = [],
  } = post;

  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(true);

  const plainExcerpt = content?.replace(/<[^>]+>/g, "").slice(0, 200) + "...";

  const toggleLike = (e) => {
    e.preventDefault();
    setLiked((prev) => !prev);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const conferma = window.confirm("❗ Sei sicuro di voler eliminare questo post?");
    if (conferma) {
      setVisible(false);
    }
  };

  if (!visible) return null;

  return (
    <Link to={`/post/${_id}`} state={{ post }} style={styles.link}>
      <div style={styles.card}>
        <h2>{title}</h2>
        <p style={styles.meta}>
          scritto da <strong>{authorId}</strong> il{" "}
          {new Date(publishDate).toLocaleDateString()}
        </p>
        <p>{plainExcerpt}</p>
        {tags.length > 0 && (
          <p style={styles.tags}>Tag: {tags.join(", ")}</p>
        )}
        <div style={styles.actions}>
          <button onClick={toggleLike} style={styles.likeBtn}>
            {liked ? "❤️ Mi piace" : "🤍 Mi piace"}
          </button>
          <button onClick={handleDelete} style={styles.deleteBtn}>
            🗑 Elimina
          </button>
        </div>
        <p style={styles.readMore}>Leggi di più →</p>
      </div>
    </Link>
  );
};

const styles = {
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#f9f9f9",
    transition: "box-shadow 0.2s ease",
  },
  meta: {
    color: "#555",
    fontSize: "0.9rem",
  },
  tags: {
    color: "#0077aa",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
  },
  actions: {
    marginTop: "0.8rem",
    display: "flex",
    gap: "1rem",
  },
  likeBtn: {
    fontSize: "1rem",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    fontSize: "1rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#c0392b",
  },
  readMore: {
    marginTop: "1rem",
    color: "#0066cc",
    fontWeight: "bold",
  },
};

export default PostCard;
