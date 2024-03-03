// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import roleSlice from './roleSlice';
import employeeSlice from './employees'

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, roleSlice,employeeSlice });

export default reducers;
