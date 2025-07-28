import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSocket } from "../contexts/SocketContext";
import { useAuth } from "../contexts/AuthContext";

const PostDetail = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const { postId } = useParams();
  const location = useLocation();
  const initialPost = location.state?.post;

  const [post, setPost] = useState(initialPost || null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Invia richiesta commenti appena arriva il socket
  useEffect(() => {
    if (socket && postId) {
      console.log("📥 Richiesta commenti per post:", postId);
      socket.emit("GET_COMMENTS_FOR_POST", { postId });
    }
  }, [socket, postId]);

  // Riceve i commenti dal backend
  useEffect(() => {
    if (!socket) return;

    const handleComments = (data) => {
      console.log("📨 Commenti ricevuti:", data);
      setComments(data);
    };

    socket.on("COMMENTS_FOR_POST", handleComments);

    return () => {
      socket.off("COMMENTS_FOR_POST", handleComments);
    };
  }, [socket]);

  // Aggiungi nuovo commento
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    const payload = {
      postId,
      content: newComment,
      userId: user.sub,
      author: user.email,
    };

    console.log("📤 Emit ADD_COMMENT:", payload);
    socket.emit("ADD_COMMENT", payload);
    setNewComment("");

    // ⏳ Ri-chiedi i commenti dopo 1 secondo
    setTimeout(() => {
      console.log("⏳ Ri-chiedo i commenti dopo invio...");
      socket.emit("GET_COMMENTS_FOR_POST", { postId });
    }, 1000);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{post?.title || "Post"}</h2>
      <p><strong>Autore:</strong> {post?.author || post?.authorId}</p>
      <p>{post?.content}</p>
      <hr />
      <h3>Commenti</h3>
      {comments.length === 0 ? (
        <p>Nessun commento</p>
      ) : (
        comments.map((c) => (
          <div key={c._id || c.content + c.author} style={{ marginBottom: "1rem" }}>
            <p><strong>{c.author}:</strong> {c.content}</p>
          </div>
        ))
      )}
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Scrivi un commento..."
          rows={3}
          style={{ width: "100%", padding: "0.5rem" }}
        />
        <button type="submit" style={{ marginTop: "0.5rem" }}>Invia</button>
      </form>
    </div>
  );
};

export default PostDetail;
