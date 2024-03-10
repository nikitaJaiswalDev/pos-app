import React from 'react'
import MaterialTable from './MaterialTable'
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

const RoleTable = ({allRolesList, setType, type, addRoleList, setShowToast, setWarning, formikRef}) => {

    const columns = React.useMemo(
      () => [
          {
              accessorKey: 'name',
              header: 'Employee Role List',
              size: 150,
          },
          {
              accessorKey: 'roles',
              header: 'Modules',
              size: 300,
              Cell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ display: 'flow'}}>
                  {
                    row.original?.roles?.filter(item => item.status).map((item, index) => (
                      <Chip key={index} label={capitalizedString(item.name)}  sx={chipSx}/>
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
                      setShowToast({open: true, title: res.message})
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
          data: allRolesList ?  allRolesList : [],
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
          renderRowActions: ({row}) => (
              <Box>
                <IconButton onClick={() => {
                   setTimeout(() => {
                    formikRef.current.setValues({
                      name: row.original.name,
                      status: row.original.status,
                      roles: row.original.roles
                    });
                  }, 0);
                  setType({ id: row.original._id, type:"edit"})
                }}>
                  <Edit />
                </IconButton>
                <IconButton onClick={async() => {
                  setWarning({open: true, content: `You want to Delete "${row.original.name}" `, id: row.original._id})
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
