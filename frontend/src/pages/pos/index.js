import React, { useEffect, useState } from 'react'
import { Box, Toolbar,Grid } from '@mui/material';
import BillingSection from './BillingSection';
import ProductSection from './ProductSection';
import { fetchAllCategories, fetchAllCustomer, fetchAllProductList, fetchShop, selectAllEmployeeList } from 'store/reducers/employees';
import { useDispatch, useSelector } from 'react-redux';

const Pos = () => {

  const dispatch = useDispatch();
  const { employeeSlice } = useSelector(selectAllEmployeeList);
  const [filter, setFilter] = useState({ category: null, text: null})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(fetchAllCategories({ limit: null, skip: null}));
    dispatch(fetchAllCustomer({ limit: null, skip: null}));
    dispatch(fetchShop());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllProductList({ limit: pagination.pageSize, skip: pagination.pageIndex * pagination.pageSize}));
  }, [dispatch, pagination]);
    
  useEffect(() => {
      dispatch(fetchAllProductList({ limit: pagination.pageSize, skip: pagination.pageIndex * pagination.pageSize, filter: filter}));
  }, [filter])
  
  
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>

      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>

          {/* Product Section */}
          <Grid item xs={12} md={7} lg={8}>
            <ProductSection data={employeeSlice.allProductList} categories={employeeSlice.allCategories} setFilter={setFilter} filter={filter} dispatch={dispatch} pagination={pagination} setPagination={setPagination} currency={ employeeSlice.shop[0]?.currency }/>
          </Grid>

          {/* Billing Section */}
          <Grid item xs={12} md={5} lg={4}>
            <BillingSection customer={employeeSlice.allCustomerList?.customer || []} dispatch={dispatch} currency={ employeeSlice.shop[0]?.currency }/>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Pos