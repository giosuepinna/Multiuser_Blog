import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActivateAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Attivazione in corso...");

  useEffect(() => {
    const activate = async () => {
      try {
        const res = await fetch(`https://todo-pp.longwavestudio.dev/user/activate/${token}`);
        if (!res.ok) throw new Error("Errore durante l'attivazione");
        const data = await res.json();
        setMessage(data.message || "✅ Account attivato con successo!");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        console.error("Errore attivazione:", err);
        setMessage("❌ Errore durante l'attivazione dell'account.");
      }
    };

    activate();
  }, [token, navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default ActivateAccount;
