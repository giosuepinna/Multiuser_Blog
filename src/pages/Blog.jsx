import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";
import PostCard from "../components/PostCard";
import { useSearchParams, useNavigate } from "react-router-dom";

const Blog = () => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedTag = searchParams.get("tag");

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
        console.log("📥 Post ricevuti:", data);

        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          throw new Error("Formato dati non valido");
        }
      } catch (err) {
        console.log("❌ Errore:", err);
        setError(err.message || "Errore nel caricamento dei post");
      }
    };

    if (user?.accessToken) {
      fetchPosts();
    }
  }, [user?.accessToken]);

  const handleTagClick = (tag) => {
    setSearchParams({ tag });
  };

  const handleResetFilter = () => {
    setSearchParams({});
  };

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags?.includes(selectedTag))
    : posts;

  if (error) return <p style={{ padding: "2rem", color: "red" }}>❌ {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ultimi post</h2>

      {selectedTag && (
        <div className="mb-4">
          <p className="mb-2">
            🔍 Post con tag: <strong>{selectedTag}</strong>
          </p>
          <button
            onClick={handleResetFilter}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded"
          >
            Tutti i post
          </button>
        </div>
      )}

      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} onTagClick={handleTagClick} />
      ))}
    </div>
  );
};

export default Blog;
