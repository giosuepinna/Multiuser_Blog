import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";
import PostCard from "../components/PostCard";

const Blog = () => {
  const { user } = useAuth();
  const socket = useSocket()?.socket;

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
        console.error("Errore nel caricamento post:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.accessToken) {
      fetchPosts();
    }
  }, [user]);

  // Ascolta nuovi post via WebSocket
  useEffect(() => {
    if (!socket) return;

    const addNewPost = (newPost) => {
      setPosts((prev) => {
        const exists = prev.some((post) => post._id === newPost._id || post.id === newPost.id);
        if (exists) return prev;
        return [newPost, ...prev];
      });
    };

    socket.on("POST_CREATED", addNewPost);
    socket.on("POST_SHARED", addNewPost);

    return () => {
      socket.off("POST_CREATED", addNewPost);
      socket.off("POST_SHARED", addNewPost);
    };
  }, [socket]);

  // Aggiunge un post finto (per test)
  const addFakePost = () => {
    const fakePost = {
      _id: Date.now().toString(),
      title: "Post di test",
      content: "Questo è un post generato localmente.",
      publishDate: new Date().toISOString(),
      tags: ["test"],
      author: {
        username: user?.username || user?.email || "anonimo",
        email: user?.email || "nessuno@email.com",
      },
    };
    setPosts((prev) => [fakePost, ...prev]);
  };

  return (
    <div>
      <h2>Blog</h2>
      <button onClick={addFakePost}>➕ Aggiungi post</button>

      {loading ? (
        <p>Caricamento...</p>
      ) : posts.length === 0 ? (
        <p>Nessun post disponibile.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id || post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default Blog;
