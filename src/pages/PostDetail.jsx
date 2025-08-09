import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { http } from "../api/http";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setErr("");
        const { data } = await http.get(`/posts/${id}`);
        setPost({
          id: data._id || data.id,
          title: data.title,
          content: data.content,
          author: data.authorId, // potremo sostituire con nome utente se serve
          date: new Date(data.publishDate).toLocaleString(),
          tags: data.tags || [],
          totalLikes: data.total_likes ?? 0,
          totalComments: data.total_comments ?? 0,
        });
      } catch (e) {
        setErr(e?.response?.data?.message || "Errore nel caricamento del post");
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  if (loading) return <p>Caricamento post...</p>;
  if (err) return <p style={{ color: "red" }}>{err}</p>;
  if (!post) return <p>Post non trovato.</p>;

  return (
    <div style={{ padding: "1rem 2rem", maxWidth: 700, margin: "auto" }}>
      <h1>{post.title}</h1>
      <p style={{ fontStyle: "italic", color: "#555" }}>
        Autore: {post.author} – Data: {post.date}
      </p>

      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{ marginBottom: "1.5rem" }}
      />

      <div style={{ marginBottom: "1rem" }}>
        <strong>Tags: </strong>
        {post.tags.length > 0
          ? post.tags.map((tag) => (
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
            ))
          : "Nessun tag"}
      </div>

      <div>
        ❤️ {post.totalLikes} · 💬 {post.totalComments}
      </div>
    </div>
  );
};

export default PostDetail;
