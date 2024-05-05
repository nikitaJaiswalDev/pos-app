import MainCard from 'components/MainCard'
import React, { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProductTable from './ProductTable';
import { fetchAllProductList, selectAllEmployeeList } from 'store/reducers/employees';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const ListProduct = () => {  

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { employeeSlice } = useSelector(selectAllEmployeeList);
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
    });

    useEffect(() => {
        dispatch(fetchAllProductList({ limit: pagination.pageSize, skip: pagination.pageIndex * pagination.pageSize}));
    }, [dispatch, pagination]);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginBottom: '30px' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="h3">Product List</Typography>
            <Box sx={{ background: '#908f8f', padding: '4px 8px', borderRadius: 2,}}>
                <Typography variant="h5">{employeeSlice.allProductList?.products?.length}</Typography>
            </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => navigate('/product/add-new')}>Add New Product</Button>
        </Box>
      </Box>

      <MainCard>
        <ProductTable data={employeeSlice.allProductList} dispatch={dispatch} navigate={navigate} pagination={pagination} setPagination={setPagination}/>
      </MainCard>
    </React.Fragment>
  )
}

export default ListProduct