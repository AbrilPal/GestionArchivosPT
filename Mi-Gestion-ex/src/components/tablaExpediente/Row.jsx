import React, { useEffect, useState } from 'react';
import {
    IconButton,
    TableCell,
    TableRow,
    Button,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import HistorialRow from './HistorialRow'

// Componente fila expandible
export default function Row({ row }) {
    const [open, setOpen] = useState(false);

    return (
        <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            </TableCell>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.titulo}</TableCell>
            <TableCell>{row.Tipo}</TableCell>
            <TableCell>{row.fiscalRemitente}</TableCell>
            <TableCell>{row.fechaRecepcion}</TableCell>
            <TableCell>{row.estado}</TableCell>
            <TableCell>
                <Button>Holi</Button>
            </TableCell>
        </TableRow>
        <TableRow>
            {open && (
                <HistorialRow key={row.id} id={row.id} estado={open} />
            )}
        </TableRow>
        </>
    );
}