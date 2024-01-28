import React from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {DeleteFilled} from '@ant-design/icons';

function createData(item, qty, price) {
    return { item, qty, price };
}

const rows = [
    createData('Marvel School bag', 1, 4500),
    createData('Water proof Travel Bag', 1, 1450),
    createData('Marvel School bag', 1, 4500),
    createData('Water proof Travel Bag', 1, 1450),
    createData('Water proof Travel Bag', 1, 1450),
    createData('Water proof Travel Bag', 1, 1450),
    createData('Water proof Travel Bag', 1, 1450),
    createData('Water proof Travel Bag', 1, 1450),
    createData('Water proof Travel Bag', 1, 1450),
    createData('Water proof Travel Bag', 1, 1450),
    createData('Water proof Travel Bag', 1, 1450),
];

const paperSx = {
    height: 200, overflow: 'auto',  "&::-webkit-scrollbar": {
        width: 5
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: '#cacad4'
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: '#cacad4',
        borderRadius: 2
    }
}
const CartTable = () => {
  return (
    <Paper sx={paperSx}
    >
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>ITEM</TableCell>
                <TableCell align="right">QTY</TableCell>
                <TableCell align="right">PRICE</TableCell>
                <TableCell align="right">DELETE</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.item}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">{row.item.length > 10 ? row.item.slice(0,10)+'...' : row.item}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.price} $</TableCell>
                <TableCell align="right"><DeleteFilled /></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Paper>
  )
}

export default CartTable