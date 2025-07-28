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
    <nav style={{ backgroundColor: "#007bff", padding: "10px", color: "white", display: "flex", justifyContent: "space-between" }}>
      <Link to="/" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>
        📱 MyBlog
      </Link>

      <div>
        {user && (
          <>
            <Link to="/new-post" style={{ color: "white", marginRight: "10px" }}>
              Nuovo Post
            </Link>

            <Link to="/profile/edit" style={{ color: "white", marginRight: "10px" }}>
              Modifica Profilo
            </Link>

            <span style={{ marginRight: "10px" }}>Ciao, {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" style={{ color: "white", marginRight: "10px" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "white" }}>
              Registrati
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
