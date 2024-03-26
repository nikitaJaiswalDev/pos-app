import dashboard from './dashboard';
import pos from './pos';
import product from './product';
import employee from './employee';
import customer from './customer';
import supplier from './supplier';
import settings from './settings';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getMenus } from 'store/reducers/loginSlice';
// import { allRoleList, getMenus } from 'store/reducers/menuSlice';

// ==============================|| MENU ITEMS ||============================== //

const allMenuItems = {
  items: [dashboard, pos, product, employee, customer, supplier, settings]
};
const UseMenuItems = () => {
  const [filteredMenuItems, setFilteredMenuItems] = useState({ items: [] });
  const menus = useSelector((state) =>  state.loginSlice);
  const dispatch = useDispatch()

  const filterMenuItems = (roles) => {
    return allMenuItems.items.filter(item => roles.includes(item.title));
  };

  useEffect(() => {
    if (sessionStorage.getItem("reloaded") === null) {
      sessionStorage.setItem("reloaded", "true");
    } else {
      dispatch(getMenus());
      if (menus.menus && menus.menus.length > 0) {
        setFilteredMenuItems({ items: filterMenuItems(menus.menus) });
      }
    }
  }, [menus.menus.length > 0]);

  return filteredMenuItems;

};

export default UseMenuItems;