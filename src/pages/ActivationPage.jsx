import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ActivationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await fetch(`https://todo-pp.longwavestudio.dev/user/activate/${token}`);
        if (!response.ok) throw new Error("Errore nell'attivazione");
        setStatus("success");

        // Dopo 2 secondi reindirizza al login
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        setStatus("error");
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div>
      <h2>Attivazione Account</h2>
      {status === "loading" && <p>Attivazione in corso...</p>}
      {status === "success" && <p style={{ color: "green" }}>Attivazione completata! Verrai reindirizzato al login...</p>}
      {status === "error" && <p style={{ color: "red" }}>Errore: il link non è valido o è già stato usato.</p>}
    </div>
  );
};

export default ActivationPage;
