import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://todo-pp.longwavestudio.dev/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Credenziali non valide");
      }

      const data = await res.json();
      console.log("✅ Login response:", data);

      login(data);
      navigate("/");
    } catch (err) {
      console.error("❌ Errore login:", err);
      setError(err.message || "Errore durante il login");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Accedi</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 👉 Link "Password dimenticata?" */}
        <div style={{ marginBottom: "1rem" }}>
          <Link to="/forgot-password" style={{ fontSize: "0.9rem", color: "#0077cc" }}>
            Password dimenticata?
          </Link>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Accedi</button>
      </form>
    </div>
  );
};

export default Login;