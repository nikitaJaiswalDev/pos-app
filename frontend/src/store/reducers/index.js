// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import roleSlice from './roleSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, roleSlice});

export default reducers;
