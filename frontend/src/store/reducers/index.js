// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import loader from './loader';
import toast from './toast';
import warning from './warning';
import employeeSlice from './employees'
import loginSlice from './loginSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, loader, toast, warning, employeeSlice, loginSlice });

export default reducers;
