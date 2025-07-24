import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://todo-pp.longwavestudio.dev/posts?limit=10&direction=next");

        if (!res.ok) {
          throw new Error(`Errore HTTP: ${res.status}`);
        }

        const data = await res.json();
        console.log("📥 Post ricevuti via REST:", data.posts);
        setPosts(data.posts);
      } catch (error) {
        console.error("❌ Errore nel recupero dei post:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>⏳ Caricamento...</p>;
  if (!posts.length) return <p>📭 Nessun post disponibile.</p>;

  return (
    <div>
      <h1>📝 Ultimi post</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Blog;
