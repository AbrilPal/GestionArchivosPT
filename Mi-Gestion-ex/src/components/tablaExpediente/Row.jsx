import React, { useEffect, useState } from 'react';
import {
    IconButton,
    TableCell,
    TableRow,
    Button,
    Tooltip
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
            <TableCell align="center">{row.id}</TableCell>
            <TableCell align="center">{row.titulo}</TableCell>
            <TableCell align="center">{row.Tipo}</TableCell>
            <TableCell align="center">{row.fiscalRemitente}</TableCell>
            <TableCell align="center">{row.fechaRecepcion}</TableCell>
            <TableCell align="center">
                {['En prestamo', 'Egreso'].includes(row.estado) ? (
                    <Tooltip
                    title={
                        row.estado === 'En prestamo'
                        ? 'Este expediente está prestado a ' + row.solicitante.fiscal + ' con fecha de entrega el ' + row.solicitante.fechaEntrega
                        : 'Este expediente fue egresado por ' + row.solicitante.fiscal + ' con fecha de entrega el ' + row.solicitante.fechaEntrega
                    }
                    arrow
                    >
                    <div
                        className={
                        row.estado === 'En prestamo'
                            ? 'estado-prestamo'
                            : 'estado-egreso'
                        }
                    >
                        {row.estado}
                    </div>
                    </Tooltip>
                ) : (
                    <div className={row.estado === 'Ingreso' ? 'estado-ingresado' : ''}>
                    {row.estado}
                    </div>
                )}
            </TableCell>
            <TableCell align="center">
                <Button>Editar</Button>
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