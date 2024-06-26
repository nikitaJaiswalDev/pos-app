import { useRef, useState, useEffect} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {  Box, ButtonBase, CardContent, ClickAwayListener, Grid, Paper, Popper, Stack, Typography, List, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import { LogoutOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, verifyToken } from 'store/reducers/loginSlice';
import { convertImage } from 'utils/index';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) =>  state.loginSlice);

  useEffect(() => {
    if (sessionStorage.getItem("reloaded") === null) {
      sessionStorage.setItem("reloaded", "true");
    } else {
      dispatch(verifyToken())
    }
  }, [dispatch]);

  const handleLogout = async () => {
   localStorage.removeItem('token')
   sessionStorage.removeItem('reloaded');
   dispatch(logout())
   navigate('/login')
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = 'grey.300';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          { user?.user && <img src={convertImage(user?.user?.picture?.data)}  style={{ width: 32, height: 32 }}/>}
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <img src={convertImage(user?.user?.picture?.data)}  style={{ width: 32, height: 32, border: '1px solid', borderRadius: 50 }}/>
                            <Stack>
                              <Typography variant="h6" style={{ textTransform: 'capitalize' }}>{user?.user?.first_name} {user?.user?.last_name}</Typography>
                              {/* <p>{JSON.stringify(user?.user?.picture)}</p> */}
                              <Typography variant="body2" color="textSecondary">
                                {user?.user?.role}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
                            <ListItemButton  onClick={handleLogout}>
                              <ListItemIcon>
                                <LogoutOutlined />
                              </ListItemIcon>
                              <ListItemText primary="Logout" />
                            </ListItemButton>
                          </List>
                        </Box>
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default HeaderContent;
