import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { forwardRef, useEffect } from 'react';
// project import
import { activeItem } from 'store/reducers/menu';
import { Link, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, Typography, List } from '@mui/material';

export default function CollapseNavItem({ item, level }) {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const theme = useTheme();
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const { drawerOpen, openItem } = useSelector((state) => state.menu);

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.children[0].url} target={itemTarget} />) };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.children[0].url, target: itemTarget };
    }

    const itemHandler = (id) => {
        dispatch(activeItem({ openItem: [id] }));
    };

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

    const isSelected = openItem.includes(item.id);

    useEffect(() => {
        if (item.children.some(child => pathname.includes(child.url))) {
            dispatch(activeItem({ openItem: [item.id] }));
            setOpen(true);
        }
    }, [pathname]);


  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <>
      <ListItemButton 
        onClick={handleClick} 
        sx={{
            zIndex: 1201,
            pl: drawerOpen ? `${level * 28}px` : 1.5,
            py: !drawerOpen && level === 1 ? 1.25 : 1,
            ...(drawerOpen && {
              '&:hover': {
                bgcolor: 'primary.lighter'
              },
              '&.Mui-selected': {
                bgcolor: 'primary.lighter',
                borderRight: `2px solid ${theme.palette.primary.main}`,
                color: iconSelectedColor,
                '&:hover': {
                  color: iconSelectedColor,
                  bgcolor: 'primary.lighter'
                }
              }
            }),
            ...(!drawerOpen && {
              '&:hover': {
                bgcolor: 'transparent'
              },
              '&.Mui-selected': {
                '&:hover': {
                  bgcolor: 'transparent'
                },
                bgcolor: 'transparent'
              }
            })
        }}
      >
        <ListItemIcon>
          { itemIcon}
        </ListItemIcon>
        <ListItemText primary={
            <Typography variant="h6">
                {item.title}
            </Typography>
        } />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            item?.children?.map(( child, index) => (
                <ListItemButton
                    disabled={item.disabled}
                    sx={{ pl: 6 }}
                    key={index}
                    component={forwardRef((props, ref) => (
                        <Link 
                            ref={ref} 
                            {...props} 
                            to={child.url} 
                            target={child.target ? "_blank" : "_self"} 
                        />
                    ))}
                    onClick={() => dispatch(activeItem({ openItem: [child.id] }))}
                    selected={pathname.includes(child.url)}
                >
                    <ListItemIcon>
                        <FiberManualRecordIcon style={{ fontSize: '10px'}} />
                    </ListItemIcon>
                    <ListItemText
                    primary={ 
                        <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                            {child.title}
                        </Typography>
                     } />
                </ListItemButton>
            ))
          }
        </List>
      </Collapse>
    </>
  );
}