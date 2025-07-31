import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://todo-pp.longwavestudio.dev/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("❌ Errore caricamento post:", err);
        setPost(null);
      } finally {
        setLoadingPost(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`https://todo-pp.longwavestudio.dev/posts/${id}/comments`);
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Errore caricamento commenti:", err);
        setComments([]);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  return (
    <div style={styles.container}>
      {loadingPost ? (
        <p style={styles.loading}>Caricamento post...</p>
      ) : post ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </>
      ) : (
        <p style={styles.loading}>Post non trovato.</p>
      )}

      <h3 style={{ marginTop: "2rem" }}>Commenti:</h3>
      {loadingComments ? (
        <p style={styles.loading}>Caricamento commenti...</p>
      ) : comments.length === 0 ? (
        <p>Nessun commento ancora.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id || comment.id} style={styles.comment}>
            <strong>{comment.authorUsername || "Anonimo"}:</strong> {comment.text}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    minHeight: "70vh",
  },
  comment: {
    borderTop: "1px solid #ccc",
    padding: "0.5rem 0",
  },
  loading: {
    fontStyle: "italic",
    color: "#555",
  },
};

export default PostDetail;
