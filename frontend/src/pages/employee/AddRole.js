import MainCard from 'components/MainCard'
import React from 'react'
import CustomTable from './CustomTable';

import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import { data } from './data/role_data';
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
import * as Yup from 'yup';

import SwitchButton from 'components/CustomButton/SwitchButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { rolesname } from './data/roles_name';

const AddRole = () => {

  const columns = React.useMemo(
    () => [
        {
            accessorKey: 'role_name',
            header: 'Employee Role List',
            size: 250,
        },
        {
            accessorKey: 'modules',
            header: 'Modules',
            size: 250,
            Cell: ({ row }) => (
              <Stack direction="row" spacing={1}>
                {
                  row.original.modules.map((item, index) => (
                      <Chip key={index} label={item} sx={{borderRadius: '20px', backgroundColor: '#bac2e8'}}/>
                  ))
                }
              </Stack>
            )
        },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 250,
            Cell: ({ row }) => (
              <SwitchButton checked={row.original.status}/>
            )
        },
       
    ],
    [],
  )

  const table = useMaterialReactTable({
      columns,
      data,
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
      renderRowActions: () => (
          <Box>
            <IconButton onClick={() => console.info('Edit')}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => console.info('Delete')}>
              <Delete />
            </IconButton>
          </Box>
      ),
      
  })

  return (
    <React.Fragment>

      {/* Roles section */}
      <MainCard>
        <Formik
            initialValues={{
              roleName: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              roleName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                setStatus({ success: false });
                setSubmitting(false);
              } catch (err) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="role-name">Role name</InputLabel>
                      <OutlinedInput
                        id="role-name"
                        type="text"
                        value={values.roleName}
                        name="roleName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Add role name"
                        fullWidth
                        error={Boolean(touched.roleName && errors.roleName)}
                      />
                      {touched.roleName && errors.roleName && (
                        <FormHelperText error id="standard-weight-helper-text-role-name">
                          {errors.roleName}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  
                  <Grid item xs={2}>
                    <Typography variant="h5">Module Permission :</Typography>
                  </Grid>
                  <Grid item xs={2} sx={{ marginTop: '-5px'}}>
                    <Checkbox defaultChecked size="small"/>Select All
                  </Grid>

                </Grid>

                <br/>
                <Grid container sx={12}>

                  { rolesname.map((item, index)=> (
                    <Grid item xs={3} sx={{ marginTop: '-5px'}} key={index}>
                      <Checkbox defaultChecked size="small"/>{item.title}
                    </Grid>
                  ))}

                  <Grid item xs={12} sx={{ marginTop: '20px'}}>
                    <AnimateButton>
                      <Button disableElevation disabled={isSubmitting} size="large" type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </AnimateButton>
                  </Grid>

                </Grid>
              </form>
            )}
          </Formik>
      </MainCard>

      <br/>
      {/* Role Table */}
      <MainCard>
          <CustomTable table={table} title={'Role Table'}/>
      </MainCard>
    </React.Fragment>
  )
}

export default AddRole