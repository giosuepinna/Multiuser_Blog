import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSocket } from "../contexts/SocketContext";
import axios from "axios";

const PostDetail = () => {
  const { id: routeId } = useParams();
  const { state } = useLocation();
  const socket = useSocket();

  const [post, setPost] = useState(state?.post || null);
  const [loading, setLoading] = useState(!state?.post);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const postId = post?._id || routeId;

  // 📥 Recupera post via socket se non già passato via state
  useEffect(() => {
    if (!socket || post || !routeId) return;

    socket.emit("get-post-by-id", routeId);

    const handlePostData = (data) => {
      setPost(data);
      setLoading(false);
    };

    socket.on("post-data", handlePostData);

    return () => {
      socket.off("post-data", handlePostData);
    };
  }, [socket, post, routeId]);

  // 📥 Recupera commenti via REST
  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `https://todo-pp.longwavestudio.dev/posts/${postId}/comments`
        );
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Errore recuperando commenti:", err);
      }
    };

    fetchComments();
  }, [postId]);

  // 📨 Invia nuovo commento
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Invia via socket
    socket.emit("new-comment", {
      postId,
      text: newComment,
    });

    // Aggiungi localmente (senza aspettare il refresh REST)
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        authorId: "Tu",
        text: newComment,
      },
    ]);
    setNewComment("");
  };

  if (loading) return <p>Caricamento...</p>;
  if (!post) return <p>Post non trovato.</p>;

  return (
    <div style={styles.container}>
      <h1>{post.title}</h1>
      <p style={styles.meta}>
        ✍️ scritto da <strong>{post.author?.username || post.authorId}</strong> il{" "}
        {new Date(post.publishDate).toLocaleDateString()}
      </p>
      <p>{post.content}</p>

      {post.tags?.length > 0 && (
        <p style={styles.tags}>🏷️ Tag: {post.tags.join(", ")}</p>
      )}

      <p style={styles.stats}>
        ❤️ {post.total_likes || 0} like | 💬 {comments.length} commenti
      </p>

      <div style={styles.commentSection}>
        <h3>💬 Commenti</h3>
        {comments.length > 0 ? (
          <ul style={styles.commentList}>
            {comments.map((comment) => (
              <li key={comment._id || comment.id} style={styles.comment}>
                <strong>{comment.authorId || "Anonimo"}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nessun commento ancora.</p>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            rows="3"
            placeholder="Scrivi un commento..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>
            Invia
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "700px",
    margin: "2rem auto",
  },
  meta: {
    color: "#666",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
  tags: {
    color: "#0077aa",
    marginTop: "1rem",
    fontStyle: "italic",
  },
  stats: {
    marginTop: "1rem",
    fontWeight: "bold",
  },
  commentSection: {
    marginTop: "2rem",
    paddingTop: "1rem",
    borderTop: "1px solid #ccc",
  },
  commentList: {
    listStyleType: "none",
    padding: 0,
  },
  comment: {
    backgroundColor: "#f1f1f1",
    padding: "0.5rem",
    borderRadius: "5px",
    marginBottom: "0.5rem",
  },
  form: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  textarea: {
    resize: "vertical",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: "0.5rem",
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#0077cc",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PostDetail;
