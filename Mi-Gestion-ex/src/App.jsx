import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/home';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
