import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("https://todo-pp.longwavestudio.dev/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Errore durante l'invio");
      }

      setMessage("📩 Controlla la tua email per il link di recupero.");
    } catch (err) {
      console.error("❌ Errore:", err);
      setError(err.message || "Errore imprevisto");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Password dimenticata</h1>
      <p>Inserisci la tua email per ricevere il link di recupero.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}

        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
