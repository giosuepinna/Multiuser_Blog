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
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: "1.2rem", textDecoration: "none" }}>
        📝 Multiuser Blog
      </Link>

      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to="/create">Nuovo post</Link>
          <Link to="/profile">Profilo</Link>

          <Link to="/profile">
            <img
              src={user.avatar}
              alt="Avatar"
              style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/32?text=?"; // fallback se immagine non valida
              }}
            />
          </Link>

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
