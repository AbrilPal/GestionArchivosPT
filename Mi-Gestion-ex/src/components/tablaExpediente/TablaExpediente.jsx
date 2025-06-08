import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';
import expedientesData from '../../data/expedientes.json';
import Row from './Row'
import ModalIngreso from '../Ingreso/ModalIngreso';

export default function TablaExpediente() {
    const [expedientes, setExpedientes] = useState([]);
    const [openModal, setOpenModal] = useState(false); 

    useEffect(() => {
        // Simulacion a llamada a API para obtener los expedientes de la DB
        setExpedientes(expedientesData);
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div style={{padding: '20px'}}>
            <Button 
                style={{marginBottom: '20px'}} 
                variant="contained" 
                color="secondary" 
                onClick={handleOpenModal} 
            >
                Ingresar Expediente
            </Button>
            <ModalIngreso open={openModal} handleClose={handleCloseModal} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3, width: '100%' }}>
                <Table aria-label="Expedientes" sx={{ minWidth: 700 }}>
                    <TableHead sx={{ backgroundColor: '#292561' }}>
                    <TableRow>
                        <TableCell />
                        <TableCell align="center" sx={{ color: 'white' }}>ID</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Título</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Tipo</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Fiscal Remitente</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Fecha de Recepción</TableCell>
                        <TableCell align="center" sx={{ color: 'white' }}>Estado</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {expedientes.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
        </div>
    );
}
