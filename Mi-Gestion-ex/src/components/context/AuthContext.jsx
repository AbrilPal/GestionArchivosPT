import { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../../data/users.json';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('user');
        if (token && email) {
        setUser({ email });
        }
    }, []);

    // Simulacion de endpoint Login 
    /* 
    Aqui iria el consumo de la api para iniciar sesión
    y validando que usuario y contraseña coincidan

    API retorna JWT, usuario y permisos 
    */
    const login = (email, password) => {
        const user = usersData.find(
        (u) => u.email === email && u.password === password
        );

        if (user) {
        // Generar un token
        const fakeToken = btoa(`${email}:${Date.now()}`);
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', email);
        setUser({ email });
        console.log(fakeToken)
        return true;
        }

        return false;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    }

    export function useAuth() {
    return useContext(AuthContext);
}
