import React from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton} from '@mui/material';
import {DeleteFilled} from '@ant-design/icons';
import { removeCartItem, updateQtn} from 'store/reducers/cartItems';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const paperSx = {
    overflow: 'auto',  "&::-webkit-scrollbar": {
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
const CartTable = ({ data, dispatch, currency }) => {
  return (
    <Paper sx={paperSx} >
        <TableContainer component={Paper} sx={{ height: data.length > 3 ? 240 : 'auto' }}>
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
            {data.map((row) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">{row.name.length > 10 ? row.name.slice(0,10)+'...' : row.name}</TableCell>
                    <TableCell align="right">
                        <IconButton color="secondary" size="medium" onClick={() => dispatch(updateQtn({id: row._id, operation: 'plus'}))}>
                            <AddIcon fontSize="inherit" />
                        </IconButton>
                            {row.qtn}
                        <IconButton color="secondary" size="medium" onClick={() => dispatch(updateQtn({id: row._id, operation: 'minus'}))}>
                            <RemoveIcon fontSize="inherit" />
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">{row.price.toFixed(2)} {currency}</TableCell>
                    <TableCell align="right"><DeleteFilled onClick={() => dispatch(removeCartItem({item: row}))} /></TableCell>
                    </TableRow>
                )
            )}
            </TableBody>
        </Table>
        </TableContainer>
    </Paper>
  )
}

export default CartTable