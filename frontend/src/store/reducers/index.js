// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import loader from './loader';
import toast from './toast';
import warning from './warning';
import employeeSlice from './employees'
import loginSlice from './loginSlice';
import cart from './cartItems';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, loader, toast, warning, employeeSlice, loginSlice, cart });

export default reducers;
