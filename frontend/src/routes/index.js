import { useRoutes } from 'react-router-dom';

// project import
import MinimalRoutes from './MinimalRoutes';
import MainRoutes from './MainRoutes';
import ProtectedRoute from './ProtectedRoute';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, MinimalRoutes]);
}
