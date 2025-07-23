import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Nav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>📘 MyBlog</Link>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.welcome}>Ciao, {user.username}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#007bff",
    color: "white",
    padding: "1rem 2rem",
  },
  logo: {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  welcome: {
    marginRight: "1rem",
  },
  button: {
    background: "white",
    color: "#007bff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Nav;
