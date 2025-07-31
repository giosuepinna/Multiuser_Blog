import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../contexts/SocketContext";
import { useAuth } from "../contexts/AuthContext";

const PostDetail = () => {
  const { id } = useParams();
  const { socket, lastPostUpdated } = useSocket();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // ✅ Carica post via REST
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://todo-pp.longwavestudio.dev/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Errore caricamento post");
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Errore nel fetch del post:", error);
      }
    };

    if (id && user?.accessToken) {
      fetchPost();
    }
  }, [id, user?.accessToken]);

  // ✅ Richiedi commenti via socket
  useEffect(() => {
    if (socket && id) {
      socket.emit("get-comments", { postId: id });
    }
  }, [socket, id]);

  // ✅ Gestione commenti ricevuti
  useEffect(() => {
    if (!socket) return;

    const handleComments = (data) => {
      console.log("📥 Lista commenti ricevuta:", data);
      setComments(data);
    };

    const handleNewComment = (data) => {
      console.log("📩 Nuovo commento ricevuto:", data);
      setComments((prev) => [...prev, data]);
    };

    socket.on("comments", handleComments);
    socket.on("COMMENT_CREATED", handleNewComment);
    socket.on("COMMENT_SHARED", handleNewComment);

    return () => {
      socket.off("comments", handleComments);
      socket.off("COMMENT_CREATED", handleNewComment);
      socket.off("COMMENT_SHARED", handleNewComment);
    };
  }, [socket]);

  // ✅ Invia commento + fallback + aggiornamento conteggio
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const text = newComment.trim();
    const payload = {
      postId: id,
      text,
    };

    // Mostra commento immediatamente in UI
    const tempComment = {
      _id: Date.now().toString(),
      text,
      authorUsername: user.username || "Tu",
    };
    setComments((prev) => [...prev, tempComment]);

    // 🔁 Aggiorna anche il conteggio locale
    setPost((prev) => ({
      ...prev,
      total_comments: (prev?.total_comments ?? comments.length) + 1,
    }));

    socket.emit("CREATE_COMMENT", payload, (response) => {
      console.log("✅ Risposta dal server:", response);
      if (response?.success && response.data) {
        // aggiorna commento fittizio con quello reale
        setComments((prev) =>
          prev.map((c) => (c._id === tempComment._id ? response.data : c))
        );
      }
    });

    setNewComment("");
  };

  // ✅ Aggiorna total_comments se arriva da socket
  useEffect(() => {
    if (!lastPostUpdated || lastPostUpdated._id !== id) return;

    setPost((prev) => ({
      ...prev,
      total_comments: lastPostUpdated.total_comments,
    }));
  }, [lastPostUpdated, id]);

  if (!post) return <p>Caricamento...</p>;

  return (
    <div className="container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>Commenti totali:</strong> {post.total_comments ?? comments.length}</p>

      <hr />

      <h3>Commenti</h3>
      <ul>
        {comments.map((c) => (
          <li key={c._id}>
            <strong>{c.authorUsername}</strong>: {c.text}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <textarea
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Scrivi un commento..."
          required
        />
        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default PostDetail;
