import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialPosts = [
  {
    id: "1",
    title: "Prova post",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>",
    likes: 0,
    liked: false,
    comments: [],
  },
];

const Blog = () => {
  const [posts, setPosts] = useState(initialPosts);
  const navigate = useNavigate();

  const toggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const liked = post.liked ? false : true;
          const likes = liked ? post.likes + 1 : post.likes - 1;
          return { ...post, likes, liked };
        }
        return post;
      })
    );
  };

  const addComment = (postId, text) => {
    if (!text) return;
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: Math.random().toString(36).substr(2, 9),
            author: "giosuepinna92",
            text,
          };
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h1>I tuoi post</h1>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onToggleLike={() => toggleLike(post.id)}
          onAddComment={addComment}
          onClick={() => navigate(`/edit-post/${post.id}`)}
        />
      ))}
    </div>
  );
};

const PostCard = ({ post, onToggleLike, onAddComment, onClick }) => {
  const [commentText, setCommentText] = useState("");

  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#fff",
        cursor: "pointer",
      }}
    >
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          style={{ marginRight: "1rem" }}
        >
          {post.liked ? "💔 Dislike" : "❤️ Like"} ({post.likes})
        </button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <h4>Commenti</h4>
        {post.comments.map((c) => (
          <p key={c.id}>
            <strong>{c.author}:</strong> {c.text}
          </p>
        ))}
        <input
          type="text"
          placeholder="Scrivi un commento..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={{ width: "80%", marginRight: "0.5rem" }}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddComment(post.id, commentText);
            setCommentText("");
          }}
        >
          Invia
        </button>
      </div>
    </div>
  );
};

export default Blog;
