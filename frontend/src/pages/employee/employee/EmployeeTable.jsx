import React, { useEffect } from 'react'
import { Box, IconButton } from '@mui/material';
import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import MaterialTable from 'components/CustomTable/MaterialTable';
import { useDispatch } from 'react-redux';
import { openWarning } from 'store/reducers/warning';
import { convertBufferIntoFile, convertImage } from 'utils/index';
import { toggleLoader } from 'store/reducers/loader';

const EmployeeTable = ({employee, setType, formikRef, setUploadedImage, pagination, setPagination}) => {
    const dispatch = useDispatch()

    const columns = React.useMemo(
        () => [
            {
                accessorFn: (row) => `${row.first_name} ${row.last_name}`,
                id: 'name',
                header: 'Employee Name',
                size: 250,
            },
            {
                accessorKey: 'phone_no',
                header: 'Phone',
                size: 250,
            },
            {
                accessorKey: 'email',
                enableClickToCopy: true,
                header: 'Email',
                size: 250,
            },
           
        ],
        [],
    )
      
    const table = useMaterialReactTable({
        columns,
        data: employee?.employees || [],
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
        rowCount: employee?.pagination?.total,
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
        renderRowActions: (row) => (
            <Box>
            <IconButton onClick={async() => {
                dispatch(toggleLoader({loader: true}))
                setType({ type: 'edit', id:  row?.row?.original._id})
                setUploadedImage(convertImage(row.row.original.image.data))
                formikRef.current.setValues((prevValues) => {
                    return {
                        ...prevValues,
                        employeeInfo: {
                            first_name: row?.row?.original?.first_name,
                            last_name: row?.row?.original?.last_name,
                            role_id: row?.row?.original?.role_id,
                            phone_no: row?.row?.original?.phone_no,
                            email: row?.row?.original?.email,
                            password: '',
                        },
                        profile_picture: convertBufferIntoFile(convertImage(row.row.original.image.data))
                    };
                });
                dispatch(toggleLoader({loader: false}))
            }}>
                <Edit />
            </IconButton>
            <IconButton onClick={async() => {
                dispatch(openWarning({ warning_open: true, content: `You want to Delete "${row?.row?.original.first_name} ${row?.row?.original.last_name}" `, id: row?.row?.original?._id, delete_type: 'employee', skip: pagination.pageIndex, limit: pagination.pageSize }));
            }}>
                <Delete />
            </IconButton>
            </Box>
        ),
        
    })
  return (
    <MaterialTable table={table} title={'Employee Table'}/>
  )
}

export default EmployeeTable
