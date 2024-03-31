import React from 'react';
import ErrorToast from 'components/CustomToast/ErrorToast';
import CustomLoader from 'components/Loader/CustomLoader';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { openToast } from 'store/reducers/toast';
import { Box } from '@mui/material';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  const dispatch = useDispatch()
  const { toast_open, title } = useSelector((state) =>  state.toast)
  const { loader } = useSelector((state) => state.loader);
  return (
    <Box sx={{filter: loader ? 'blur(3px)' : 'none',}}>
      <Outlet />
      <CustomLoader open={loader}/>
      <ErrorToast open={toast_open} handleClose={() => dispatch(openToast({toast_open: false, title: ''}))} title={title}/>
    </Box>
  )
};

export default MinimalLayout;
