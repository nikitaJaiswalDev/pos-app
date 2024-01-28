import { useRoutes } from 'react-router-dom';

// project import
import MinimalRoutes from './MinimalRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, MinimalRoutes]);
}
