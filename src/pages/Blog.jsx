import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Blog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stampo tutto l'oggetto utente per capire dov'è il token
  console.log("👤 Utente:", user);

  // Recupero token da diverse possibili proprietà
  const token = user?.token || user?.accessToken || "";

  useEffect(() => {
    if (!token) {
      console.warn("❌ Nessun token trovato, impossibile caricare i post.");
      setLoading(false);
      return;
    }

    console.log("🔄 Chiamo l'API dei post con token:", token);

    fetch("https://todo-pp.longwavestudio.dev/post", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("✅ Risposta ricevuta:", data);

        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.warn("⚠️ Formato sconosciuto:", data);
          setPosts([]);
        }
      })
      .catch((err) => {
        console.error("❌ Errore fetch post:", err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p style={{ padding: "2rem" }}>Caricamento...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Ultimi post</h1>
      {posts.length === 0 ? (
        <p>Nessun post disponibile.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ marginBottom: "2rem" }}>
            <h2>{post.title}</h2>
            <p><strong>Autore:</strong> {post.author?.name || "Sconosciuto"}</p>
            <p>{post.content?.slice(0, 120) || "Contenuto non disponibile"}...</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Blog;
