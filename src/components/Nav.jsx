import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Nav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.8rem 2rem",
        backgroundColor: "#1e293b", // blu scuro moderno
        color: "#f1f5f9", // testo chiaro
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: "700",
          fontSize: "1.5rem",
          textDecoration: "none",
          color: "#f1f5f9",
          userSelect: "none",
        }}
      >
        📝 Multiuser Blog
      </Link>

      {user ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.8rem",
          }}
        >
          <Link
            to="/create"
            style={linkStyle}
          >
            Nuovo post
          </Link>
          <Link
            to="/posts"
            style={linkStyle}
          >
            Posts
          </Link>
          <Link
            to="/profile"
            style={linkStyle}
          >
            Profilo
          </Link>

          <Link to="/profile" style={{ display: "flex", alignItems: "center" }}>
            <img
              src={user.avatar || "https://via.placeholder.com/40?text=?"}
              alt="Avatar"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #3b82f6",
                boxShadow: "0 0 6px rgba(59,130,246,0.6)",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/40?text=?";
              }}
            />
          </Link>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#ef4444",
              border: "none",
              color: "#fff",
              padding: "0.4rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#dc2626")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#ef4444")}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" style={linkStyle}>
          Login
        </Link>
      )}
    </nav>
  );
};

const linkStyle = {
  color: "#cbd5e1",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "1rem",
  userSelect: "none",
  transition: "color 0.2s",
  cursor: "pointer",
};

export default Nav;
