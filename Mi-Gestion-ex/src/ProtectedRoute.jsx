import { Navigate } from 'react-router-dom';
import { useAuth } from './components/context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;
    return children;
}
