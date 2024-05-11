import React, { useEffect } from 'react'
import MaterialTable from 'components/CustomTable/MaterialTable'
import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import {  Box,
  IconButton,
  Stack,
  Chip
} from '@mui/material';
import SwitchButton from 'components/CustomButton/SwitchButton';

import { capitalizedString } from 'utils/index';
import { chipSx } from 'pages/employee/style';
import { openToast } from 'store/reducers/toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRolesList, selectAllEmployeeList } from 'store/reducers/employees';
import { openWarning } from 'store/reducers/warning';

const RoleTable = ({ setType, type, addRoleList, setWarning, formikRef}) => {
    
    const dispatch = useDispatch();
    const { employeeSlice } = useSelector(selectAllEmployeeList);
    
    useEffect(() => {
        dispatch(fetchAllRolesList());
    }, [dispatch]);

    const columns = React.useMemo(
      () => [
          {
              id: 'name',
              header: 'Employee Role List',
              size: 150,
              Cell: ({ row }) => (
                <p>{ capitalizedString(row.original.name) }</p>
              ),
          },
          {
              accessorKey: 'roles',
              header: 'Modules',
              size: 300,
              Cell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ display: 'flow'}}>
                  {
                    row.original?.roles_name?.map((item, index) => (
                      <Chip key={index} label={capitalizedString(item)}  sx={chipSx}/>
                    ))
                  }
                </Stack>
              )
          },
          {
              accessorKey: 'status',
              header: 'Status',
              size: 150,
              Cell: ({ row }) => {
                return (
                <SwitchButton
                  checked={row.original.status} 
                  onChange={async (e) => {
                    const values = { name: row.original?.name, roles: row.original?.roles, status: e.target.checked}
                    setType({...type, id: row.original._id})
                    const res = await addRoleList(values)
                    if(res) {
                      dispatch(openToast({toast_open: true, title: res.data.message, type:"success"}))
                      setType({...type, id: null})
                    }
                  }}
                />
              )}
          },
      ],
      [],
    )
    
    const table = useMaterialReactTable({
        columns,
        data: employeeSlice.allRolesList,
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
        state: {
          isLoading: employeeSlice?.isAllRolesPending
      },
        renderRowActions: ({row}) => (
            <Box>
              <IconButton onClick={() => {
                setTimeout(() => {
                  formikRef.current.setValues((prevValues) => {
                    const updatedRoles = prevValues.roles.map(role => {
                      if (row.original.roles.includes(role.role_id)) {
                        role.status = true;
                      }
                      return role;
                    });
                    return {
                      ...prevValues,
                      roles: updatedRoles,
                      name: row.original.name,
                      status: row.original.status
                    };
                  });
                }, 0);
                setType({ id: row.original._id, type:"edit"})
              }}>
                <Edit />
              </IconButton>
              <IconButton onClick={async() => {
                  dispatch(openWarning({ warning_open: true, content: `You want to Delete "${row.original.name}`, id: row?.original?._id, delete_type: 'rolelist' }));
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

export default RoleTable
