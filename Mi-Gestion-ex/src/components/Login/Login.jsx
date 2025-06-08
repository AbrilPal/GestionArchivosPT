import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css'
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
    const { login,logout } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        logout()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simular tiempo de espera de API
        setTimeout(() => {
            const success = login(email, password);
            setLoading(false);

            if (success) {
                navigate('/home');
            } else {
                setError('Correo o contraseña incorrectos');
            }
        }, 1000);
    };

    return (
        <div className='contenedorLogin'>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit} className='formLogin'>
                <TextField 
                    id="email" 
                    label="Correo electronico" 
                    variant="outlined"
                    type="email"
                    className='inputLogin'
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <br /><br />
                <TextField 
                    id="password" 
                    label="Contraseña" 
                    variant="outlined"
                    type="password"
                    className='inputLogin'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br /><br />
                <Button variant="contained" color="success" type="submit">
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
                </Button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
