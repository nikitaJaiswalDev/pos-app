import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import { Box, Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, fetchShop, selectAllEmployeeList } from 'store/reducers/employees';
import { chipSx } from 'pages/employee/style';


// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'order',
    align: 'left',
    disablePadding: false,
    label: 'Order Id'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'product',
    align: 'left',
    disablePadding: false,
    label: 'Product'
  },
  {
    id: 'total',
    align: 'right',
    disablePadding: false,
    label: 'Total Amount'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Paid';
      break;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { employeeSlice } = useSelector(selectAllEmployeeList);

    useEffect(() => {
        dispatch(fetchAllOrders({ limit: 5, skip: 0}));
        dispatch(fetchShop());
    }, [dispatch]);
    

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead />
          <TableBody>
            {
              employeeSlice?.orders.data?.orders?.map(row => (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    tabIndex={-1}
                    key={row._id}
                    onClick={() => navigate('/orders')}
                  >
                    <TableCell component="th" scope="row" align="left">{row.order}</TableCell>
                    <TableCell align="left">
                      <OrderStatus status={1} />
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={1} sx={{ display: 'flow'}}>
                        {
                          row.product?.map(item => (
                            <Chip key={item.code} label={item.code}  sx={chipSx}/>
                          ))
                        }
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <NumberFormat value={row.paid_amount} displayType="text" thousandSeparator prefix= { employeeSlice.shop[0]?.currency } />
                    </TableCell>
                  </TableRow>
                )
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
