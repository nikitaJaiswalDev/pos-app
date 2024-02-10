import MainCard from 'components/MainCard'
import React from 'react'
import CustomTable from './CustomTable';

import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import { data } from './data/role_data';
import {  Box,
  IconButton
} from '@mui/material';
import SwitchButton from 'components/CustomButton/SwitchButton';
const AddRole = () => {

  const columns = React.useMemo(
    () => [
        {
            accessorKey: 'role_name',
            header: 'Employee Role List',
            size: 250,
        },
        {
            accessorKey: 'modules',
            header: 'Modules',
            size: 250,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 250,
            Cell: ({ row }) => (
              <SwitchButton checked={row.original.status}/>
            )
        },
       
    ],
    [],
  )

  const table = useMaterialReactTable({
      columns,
      data,
      enableRowActions: true,
      enableDensityToggle: false,
      enableFullScreenToggle: false,
      enableSorting: false,
      enableColumnActions: false,
      enableStickyHeader: true,
      enableHiding: false,
      enableGlobalFilter: false,
      enableFilters: false,
      positionActionsColumn: 'last',
      paginationDisplayMode: 'pages',
      muiPaginationProps: {
          color: 'secondary',
          rowsPerPageOptions: [10, 20, 30],
          shape: 'rounded',
          variant: 'outlined',
      },
      renderRowActions: () => (
          <Box>
            <IconButton onClick={() => console.info('Edit')}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => console.info('Delete')}>
              <Delete />
            </IconButton>
          </Box>
      ),
      
  })

  return (
    <React.Fragment>

      <MainCard>
          <CustomTable table={table} title={'Role Table'}/>
      </MainCard>
    </React.Fragment>
  )
}

export default AddRole