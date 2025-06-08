import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import expedientesData from '../../data/expedientes.json';
import Row from './Row'


export default function TablaExpediente() {
    const [expedientes, setExpedientes] = useState([]);

    useEffect(() => {
        // Simulacion a llamada a API para obtener los expedientes de la DB
        setExpedientes(expedientesData);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0px'}}>
            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3, width: '90%' }}>
            <Table aria-label="Expedientes" sx={{ minWidth: 700 }}>
                <TableHead sx={{ backgroundColor: '#292561' }}>
                <TableRow>
                    <TableCell />
                    <TableCell sx={{ color: 'white' }}>ID</TableCell>
                    <TableCell sx={{ color: 'white' }}>Título</TableCell>
                    <TableCell sx={{ color: 'white' }}>Tipo</TableCell>
                    <TableCell sx={{ color: 'white' }}>Fiscal Remitente</TableCell>
                    <TableCell sx={{ color: 'white' }}>Fecha de Recepción</TableCell>
                    <TableCell sx={{ color: 'white' }}>Estado</TableCell>
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
    );
}
