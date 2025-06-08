import { Navigate } from 'react-router-dom';
import { useAuth } from './components/context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;

    if (!user.email) return <Navigate to="/login" replace />;
    return children;
}
