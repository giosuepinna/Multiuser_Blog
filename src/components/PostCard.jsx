import React from "react";
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

  // Estrai un estratto semplice dal contenuto HTML
  const plainExcerpt = content?.replace(/<[^>]+>/g, "").slice(0, 200) + "...";

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
  readMore: {
    marginTop: "1rem",
    color: "#0066cc",
    fontWeight: "bold",
  },
};

export default PostCard;
