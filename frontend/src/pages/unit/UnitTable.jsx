import React from 'react'
import { Box, IconButton } from '@mui/material';
import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import MaterialTable from '../../components/CustomTable/MaterialTable';
import { useDispatch } from 'react-redux';
import { toggleLoader } from 'store/reducers/loader';
import { capitalizedString } from 'utils/index';
import { openWarning } from 'store/reducers/warning';

const UnitTable = ({ data, set_unit, set_type, pagination, setPagination }) => {
    const dispatch = useDispatch()

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
                accessorKey: 'name',
                header: 'Unit',
                size: 150,
                Cell: ({ row }) => {
                    return (
                        <p>{ capitalizedString(row.original.name) }</p>
                    )
                },
            },
        ],
        [],
    )
      
    const table = useMaterialReactTable({
        columns,
        data: data?.units || [],
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
                <Edit onClick={() => {
                    set_unit({name: row.row.original.name, name_error: null})
                    set_type({type: 'update', id: row.row.original._id})
                }}/>
            </IconButton>
            <IconButton >
                <Delete onClick={() => {
                    dispatch(toggleLoader({loader: true}))
                    dispatch(openWarning({ warning_open: true, content: `You want to Delete "${row?.row?.original.name}" `, id: row?.row?.original?._id, delete_type: 'unit', skip: pagination.pageIndex, limit: pagination.pageSize }));
                }}/>
            </IconButton>
            </Box>
        ),
        
    })
  return (
    <MaterialTable table={table} title={'Brand Table'}/>
  )
}

export default UnitTable
