import React from 'react'
import {MaterialReactTable } from 'material-react-table';
import { Typography } from '@mui/material';

const CustomTable = ({ table, title }) => {
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>{title}</Typography>
            <MaterialReactTable table={table}/>
        </React.Fragment>
    )
}

export default CustomTable