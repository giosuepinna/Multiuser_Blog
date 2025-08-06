import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const { user, setUser, accessToken } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!user) return <p>Caricamento...</p>;

  const validateUsername = (name) => {
    // Alphanumerico, 3-30 caratteri
    return /^[a-zA-Z0-9]{3,30}$/.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateUsername(username)) {
      setError("Username non valido. Solo lettere e numeri, 3-30 caratteri.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://todo-pp.longwavestudio.dev/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ username, avatar }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Errore durante l'aggiornamento");
      }

      const updatedUser = await res.json();

      // Aggiorna contesto Auth
      setUser((old) => ({
        ...old,
        username: updatedUser.username,
        avatar: updatedUser.avatar,
      }));

      // Redirect a profilo
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Modifica Profilo</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            disabled={loading}
            placeholder="Nuovo username"
          />
        </label>

        <label style={styles.label}>
          Avatar (URL o codice):
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            style={styles.input}
            disabled={loading}
            placeholder="Inserisci URL o codice avatar"
          />
        </label>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Salvando..." : "Salva Modifiche"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.25rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default ProfileEdit;
