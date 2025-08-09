import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/postService";

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load({ cursorArg = "", direction = "next" } = {}) {
    try {
      setLoading(true);
      setErr("");
      const { posts, nextCursor, prevCursor } = await getPosts({
        cursor: cursorArg,
        limit: 10,
        direction,
      });
      setPosts(posts);
      setNextCursor(nextCursor);
      setPrevCursor(prevCursor);
      setCursor(cursorArg || null);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Errore nel caricamento post");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Post pubblicati</h1>

      {loading && <p>Caricamento...</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}

      {!loading && posts.length === 0 && <p>Nessun post disponibile.</p>}

      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/post/${post.id}`)}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "1rem",
            marginBottom: "1rem",
            background: "#fff",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ margin: "0 0 .5rem 0" }}>{post.title}</h2>
          <div
            style={{ color: "#374151" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div style={{ marginTop: ".75rem", fontSize: ".9rem", color: "#6b7280" }}>
            <span>🗓 {new Date(post.publishDate).toLocaleString()}</span>{" · "}
            <span>🏷 {post.tags.join(", ") || "nessun tag"}</span>{" · "}
            <span>❤️ {post.totalLikes}</span>{" · "}
            <span>💬 {post.totalComments}</span>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: ".5rem", marginTop: "1rem" }}>
        <button disabled={!prevCursor || loading} onClick={() => load({ cursorArg: prevCursor, direction: "prev" })}>
          ← Precedenti
        </button>
        <button disabled={!nextCursor || loading} onClick={() => load({ cursorArg: nextCursor, direction: "next" })}>
          Successivi →
        </button>
      </div>
    </div>
  );
};

export default Blog;
