import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";
import PostCard from "../components/PostCard";

const Blog = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carica i post una volta via REST
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://todo-pp.longwavestudio.dev/posts", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
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

  // Ascolta eventi socket: POST_CREATED e POST_SHARED
  useEffect(() => {
    if (!socket) return;

    const addNewPost = (newPost) => {
      setPosts((prev) => {
        const exists = prev.some((post) => post._id === newPost._id);
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

  // Test: aggiungi un post finto
  const addFakePost = () => {
    const fakePost = {
      _id: Date.now().toString(),
      title: "Post di test",
      content: "Questo è un post generato localmente.",
      author: user.email,
      tags: ["test"],
    };
    setPosts((prev) => [fakePost, ...prev]);
  };

  return (
    <div>
      <h2>Blog</h2>
      <button onClick={addFakePost}>➕ Aggiungi post finto</button>
      {loading ? (
        <p>Caricamento...</p>
      ) : posts.length === 0 ? (
        <p>Nessun post disponibile.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Blog;
