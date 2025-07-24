import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ActivateAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Attivazione in corso...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const activate = async () => {
      try {
        const res = await axios.get(`https://todo-pp.longwavestudio.dev/user/activate/${token}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setMessage("✅ Account attivato con successo! Verrai reindirizzato al login...");
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        const msg = error.response?.data?.message || "Errore nell’attivazione dell’account.";
        setMessage(`❌ ${msg}`);
        setSuccess(false);
      }
    };

    if (token) activate();
  }, [token, navigate]);

  return (
    <div style={styles.container}>
      <h2>Attivazione Account</h2>
      <p style={success ? styles.success : styles.error}>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  success: {
    color: "green",
    marginTop: "1rem",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
};

export default ActivateAccount;
