import React from 'react'
import { Box, IconButton } from '@mui/material';
import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import MaterialTable from './MaterialTable';


const EmployeeTable = ({employeeSlice, setType, setWarning, getUserPicture, formikRef}) => {
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
        data: !employeeSlice?.isAllEmployeePending ? employeeSlice?.allEmployeesList : [],
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
            <IconButton onClick={async() => {
                setType({ type: 'edit', id:  row?.row?.original._id})
                if(row?.row?.original?.profile_picture_id !== '') {
                    await getUserPicture(row?.row?.original?.profile_picture_id)
                }
                formikRef.current.setValues((prevValues) => {
                    return {
                        ...prevValues,
                        employeeInfo: {
                        first_name: row?.row?.original?.first_name,
                        last_name: row?.row?.original?.last_name,
                        profile_picture_id: row?.row?.original?.profile_picture_id,
                        role_id: row?.row?.original?.role_id,
                        phone_no: row?.row?.original?.phone_no,
                        email: row?.row?.original?.email,
                        password: '',
                        },
                    };
                });
            }}>
                <Edit />
            </IconButton>
            <IconButton onClick={async() => {
                setWarning({open: true, content: `You want to Delete "${row?.row?.original.first_name} ${row?.row?.original.last_name}" `, id: row?.row?.original})
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
