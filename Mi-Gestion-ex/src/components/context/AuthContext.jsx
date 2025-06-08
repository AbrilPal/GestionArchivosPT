import { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../../data/users.json';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            console.log(storedUser, "efecto")
            const parsedUser = JSON.parse(storedUser);
            console.log(parsedUser.email, "ya parseado")
            if (storedUser) {
                const userData = {
                    email: parsedUser.email,
                    rol: parsedUser.rol,
                    permisos: parsedUser.permisos,
                    token: parsedUser.token
                };
                setUser(userData);
            }
        } catch (error) {
            console.error("Error parsing user from localStorage", error);
            localStorage.removeItem('user'); // Limpieza preventiva
        } finally {
            setLoading(false); // <- clave aquí
        }
    }, []);

    // Simulacion de endpoint Login 
    /* 
        Aqui iria el consumo de la api para iniciar sesión
        y validando que usuario y contraseña coincidan

        API retorna JWT, usuario y permisos 
    */
    const login = (email, password) => {
        const userf = usersData.find(
        (u) => u.email === email && u.password === password
        );

        if (userf) {
        // Generar un token falso
        const token = btoa(`${email}:${Date.now()}`);

        const userData = {
            email: userf.email,
            rol: userf.rol,
            permisos: userf.permisos,
            token
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
        }

        return false;
    };

    // funcion para cerrar sesion y limpiar variables del usuario.
    const logout = () => {
        const userData = {
            email: "",
            rol: "",
            permisos: "",
            token: ""
        };
        localStorage.removeItem('user');
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
    }

    export function useAuth() {
    return useContext(AuthContext);
}
