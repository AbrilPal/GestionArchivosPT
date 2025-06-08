import { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../../data/users.json';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

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
        // Generar un token falso
        const token = btoa(`${email}:${Date.now()}`);

        const userData = {
            email: user.email,
            rol: user.rol,
            permisos: user.permisos,
            token
        };

        localStorage.setItem('token', token);
        localStorage.setItem('user', email);
        setUser(userData);
        return true;
        }

        return false;
    };

    // funcion para cerrar sesion y limpiar variables del usuario.
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
