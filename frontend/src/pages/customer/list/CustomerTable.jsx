import React from 'react'
import { Box, IconButton } from '@mui/material';
import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import MaterialTable from '../../../components/CustomTable/MaterialTable';
import { capitalizedString, convertImage } from 'utils/index';
import { openWarning } from 'store/reducers/warning';

const CustomerTable = ({ data, dispatch, navigate }) => {
    const columns = React.useMemo(
        () => [
            {
                id: 'name',
                header: 'Name',
                size: 150,
                Cell: ({ row }) => {
                    return (
                        <p>{ capitalizedString(row.original.name)}</p>
                    )
                }
            },
            {
                accessorKey: 'mobile_no',
                header: 'Mobile No',
                size: 150,
            }
        ],
        [],
    )
      
    const table = useMaterialReactTable({
        columns,
        data: data,
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
                <Edit onClick={() => navigate(`/edit-customer/${row?.row?.original?._id}`)}/>
            </IconButton>
            <IconButton >
                <Delete onClick={() => {
                    dispatch(openWarning({ warning_open: true, content: `You want to Delete "${row?.row?.original.name}" `, id: row?.row?.original?._id, delete_type: 'customer' }));
                }}/>
            </IconButton>
            </Box>
        ),
        
    })
  return (
    <MaterialTable table={table} title={'Product Table'}/>
  )
}

export default CustomerTable
