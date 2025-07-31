import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";
import PostCard from "../components/PostCard";

const Blog = () => {
  const { user } = useAuth();
  const { socket, lastPostUpdated } = useSocket();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carica i post all'avvio
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://todo-pp.longwavestudio.dev/posts", {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        const formattedPosts = Array.isArray(data)
          ? data
          : Array.isArray(data.posts)
          ? data.posts
          : [];

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Errore nel caricamento dei post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  // 🔁 Aggiorna il numero di commenti in tempo reale
  useEffect(() => {
    if (!lastPostUpdated) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === lastPostUpdated._id
          ? { ...post, total_comments: lastPostUpdated.total_comments }
          : post
      )
    );
  }, [lastPostUpdated]);

  if (loading) return <p>Caricamento...</p>;

  return (
    <div className="space-y-4 p-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Blog;
