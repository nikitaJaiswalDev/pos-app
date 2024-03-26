import React from 'react'
import { Box, IconButton } from '@mui/material';
import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import MaterialTable from '../../../components/CustomTable/MaterialTable';


const ProductTable = () => {
    const columns = React.useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 150,
            },
            {
                accessorKey: 'image',
                header: 'Image',
                size: 150,
            },
            {
                accessorKey: 'supplier',
                header: 'Supplier Name',
                size: 150,
            },
            {
                accessorKey: 'product_code',
                header: 'Product Code',
                size: 150,
            },
            {
                accessorKey: 'purchase_price',
                header: 'Purchase Price',
                size: 150,
            },
            {
                accessorKey: 'selling_price',
                header: 'Selling Price',
                size: 150,
            },
            {
                accessorKey: 'quantity',
                header: 'Quantity',
                size: 150,
            },
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
    <MaterialTable table={table} title={'Product Table'}/>
  )
}

export default ProductTable
