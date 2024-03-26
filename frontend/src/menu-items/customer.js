// assets
import GroupIcon from '@mui/icons-material/Group';

// icons
const icons = {
  GroupIcon
};

// ==============================|| MENU ITEMS - CUSTOMER ||============================== //

const customer = {
  id: 'customersection',
  title: 'customer section',
  type: 'group',
  children: [
    {
      id: 'customer',
      title: 'Customer',
      type: 'collapse',
      icon: icons.GroupIcon,
      children: [
        {
          id: 'add-customer',
          title: 'Add Customer',
          url: '/add-customer',
          target: false,
        },
        {
          id: 'customer-list',
          title: 'Customer List',
          url: '/customer-list',
          target: false,
        },
      ]
    },
  ]
};

export default customer;
