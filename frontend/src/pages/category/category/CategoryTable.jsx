import React, { useState } from 'react'
import { Box, IconButton } from '@mui/material';
import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import MaterialTable from '../../../components/CustomTable/MaterialTable';
import { capitalizedString } from 'utils/index';
import { useDispatch } from 'react-redux';
import { openWarning } from 'store/reducers/warning';

const CategoryTable = ({ data, set_category, set_type, pagination, setPagination }) => {
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
                id: 'name',
                header: 'Name',
                size: 150,
                Cell: ({ row }) => {
                    return (
                        <p>{ capitalizedString(row.original.name) }</p>
                    )
                },
            }
        ],
        [],
    )
      
    const table = useMaterialReactTable({
        columns,
        data: data?.allCategories?.data?.categories || [],
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
        rowCount: data?.data?.pagination?.total,
        onPaginationChange: setPagination,
        state: {
            pagination,
            isLoading: data?.isCategoryPending
        },
        renderRowActions: (row) => (
            <Box>
            <IconButton >
                <Edit onClick={() => {
                    set_category({name: row.row.original.name, name_error: null})
                    set_type({type: 'update', id: row.row.original._id})
                }}/>
            </IconButton>
            <IconButton >
                <Delete onClick={() => {
                    dispatch(openWarning({ warning_open: true, content: `You want to Delete "${row?.row?.original.name}" `, id: row?.row?.original?._id, delete_type: 'category', skip: pagination.pageIndex, limit: pagination.pageSize }));
                }}/>
            </IconButton>
            </Box>
        ),
        
    })
  return (
    <MaterialTable table={table} title={'Category Table'}/>
  )
}

export default CategoryTable
