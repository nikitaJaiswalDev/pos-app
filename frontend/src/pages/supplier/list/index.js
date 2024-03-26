import React, { useEffect } from 'react'
import { Box, IconButton,  } from '@mui/material';
import MaterialTable from 'components/CustomTable/MaterialTable';
import { capitalizedString } from 'utils/index';
import { useMaterialReactTable } from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSuppliers, selectAllEmployeeList } from 'store/reducers/employees';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import { openWarning } from 'store/reducers/warning';

const ListSupplier = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeeSlice } = useSelector(selectAllEmployeeList);

  useEffect(() => {
    dispatch(fetchAllSuppliers());
  }, [dispatch]);


  const columns = React.useMemo(
      () => [
          {
              id: 'index',
              header: '#',
              size: 100,
              Cell: ({ row }) => {
                  return (
                      <p>{  row.index + 1 }</p>
                  )
              }
          },
          {
              id: 'name',
              header: 'Name',
              size: 150,
              Cell: ({ row }) => {
                  return (
                      <p>{ capitalizedString(row.original.name) }</p>
                  )
              },
          },
          {
            accessorKey: 'email',
            header: 'Email',
            size: 150,
          },
          {
            accessorKey: 'mobile_no',
            header: 'Phone No',
            size: 150,
          },
          {
            id: 'address',
            header: 'Address',
            size: 150,
            Cell: ({ row }) => {
              return (
                  <p>{`${row.original.address}, ${row.original.country}, ${row.original.zip_code}`}</p>
              )
            },
          },
      ],
      [],
  )
  
  const table = useMaterialReactTable({
      columns,
      data: employeeSlice.allSuppliers,
      enableRowActions: true,
      enableDensityToggle: false,
      enableFullScreenToggle: false,
      enableSorting: false,
      enableColumnActions: false,
      enableStickyHeader: true,
      enableHiding: false,
      positionGlobalFilter: 'left',
      enableFilterMatchHighlighting: true,
      positionActionsColumn: 'last',
      enableGlobalFilter: true,
      enableFilters: true,
      paginationDisplayMode: 'pages',
      positionToolbarAlertBanner: 'bottom',
      muiPaginationProps: {
          color: 'secondary',
          rowsPerPageOptions: [10, 20, 30],
          shape: 'rounded',
          variant: 'outlined',
      },
      renderRowActions: (row) => (
          <Box>
          <IconButton >
              <Edit onClick={() => navigate(`/supplier/edit/${row?.row?.original?._id}`)}/>
          </IconButton>
          <IconButton >
              <Delete onClick={() => {
                dispatch(openWarning({ warning_open: true, content: `You want to Delete "${row?.row?.original.name}" `, id: row?.row?.original?._id, delete_type: 'supplier' }));
              }}/>
          </IconButton>
          </Box>
      ),
      
  })

  return (
    <MaterialTable table={table} title={'Supplier List'}/>
  )
}

export default ListSupplier