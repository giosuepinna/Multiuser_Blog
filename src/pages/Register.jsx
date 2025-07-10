import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      alert('Compila tutti i campi!');
      return;
    }
    if (password !== confirmPassword) {
      alert('Le password non coincidono!');
      return;
    }
    alert('Registrazione avvenuta con successo! Ora puoi fare il login.');
    navigate('/login');
  };

  return (
    <>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br/>
        <input
          type="password"
          placeholder="Conferma Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        /><br/>
        <button type="submit">Register</button>
      </form>
      <p>
        Hai già un account? <Link to="/login">Accedi qui</Link>
      </p>
    </>
  );
};

export default Register;
