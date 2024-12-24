import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project import
import Logo from './Logo';
import config from 'config';
import { activeItem } from 'store/reducers/menu';
import { fetchShop, fetchShopLogo, selectAllEmployeeList } from 'store/reducers/employees';
import { useEffect } from 'react';
import { convertImage } from 'utils/index';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  const { defaultId } = useSelector((state) => state.menu);
  const { employeeSlice } = useSelector(selectAllEmployeeList);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(fetchShop());
    }
  }, [dispatch]);

  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? config.defaultPath : to}
      sx={sx}
    >
      { 
      employeeSlice.shop[0]?.image ? 
      <img src={convertImage(employeeSlice?.shop[0]?.image.data)} width={100} height={80}/>
      :
      <Logo />
      }
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
