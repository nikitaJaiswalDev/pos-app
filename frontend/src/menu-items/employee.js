// assets
import GroupIcon from '@mui/icons-material/Group';
// icons
const icons = {
  GroupIcon
};

// ==============================|| MENU ITEMS - EMPLOYEES ||============================== //

const employee = {
  id: 'employeesection',
  title: 'employee section',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: 'Employee',
      type: 'collapse',
      icon: icons.GroupIcon,
      children: [
        {
          id: 'employee-role',
          title: 'Employee Role',
          url: '/create-role',
          target: false,
        },
        {
          id: 'add-employee',
          title: 'Add Employee',
          url: '/add-employee',
          target: false,
        },
      ]
    },
  ]
};

export default employee;
