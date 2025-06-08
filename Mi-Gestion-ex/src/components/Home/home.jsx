import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TablaExpediente from '../tablaExpediente/TablaExpediente'

export default function Home() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Gestión de Archivos
                    </Typography>
                    <Button variant="outlined" color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <h1>Bienvenido, {user.email}</h1>
            <br></br>
            <main>
                <TablaExpediente />
            </main>
        </>
    );
}
