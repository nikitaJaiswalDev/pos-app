import MainCard from 'components/MainCard'
import React, { useState, useRef} from 'react'
import CustomTable from './CustomTable';

import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import {  Box,
  FormHelperText,
  IconButton,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Button,
  Typography,
  Checkbox,
  Chip
} from '@mui/material';
import { Formik } from 'formik';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import SwitchButton from 'components/CustomButton/SwitchButton';
import { addRole, deleteRole, editRole, getAllRolesList, getAllRolesNames, getOneRole } from 'api/index';
import SuccessToast from 'components/CustomToast/SuccessToast';
import { chipSx } from './style';
import { capitalizedString, roleFormSchema } from 'utils/index';
import CustomLoader from 'components/Loader/CustomLoader';
import WarningModal from 'components/CustomModal/Warning';

const AddRole = () => {

  const queryClient = useQueryClient()
  const formikRef = useRef();

  // states
  const [showToast, setShowToast] = useState({
    open: false,
    title: ''
  })
  const [type, setType] = useState({type: 'add', id: null})
  const [warning, setWarning] = useState({
    open: false, content: '', id: null
  })

  // fetch role names
  const { data: roleNames, isLoading: isRoleNameLoading } = useQuery({
    queryKey: ['roleNames'],
    queryFn: () => getAllRolesNames(),
    select: (data) => {
      console.log({ roleNames });
      const filtered = data?.data.filter(item => item.active).map(item => ({role_id: item._id, name: item.name, status: false}))
      formikRef.current.setValues({
        name: '',
        status: true,
        roles: filtered
      });
    }
  });

  // fetch role list
  const { data: allRolesList, isPending: isAllRolesPending } = useQuery({
    queryKey: ['rolesList'],
    queryFn: () => getAllRolesList()
  })

  // delete role list
  const { mutateAsync: deletedRoleList, isIdle: isDeleteIdle, isSuccess: isDeleteSuccess } = useMutation({
    mutationFn: (id) => deleteRole(id),
    onSuccess: (response) => {
      setShowToast({...showToast, open: true, title: response.message})
      setWarning({open: false, id: null, content: ''})
      queryClient.invalidateQueries('rolesList')
    }
  })

  // get one role list
  const { mutateAsync: editRoleList, isIdle: isEditIdle, isSuccess: isEditSuccess} = useMutation({
    mutationFn: (id) => getOneRole(id),
    onSuccess: (response) => {
      setType({ type: 'edit', id: response?.data?._id})
      formikRef.current.setValues({
        name: response?.data?.name,
        status: response?.data?.status,
        roles: response?.data?.roles
      });
    }
  })

   // add role list item
  const { mutateAsync: addRoleList, isIdle: isAddIdle, isSuccess: isAddSuccess } = useMutation({
    mutationFn: (data) => !type.id ? addRole(data): editRole(type.id,data),
    onSuccess: () => {
      queryClient.invalidateQueries('rolesList')
      setType({ type: 'add', id: null})
      setWarning({open: false, id: null, content: ''})
      formikRef.current.setValues((prevValues) => {
        const updatedRoles = prevValues.roles.map(role => {
          return {...role, status: false}
        });
        return {
          ...prevValues,
          roles: updatedRoles,
          name: ''
        };
      });
    }
  })


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
              console.log({ row: row.original});
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
            <IconButton onClick={async() => {
              await editRoleList(row.original._id)
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
    <React.Fragment>

      {/* Roles section */}
      <CustomLoader open={isRoleNameLoading || 
        isAllRolesPending || 
        !isEditIdle && !isEditSuccess || 
        !isDeleteIdle && !isDeleteSuccess ||
        !isAddIdle && !isAddSuccess
      }/>

        <WarningModal
          open={warning.open} 
          handleClose={() => setWarning({open: false, content: ''})}
          handleYes={async() => await deletedRoleList(warning.id)}
          title={"Are you sure?"}
          contentText={warning.content}
        />
      
      <MainCard>
        <Formik
          initialValues={{
            name: '',
            status: true,
            roles: []
          }}
          validationSchema={roleFormSchema}
          onSubmit={async (values, 
            { setSubmitting, setTouched }
            ) => {
            console.log({ values });
            try {
              setTouched({name: false})
              const response = await addRoleList(values)
              if(response) {
                setShowToast({open: true, title: response.message})
              }
              setSubmitting(false);
            } catch (err) {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values, setValues }) => {
            formikRef.current = { setValues }; 
            return (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="role-name">Role name</InputLabel>
                      <OutlinedInput
                        id="role-name"
                        type="text"
                        value={values.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Add role name"
                        fullWidth
                        error={Boolean(errors.name && touched.name)}
                      />
                      {errors.name && touched.name && (
                        <FormHelperText error>
                          {errors.name}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  
                  <Grid item xs={2} >
                    <Typography variant="h5">Module Permission :</Typography>
                  </Grid>

                </Grid>

                <br/>
                <Grid item xs={12} sx={{ marginTop: '-15px'}}>
                  {errors.roles && touched.roles && (
                    <FormHelperText error>
                      {errors.roles}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid container xs={12}>
                  {
                    isRoleNameLoading ? <div>Loading...</div>
                    :
                      values.roles.map(item => (
                      <Grid item xs={3} sx={{ marginTop: '-5px'}} key={item.id}>
                        <Checkbox size="small"
                          checked={item.status}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            formikRef.current.setValues((prevValues) => {
                              console.log({ prevValues, item });
                              const updatedRoles = prevValues.roles.map(role =>
                                role.role_id === item.role_id ? { ...role, status: checked } : role
                              );
                              return {
                                ...prevValues,
                                roles: updatedRoles
                              };
                            });
                        }}
                        />{ capitalizedString(item.name) }
                      </Grid>
                    ))
                  }

                  <Grid item xs={12} sx={{ marginTop: '20px'}}>
                      <Button size="large" type="submit" variant="contained" color="primary">
                        {type.type == 'add' ? 'Submit': 'Update'}
                      </Button>
                  </Grid>

                </Grid>
              </form>
            )
          }}
        </Formik>
      </MainCard>

      <br/>
      {/* Role Table */}
      <MainCard>
        {!isAllRolesPending &&
          <CustomTable table={table} title={'Role Table'}/>
        }
      </MainCard>
      {
        showToast &&
        <SuccessToast open={showToast.open} handleClose={() => setShowToast({...showToast, open: false})} title={showToast.title}/>

      }
    </React.Fragment>
  )
}

export default AddRole