import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("Giosue");
  const [email, setEmail] = useState("giosuepinn@gmail.com");
  const [password, setPassword] = useState("123456ab");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error("❌ Risposta non JSON:\n" + text);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Errore durante la registrazione");
      }

      console.log("✅ Registrazione riuscita:", data);
      navigate("/login");
    } catch (err) {
      console.error("❌ Errore:", err.message);
      setError("Registrazione fallita: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Registrati</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
};

export default Register;
