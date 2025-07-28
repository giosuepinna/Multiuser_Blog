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
        padding: "1rem 2rem",
        borderBottom: "1px solid #ccc",
        marginBottom: "2rem",
      }}
    >
      <div>
        <Link to="/" style={{ textDecoration: "none", fontWeight: "bold", fontSize: "1.2rem" }}>
          📝 Multiuser Blog
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {user ? (
          <>
            <Link to="/new-post">Nuovo post</Link>
            <Link to="/profile/edit">Profilo</Link>

            {user.avatar && (
              <img
                src={user.avatar}
                alt="Avatar"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            )}

            <button onClick={handleLogout} style={{ padding: "6px 12px" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrati</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
