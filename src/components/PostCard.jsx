import React, { useState } from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const postId = post._id || post.id; // ✅ compatibilità con _id o id

  const {
    title,
    content,
    publishDate,
    tags = [],
    author = {},
  } = post;

  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const conferma = window.confirm("❗ Sei sicuro di voler eliminare questo post?");
    if (conferma) {
      setVisible(false);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setEditing(false);
  };

  if (!visible) return null;

  return (
    <div style={styles.card}>
      <Link to={`/post/${postId}`} style={styles.linkWrapper}>
        <h2>{title}</h2>
        <p style={styles.meta}>
          scritto da <strong>{author.username || author.email || "Anonimo"}</strong> il{" "}
          {publishDate ? new Date(publishDate).toLocaleDateString() : "?"}
        </p>

        {editing ? (
          <textarea
            value={editedContent}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={4}
            style={styles.textarea}
          />
        ) : (
          <p>{editedContent}</p>
        )}

        {tags.length > 0 && (
          <p style={styles.tags}>Tag: {tags.join(", ")}</p>
        )}
        <p style={styles.readMore}>Leggi di più →</p>
      </Link>

      <div style={styles.actions}>
        <button onClick={toggleLike} style={styles.likeBtn}>
          {liked ? "❤️ Mi piace" : "🤍 Mi piace"}
        </button>
        {editing ? (
          <button onClick={handleSave} style={styles.saveBtn}>
            💾 Salva
          </button>
        ) : (
          <button onClick={handleEdit} style={styles.editBtn}>
            ✏️ Modifica
          </button>
        )}
        <button onClick={handleDelete} style={styles.deleteBtn}>
          🗑 Elimina
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#f9f9f9",
    transition: "box-shadow 0.2s ease",
  },
  linkWrapper: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    display: "block",
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
    flexWrap: "wrap",
  },
  likeBtn: {
    fontSize: "1rem",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  editBtn: {
    fontSize: "1rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#2980b9",
  },
  saveBtn: {
    fontSize: "1rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#27ae60",
  },
  deleteBtn: {
    fontSize: "1rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#c0392b",
  },
  textarea: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    marginTop: "0.5rem",
    resize: "vertical",
  },
  readMore: {
    marginTop: "1rem",
    color: "#0066cc",
    fontWeight: "bold",
  },
};

export default PostCard;
