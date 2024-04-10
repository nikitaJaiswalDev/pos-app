import MainCard from 'components/MainCard'
import React, { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { fetchAllCustomer, selectAllEmployeeList } from 'store/reducers/employees';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import CustomerTable from './CustomerTable';

const ListCustomer = () => {  

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { employeeSlice } = useSelector(selectAllEmployeeList);

    useEffect(() => {
        dispatch(fetchAllCustomer());
    }, [dispatch]);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginBottom: '30px' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="h3">Product List</Typography>
            <Box sx={{ background: '#908f8f', padding: '4px 8px', borderRadius: 2,}}>
                <Typography variant="h5">{employeeSlice.allCustomerList.length}</Typography>
            </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => navigate('/add-customer')}>Add New Customer</Button>
        </Box>
      </Box>

      <MainCard>
        <CustomerTable data={employeeSlice.allCustomerList} dispatch={dispatch} navigate={navigate}/>
      </MainCard>
    </React.Fragment>
  )
}

export default ListCustomer