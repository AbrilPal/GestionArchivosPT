import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import expedienteData from '../../data/expedientes.json'; // tu JSON local


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        width: '700px',
        margin: 'auto',
        borderRadius: 12,
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ModalIngreso({ open, handleClose }) {
    const [expedientes, setExpedientes] = useState([]);
    const [today, setToday] = useState('');
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [fiscal, setFiscal] = useState('');


    useEffect(() => {
        const fechaActual = new Date();
        const yyyy = fechaActual.getFullYear();
        const mm = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const dd = String(fechaActual.getDate()).padStart(2, '0');
        setToday(`${yyyy}-${mm}-${dd}`);

        setExpedientes(expedienteData); 
    }, []);

    const handleSubmit = (e) => {
    e.preventDefault();

    const nuevo = {
        id: (expedientes.length + 1).toString(),
        titulo: titulo,
        Tipo: tipo,
        fiscalRemitente: fiscal,
        fechaRecepcion: today,
        estado: 'Ingreso',
        solicitante: []
    };

    setExpedientes(prev => [...prev, nuevo]);
    // Aqui mandaria al API los datos del nuevo ingreso
    alert(`Expediente nuevo:
        ID: ${nuevo.id}
        titulo: ${nuevo.titulo}
        Tipo: ${nuevo.Tipo}
        Fiscal Remitente: ${nuevo.fiscalRemitente}
        Fecha Recepción: ${nuevo.fechaRecepcion}
        Estado: ${nuevo.estado}
        `);
    handleClose();
};


    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth={false}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Ingresar Expediente
            </DialogTitle>

            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>

            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <TextField
                        fullWidth
                        id="titulo"
                        label="Título"
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <Box mt={2}>
                        <InputLabel id="tipo-label">Tipo</InputLabel>
                        <Select
                            labelId="tipo-label"
                            id="tipo"
                            fullWidth
                            defaultValue=""
                            required
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <MenuItem value="fisico">Físico</MenuItem>
                            <MenuItem value="digital">Digital</MenuItem>
                        </Select>
                    </Box>
                    <Box mt={2}>
                        <InputLabel id="fiscal-label">Fiscal Remitente</InputLabel>
                        <Select
                            labelId="fiscal-label"
                            id="fiscal"
                            fullWidth
                            defaultValue=""
                            required
                            value={fiscal}
                            onChange={(e) => setFiscal(e.target.value)}
                        >
                            <MenuItem value="Andrea Lopez">Andrea Lopez</MenuItem>
                            <MenuItem value="Jose Pablo">Jose Pablo</MenuItem>
                            <MenuItem value="Alejandro Perez">Alejandro Perez</MenuItem>
                            <MenuItem value="Alexander Perez">Alexander Perez</MenuItem>
                            <MenuItem value="Fatima Jimenez">Fatima Jimenez</MenuItem>
                        </Select>
                    </Box>
                    <TextField
                        fullWidth
                        id="fechaIngreso"
                        label="Fecha de Ingreso"
                        variant="outlined"
                        type="date"
                        margin="normal"
                        value={today}
                        disabled
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" variant="contained">Guardar</Button>
                </DialogActions>
            </form>
        </BootstrapDialog>
    );
}
