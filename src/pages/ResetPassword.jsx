import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("https://todo-pp.longwavestudio.dev/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Errore durante il reset");
      }

      setMessage("✅ Password reimpostata con successo! Ora puoi accedere.");
      setTimeout(() => navigate("/login"), 3000); // redirect dopo 3 sec
    } catch (err) {
      setError(err.message || "Errore inatteso.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🔑 Reimposta Password</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleReset}>
        <div>
          <label>Nuova Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default ResetPassword;
