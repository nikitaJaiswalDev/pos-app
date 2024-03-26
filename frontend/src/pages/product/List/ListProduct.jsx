import MainCard from 'components/MainCard'
import React from 'react'
import { Box, Typography, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProductTable from './ProductTable';

const ListProduct = () => {  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginBottom: '30px' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="h3">Product List</Typography>
            <Box sx={{ background: '#908f8f', padding: '4px 8px', borderRadius: 2,}}>
                <Typography variant="h5">37</Typography>
            </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained"   startIcon={<AddCircleOutlineIcon />}>Add New Product</Button>
        </Box>
      </Box>

      <MainCard>
            <ProductTable />
      </MainCard>
    </React.Fragment>
  )
}

export default ListProduct