import { Navigate } from 'react-router-dom';
import { useAuth } from './components/context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    console.log("llega", user.email)
    if (loading) return <div>Cargando...</div>; // o un spinner

    if (!user.email) return <Navigate to="/login" replace />;
    return children;
}
