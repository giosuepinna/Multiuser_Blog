import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Blog = () => {
  const { userId, accessToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    const fetchPosts = async () => {
      try {
        const response = await fetch("https://todo-pp.longwavestudio.dev/posts", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Errore nel caricamento dei post");
        }

        const data = await response.json();

        console.log("userId:", userId);
        console.log("Post ricevuti:", data.posts);

        const userPosts = data.posts.filter(
          (post) =>
            post.authorId?.toLowerCase().trim() === userId?.toLowerCase().trim()
        );

        console.log("Post filtrati per userId:", userPosts);

        setPosts(userPosts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [accessToken, userId]);

  if (loading) return <p>Caricamento post...</p>;

  if (posts.length === 0) return <p>Nessun post disponibile.</p>;

  return (
    <div>
      <h1>I tuoi post</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.content }} />
            {/* Aggiungi bottoni Modifica/Elimina se vuoi */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
