// assets
import { ShoppingOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  ShoppingOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EMPLOYEES ||============================== //

const employee = {
  id: 'possection',
  title: 'employee section',
  type: 'group',
  children: [
    {
      id: 'employee_role',
      title: 'Employee Role',
      type: 'item',
      url: '/create-role',
      icon: icons.ShoppingOutlined,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'add_employee',
      title: 'Add Employee',
      type: 'item',
      url: '/add-employee',
      icon: icons.ProfileOutlined,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default employee;
