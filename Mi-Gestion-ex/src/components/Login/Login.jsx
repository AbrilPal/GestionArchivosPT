import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = login(email, password);

        if (success) {
        navigate('/home');
        } else {
        setError('Correo o contraseña incorrectos');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            /><br /><br />
            <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            /><br /><br />
            <button type="submit">Entrar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
