import React from 'react';
import CustomToast from 'components/CustomToast/CustomToast';
import CustomLoader from 'components/Loader/CustomLoader';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { openToast } from 'store/reducers/toast';
import { Box } from '@mui/material';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  const dispatch = useDispatch()
  const { toast_open, title, type } = useSelector((state) =>  state.toast)
  const { loader } = useSelector((state) => state.loader);
  return (
    <Box sx={{filter: loader ? 'blur(3px)' : 'none',}}>
      <Outlet />
      <CustomLoader open={loader}/>
      <CustomToast open={toast_open} handleClose={() => dispatch(openToast({toast_open: false, title: ''}))} title={title} type={type}/>
    </Box>
  )
};

export default MinimalLayout;
