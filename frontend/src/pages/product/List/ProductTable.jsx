import React, { useEffect } from 'react'
import { Box, IconButton } from '@mui/material';
import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import MaterialTable from '../../../components/CustomTable/MaterialTable';
import { capitalizedString, convertImage } from 'utils/index';
import { openWarning } from 'store/reducers/warning';
import { fetchShop, selectAllEmployeeList } from 'store/reducers/employees';
import { useSelector } from 'react-redux';

const ProductTable = ({ data, dispatch, navigate, pagination, setPagination }) => {
    const { employeeSlice } = useSelector(selectAllEmployeeList);

    useEffect(() => {
        dispatch(fetchShop());
    }, [dispatch]);

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
                id: 'image',
                header: 'Image',
                size: 150,
                Cell: ({ row }) => {
                    return (
                        <img src={convertImage(row.original.image.data)} alt="Uploaded" height={50} width={50} style={{ borderRadius: 10}}/>
                    )
                }
            },
            {
                accessorKey: 'sku',
                header: 'Product Code',
                size: 150,
            },
            {
                id: 'purchase_price',
                header: 'Purchase Price',
                size: 150,
                Cell: ({ row }) => {
                    return (
                        <p>{ row.original.purchase_price} {employeeSlice?.shop[0]?.currency}</p>
                    )
                }
            },
            {
                accessorKey: 'selling_price',
                header: 'Selling Price',
                size: 150,
                Cell: ({ row }) => {
                    return (
                        <p>{ row.original.selling_price} { employeeSlice?.shop[0]?.currency }</p>
                    )
                }
            },
            {
                accessorKey: 'qtn',
                header: 'Quantity',
                size: 150,
            },
            {
                id: 'supplier',
                header: 'Supplier Name',
                size: 100,
                Cell: ({ row }) => {
                    return (
                        <p>{ capitalizedString(row.original.supplierName)}</p>
                    )
                }
            },
        ],
        [],
    )
      
    const table = useMaterialReactTable({
        columns,
        data: data?.products || [],
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
        manualPagination: true,
        rowCount: data?.pagination?.total,
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
        renderRowActions: (row) => (
            <Box>
            <IconButton >
                <Edit onClick={() => navigate(`/product/edit/${row?.row?.original?._id}`)}/>
            </IconButton>
            <IconButton >
                <Delete onClick={() => {
                    dispatch(openWarning({ warning_open: true, content: `You want to Delete "${row?.row?.original.name}" `, id: row?.row?.original?._id, delete_type: 'product', skip: pagination.pageIndex, limit: pagination.pageSize }));
                }}/>
            </IconButton>
            </Box>
        ),
        
    })
  return (
    <MaterialTable table={table} title={'Product Table'}/>
  )
}

export default ProductTable
