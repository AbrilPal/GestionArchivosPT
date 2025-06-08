import { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

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

export default function ModalIngreso({ open, handleClose, expedienteInicial, onGuardar }) {
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [fiscal, setFiscal] = useState('');
    const [today, setToday] = useState('');
    const [estado, setEstado] = useState('');

    useEffect(() => {
        setToday(fechaHoy());
    }, []);

    useEffect(() => {
        if (expedienteInicial) {
            setTitulo(expedienteInicial.titulo || '');
            setTipo(expedienteInicial.Tipo || '');
            setFiscal(expedienteInicial.fiscalRemitente || '');
            setToday(expedienteInicial.fechaRecepcion || '')
            setEstado(expedienteInicial.estado || '')
        } else {
            setTitulo('');
            setTipo('');
            setFiscal('');
            setEstado('')
            setToday(fechaHoy());
        }
    }, [expedienteInicial, open]);

    const fechaHoy = () => {
        const fechaActual = new Date();
        const yyyy = fechaActual.getFullYear();
        const mm = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const dd = String(fechaActual.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevoExpediente = {
            id: expedienteInicial?.id || Date.now().toString(),
            titulo,
            Tipo: tipo,
            fiscalRemitente: fiscal,
            fechaRecepcion: expedienteInicial?.fechaRecepcion || today,
            estado: estado || 'Ingreso',
            solicitante: expedienteInicial?.solicitante || [],
        };

        if (typeof onGuardar === 'function') {
            onGuardar(nuevoExpediente);
        } else {
            console.error('onGuardar no es una función');
        }

        handleClose();
    };

    return (
        <BootstrapDialog onClose={handleClose} open={open} maxWidth={false}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                {expedienteInicial ? 'Editar Expediente' : 'Ingresar Expediente'}
            </DialogTitle>

            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>

            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <TextField
                        fullWidth
                        label="Título"
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        disabled={expedienteInicial} 
                    />
                    <Box mt={2}>
                        <InputLabel id="tipo-label">Tipo</InputLabel>
                        <Select
                            labelId="tipo-label"
                            fullWidth
                            required
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            disabled={expedienteInicial} 
                        >
                            <MenuItem value="fisico">Físico</MenuItem>
                            <MenuItem value="digital">Digital</MenuItem>
                        </Select>
                    </Box>
                    <Box mt={2}>
                        <InputLabel id="fiscal-label">Fiscal Remitente</InputLabel>
                        <Select
                            labelId="fiscal-label"
                            fullWidth
                            required
                            value={fiscal}
                            onChange={(e) => setFiscal(e.target.value)}
                            disabled={expedienteInicial} 
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
                        label="Fecha de Ingreso"
                        variant="outlined"
                        type="date"
                        margin="normal"
                        value={today}
                        disabled
                    />
                    {expedienteInicial ? 
                    <>
                    <Box mt={2}>
                        <InputLabel id="estado-label">Estado</InputLabel>
                        <Select
                            labelId="estado-label"
                            fullWidth
                            required
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <MenuItem value="Ingreso">Ingreso</MenuItem>
                            <MenuItem value="En prestamo">En prestamo</MenuItem>
                            <MenuItem value="Egreso">Egreso</MenuItem>
                        </Select>
                    </Box>
                    </>:<></>}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" variant="contained">
                        {expedienteInicial ? 'Actualizar' : 'Guardar'}
                    </Button>
                </DialogActions>
            </form>
        </BootstrapDialog>
    );
}
