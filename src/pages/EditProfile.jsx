import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const EditProfile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("bio", bio);
      if (avatarFile) {
        formData.append("avatar", avatarFile); // 👈 avatar deve chiamarsi così secondo le API
      }

      const res = await fetch("https://todo-pp.longwavestudio.dev/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token || user.accessToken}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Errore durante l'aggiornamento del profilo");

      setMessage("✅ Profilo aggiornato con successo!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Errore: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem" }}>
      <h2>Modifica Profilo</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: "1rem" }}>
          <label>Email (non modificabile):</label>
          <input
            type="email"
            value={user?.email}
            disabled
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Nome:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="3"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* 👇 Avatar preview + input */}
        {user?.avatar && (
          <div style={{ marginBottom: "1rem" }}>
            <label>Avatar attuale:</label>
            <br />
            <img
              src={user.avatar}
              alt="Avatar"
              style={{ maxWidth: "100px", borderRadius: "8px", marginTop: "0.5rem" }}
            />
          </div>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <label>Nuovo avatar:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          Salva modifiche
        </button>

        {message && (
          <p style={{ marginTop: "1rem", color: message.startsWith("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
