import MainCard from 'components/MainCard'
import React from 'react'
import { Typography, Box, Grid, InputLabel, OutlinedInput, Stack,
  FormHelperText,
  Button,
  Card,
  CardContent,
  CardHeader,
  Select,
  MenuItem,
  Divider,
  IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import { Formik} from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'components/@extended/AnimateButton';
import { CardSx, EmployeeIconWrapper } from './style';
import { useMaterialReactTable } from 'material-react-table';
import { Edit, Delete } from '@mui/icons-material';
import { data } from './data/employee_data';
import CustomTable from './CustomTable';

const generalInfo = {
  first_name: '',
  last_name: '',
  profile_picture: '',
  role: '',
  phone_no: ''
}
const accountInfo = {
  email: '',
  password: '',
  retype_password: ''
}

const formValidationSchema = Yup.object().shape({
  generalInfo: Yup.object().shape({
    first_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    profile_picture: Yup.mixed().required('Required'),
    role: Yup.string().required('Required'),
    phone_no: Yup.string().required('Required'),
  }),
  accountInfo: Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(3).max(8).required('Required'),
    retype_password: Yup.string().min(3).max(8).required('Required'),
  }),
});

const AddEmployee = () => {
  const [initialValues, setInitialValues] = React.useState({
    generalInfo: {...generalInfo },
    accountInfo: {...accountInfo}
  })
  console.log({ setInitialValues});

  const columns = React.useMemo(
    () => [
        {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
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
      data,
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
      initialState: {
          showGlobalFilter: true,
          visibleInShowHideMenu: false
      },
      paginationDisplayMode: 'pages',
      positionToolbarAlertBanner: 'bottom',
      muiSearchTextFieldProps: {
          size: 'small',
          variant: 'outlined',
      },
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

      <Box sx={EmployeeIconWrapper}>
        <AddCircleOutlineIcon sx={{height: 'unset'}}/>
        <Typography variant="h3">Add New Employee</Typography>
      </Box>

      <MainCard>
        {/* Employee form */}
        <Formik
            initialValues={initialValues}
            validationSchema={formValidationSchema}
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

                {/* General Info card */}
                <Card sx={CardSx}>
                  <CardHeader 
                    title="General Information"
                    avatar={
                      <PersonIcon/>
                    }
                  />
                  <Divider />
                  <CardContent>
                      <Grid container spacing={3}>
                        {/* First name */}
                        <Grid item xs={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="first_name">First Name</InputLabel>
                            <OutlinedInput
                              id="first_name"
                              type="text"
                              value={values.generalInfo.first_name}
                              name="first_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Ex: John"
                              fullWidth
                              error={Boolean(touched?.generalInfo?.first_name && errors?.generalInfo?.first_name)}
                            />
                            {touched?.generalInfo?.first_name && errors?.generalInfo?.first_name && (
                              <FormHelperText error id="standard-weight-helper-text-first-name">
                                {errors?.generalInfo?.first_name}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>

                        {/* Last name */}
                        <Grid item xs={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="first_name">Last Name</InputLabel>
                            <OutlinedInput
                              id="last_name"
                              type="text"
                              value={values.generalInfo.last_name}
                              name="last_name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Ex: Doe"
                              fullWidth
                              error={Boolean(touched?.generalInfo?.last_name && errors?.generalInfo?.last_name)}
                            />
                            {touched?.generalInfo?.last_name && errors?.generalInfo?.last_name && (
                              <FormHelperText error id="standard-weight-helper-text-last-name">
                                {errors?.generalInfo?.last_name}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>

                        {/* Profile Picture */}
                        <Grid item xs={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="profile_picture">Image</InputLabel>
                            <OutlinedInput
                              id="profile_picture"
                              type="file"
                              value={values.generalInfo.profile_picture}
                              name="profile_picture"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              fullWidth
                              error={Boolean(touched?.generalInfo?.profile_picture && errors?.generalInfo?.profile_picture)}
                            />
                            {touched?.generalInfo?.profile_picture && errors?.generalInfo?.profile_picture && (
                              <FormHelperText error id="standard-weight-helper-text-profile-pciture">
                                {errors?.generalInfo?.profile_picture}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>

                        {/* Role */}
                        <Grid item xs={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="role">Role</InputLabel>
                            <Select
                              id="role"
                              name="role"
                              fullWidth
                              value={values.generalInfo.role}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              displayEmpty
                              error={Boolean(touched?.generalInfo?.role && errors?.generalInfo?.role)}
                            >
                              <MenuItem value="">Select Role</MenuItem>
                              <MenuItem value={'10'}>Ten</MenuItem>
                              <MenuItem value={'20'}>Twenty</MenuItem>
                              <MenuItem value={'30'}>Thirty</MenuItem>
                            </Select>

                            {touched?.generalInfo?.role && errors?.generalInfo?.role && (
                              <FormHelperText error id="standard-weight-helper-text-role">
                                {errors?.generalInfo?.role}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>

                        {/* Phone Number */}
                        <Grid item xs={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="phone_no">Phone</InputLabel>
                            <OutlinedInput
                              id="phone_no"
                              type="text"
                              value={values.generalInfo.phone_no}
                              name="phone_no"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Ex: +8080121***"
                              fullWidth
                              error={Boolean(touched?.generalInfo?.phone_no && errors?.generalInfo?.phone_no)}
                            />
                            {touched?.generalInfo?.phone_no && errors?.generalInfo?.phone_no && (
                              <FormHelperText error id="standard-weight-helper-text-phone-no">
                                {errors?.generalInfo?.phone_no}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>

                        
                      </Grid>
                  </CardContent>
                </Card>

                {/* Account Info Card */}
                <Card sx={CardSx}>
                  <CardHeader 
                    title="Account Info"
                    avatar={
                      <PersonIcon/>
                    }
                  />
                  <Divider />
                  <CardContent>
                      <Grid container spacing={3}>
                        {/* First name */}
                        <Grid item xs={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                              id="email"
                              type="email"
                              value={values.accountInfo.email}
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Ex: ex@gmail.com"
                              fullWidth
                              error={Boolean(touched?.accountInfo?.email && errors?.accountInfo?.email)}
                            />
                            {touched?.accountInfo?.email && errors?.accountInfo?.email && (
                              <FormHelperText error id="standard-weight-helper-email">
                                {errors?.accountInfo?.email}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>

                        {/* Last name */}
                        <Grid item xs={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="first_name">Password</InputLabel>
                            <OutlinedInput
                              id="password"
                              type="password"
                              value={values.accountInfo.password}
                              name="password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Password Length 4+"
                              fullWidth
                              error={Boolean(touched?.accountInfo?.password && errors?.accountInfo?.password)}
                            />
                            {touched?.accountInfo?.password && errors?.accountInfo?.password && (
                              <FormHelperText error id="standard-weight-helper-text-password">
                                {errors?.accountInfo?.password}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>

                        {/* Confirm Password */}
                        <Grid item xs={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="retype_password">Confirm Password</InputLabel>
                            <OutlinedInput
                              id="retype_password"
                              type="password"
                              value={values.accountInfo.retype_password}
                              name="retype_password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Password Length 4+"
                              fullWidth
                              error={Boolean(touched?.accountInfo?.retype_password && errors?.accountInfo?.retype_password)}
                            />
                            {touched?.accountInfo?.retype_password && errors?.accountInfo?.retype_password && (
                              <FormHelperText error id="standard-weight-helper-text-retype-password">
                                {errors?.accountInfo?.retype_password}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>

                      </Grid>
                  </CardContent>
                </Card>

                {/* Button */}
                <AnimateButton>
                  <Button 
                    sx={{ marginTop: '20px'}} 
                    disableElevation 
                    disabled={isSubmitting} 
                    size="large" 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                  >
                    submit
                  </Button>
                </AnimateButton>
              </form>
            )}
        </Formik>

        {/* Employee Table */}
        <br/><br/>
        <CustomTable table={table} title={'Employee Table'}/>

      </MainCard>
    </React.Fragment>
  )
}

export default AddEmployee