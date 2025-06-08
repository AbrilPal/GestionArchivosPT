import React, { useEffect, useState } from 'react';
import {
    Box,
    Collapse,
    TableCell,
    Typography,
} from '@mui/material';
import historial from '../../data/historial.json';

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
        <>
            <TableCell style={{ padding: 0}} colSpan={8}>
                <Collapse in={estado} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 2, maxHeight: '100px', overflowY: 'scroll', overflow:'auto' }}>
                        <Typography variant="h6" gutterBottom component="div">
                            Historial:
                        </Typography>
                        {historialE.map((item) => {
                            return (
                                <p key={item.id}>{item.estado} del {item.expediente}</p>
                            )
                        })}
                    </Box>
                </Collapse>
            </TableCell>
        </>
    );
}
