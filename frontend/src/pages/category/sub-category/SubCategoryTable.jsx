import React from 'react'
import { Box, IconButton } from '@mui/material';
import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import MaterialTable from '../../../components/CustomTable/MaterialTable';


const SubCategoryTable = () => {
    const columns = React.useMemo(
        () => [
            {
                accessorKey: 'index',
                header: '#',
                size: 100,
            },
            {
                accessorKey: 'main_category',
                header: 'Main Category',
                size: 150,
            },
            {
                accessorKey: 'sub_category',
                header: 'Sub Category',
                size: 150,
            }
        ],
        [],
    )
      
    const table = useMaterialReactTable({
        columns,
        data: [],
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
                <Edit />
            </IconButton>
            <IconButton >
                <Delete />
            </IconButton>
            </Box>
        ),
        
    })
  return (
    <MaterialTable table={table} title={'Sub Category Table'}/>
  )
}

export default SubCategoryTable
