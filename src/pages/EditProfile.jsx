import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user?.username || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        "https://todo-pp.longwavestudio.dev/user/profile",
        {
          username,
          avatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = { ...user, username, avatar };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setMessage("✅ Profilo aggiornato con successo.");
      } else {
        setMessage("❌ Errore durante il salvataggio del profilo.");
      }
    } catch (error) {
      console.error("❌ Errore:", error);
      setMessage("❌ Errore durante il salvataggio del profilo.");
    }
  };

  const avatarToPreview = avatar?.trim() !== "" ? avatar : "https://i.imgur.com/default.png";

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Modifica Profilo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Avatar (URL Immagine):</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://i.imgur.com/default.png"
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Anteprima avatar:</label>
          <div>
            <img
              src={avatarToPreview}
              alt="Avatar Preview"
              width="100"
              height="100"
              style={{ borderRadius: "50%", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://i.imgur.com/default.png";
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button type="submit">Salva modifiche</button>
          <button type="button" onClick={() => navigate("/")}>
            Torna alla Home
          </button>
        </div>
        {message && (
          <p
            style={{
              marginTop: "1rem",
              color: message.includes("✅") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
