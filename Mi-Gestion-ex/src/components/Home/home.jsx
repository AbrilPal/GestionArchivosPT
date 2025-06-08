import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
        <h1>Bienvenido, {user.email}</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
}
