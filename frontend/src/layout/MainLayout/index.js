import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
// types
import { openDrawer } from 'store/reducers/menu';
import CustomLoader from 'components/Loader/CustomLoader';
import { openToast } from 'store/reducers/toast';
import WarningModal from 'components/CustomModal/Warning';
import { openWarning } from 'store/reducers/warning';
import { toggleLoader } from 'store/reducers/loader';
import CustomToast from 'components/CustomToast/CustomToast';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.menu);
  const { loader } = useSelector((state) => state.loader);
  const { toast_open, title, type } = useSelector((state) =>  state.toast)
  const { warning_open, content } = useSelector((state) =>  state.warning)

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));
  }, [matchDownLG, dispatch]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
  }, [drawerOpen]);

  return (
    <React.Fragment>
    <Box sx={{ display: 'flex', width: '100%', filter: loader ? 'blur(3px)' : 'none', }} >
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
    <CustomLoader open={loader}/>
    <CustomToast open={toast_open} handleClose={() => dispatch(openToast({toast_open: false, title: ''}))} title={title} type={type}/>
    <WarningModal 
      open={warning_open} 
      handleClose={() => {
        dispatch(openWarning({ warning_open: false, content: '', id: null}))
        dispatch(toggleLoader({loader: false}))
      }}
      title="Are you sure?" 
      contentText={content} />
    </React.Fragment>
  );
};

export default MainLayout;
