import React, { useEffect, useState } from 'react';
import {
    Box,
    Collapse,
    TableCell,
    Typography,
} from '@mui/material';
import historial from '../../data/historial.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// Componente fila expandible
export default function HistorialRow({ id, estado }) {
    const [historialE, setHistorialE] = useState([]);

    useEffect(() => {
        setHistorialE([]);
        if (estado) {
            const filtrado = historial.filter((h) => {
                return h.expediente === id;
            });
            setHistorialE(filtrado);
        }

        return () => {
            setHistorialE([]);
        };
    }, [id, estado]);

    return (
        <TableCell style={{ padding: 0 }} colSpan={8}>
            <Collapse in={estado} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 2, maxHeight: '400px', overflowY: 'scroll', overflow: 'auto' }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Historial:
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Fiscal</TableCell>
                                    <TableCell>Fecha Entrega</TableCell>
                                    <TableCell>Motivo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {historialE.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.estado}</TableCell>
                                        <TableCell>{row.fecha}</TableCell>
                                        {row.solicitante ? (
                                            row.solicitante.map((solicitud, index) => (
                                                <React.Fragment key={index}>
                                                    <TableCell>{solicitud.fiscal}</TableCell>
                                                    <TableCell>{solicitud.fechaEntrega}</TableCell>
                                                    <TableCell>{solicitud.motivo}</TableCell>
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <>
                                                <TableCell />
                                                <TableCell />
                                                <TableCell />
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Collapse>
        </TableCell>
    );
}
