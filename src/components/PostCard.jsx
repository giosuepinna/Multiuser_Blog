import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ id, title, author, date, excerpt }) => {
  return (
    <div style={styles.card}>
      <h2>{title}</h2>
      <p style={styles.meta}>
        scritto da <strong>{author}</strong> il {new Date(date).toLocaleDateString()}
      </p>
      <p>{excerpt}</p>
      <p>
        <Link to={`/post/${id}`}>Leggi di più →</Link>
      </p>
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
  },
  meta: {
    color: "#555",
    fontSize: "0.9rem",
  },
};

export default PostCard;

