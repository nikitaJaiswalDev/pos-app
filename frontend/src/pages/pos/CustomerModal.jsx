import React from 'react'
import {Dialog, DialogActions, DialogContent, FormHelperText, Slide, DialogTitle, Grid, TextField, Stack, InputLabel, OutlinedInput} from '@mui/material';
import CustomButton from 'components/CustomButton/index';
import { Formik } from 'formik';
import SubmitButton from 'components/CustomButton/SubmitButton';
import { toggleLoader } from 'store/reducers/loader';
import { addCustomer } from 'api/index';
import { openToast } from 'store/reducers/toast';
import { fetchAllCustomer } from 'store/reducers/employees';
import { useMutation } from '@tanstack/react-query'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const CustomerModal = ({ open, handleClose, dispatch}) => {

    // ----------------------- API Calls-------------------------
  // Add Employee
  const { mutateAsync: addCustomerData } = useMutation({
    mutationFn: (data) => addCustomer(data),
    onSuccess: (response) => {
      if(response.status == 200) {
        handleClose()
        dispatch(openToast({ toast_open: true, title: response.data.message }));
        // dispatch(fetchAllCustomer());
        // dispatch(toggleLoader({loader: false}))
      } else {
        dispatch(openToast({ toast_open: true, title: response.data.message }));
      }
    }
  })

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add new customer"}</DialogTitle>
        <DialogContent>
            <Formik 
                initialValues={{ name: '',  mobile_no: '',  email: '',  state: '',  city: '',  zip_code: '',  address: '' }} 
                onSubmit={async (values, actions) => {
                    dispatch(toggleLoader({ loader: true }));
                    await addCustomerData(values)
                    actions.resetForm()
                }}
            >{( { errors, handleChange, handleSubmit, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Name *</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="Customer name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={Boolean(errors.name)}
                                />
                                {errors?.name && (
                                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                                        {errors?.name}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Mobile No *</InputLabel>
                                <OutlinedInput
                                    type="number"
                                    fullWidth
                                    placeholder="Mobile No"
                                    name="mobile_no"
                                    value={values.mobile_no}
                                    onChange={handleChange}
                                    error={Boolean(errors.mobile_no)}
                                />
                                {errors?.mobile_no && (
                                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                                        {errors?.mobile_no}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>

                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Email</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="abc@example.com"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={Boolean(errors.email)}
                                />
                                {errors?.email && (
                                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                                        {errors?.email}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>State</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="State"
                                    name="state"
                                    value={values.state}
                                    onChange={handleChange}
                                    error={Boolean(errors.state)}
                                />
                                {errors?.state && (
                                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                                        {errors?.state}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>

                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>City</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="city"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    error={Boolean(errors.city)}
                                />
                                {errors?.city && (
                                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                                        {errors?.city}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Zip Code</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="zip_code"
                                    name="zip_code"
                                    value={values.zip_code}
                                    onChange={handleChange}
                                    error={Boolean(errors.zip_code)}
                                />
                                {errors?.zip_code && (
                                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                                        {errors?.zip_code}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>

                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel>Address</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="address"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    error={Boolean(errors.address)}
                                />
                                {errors?.address && (
                                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                                        {errors?.address}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                    <br/>
                    <SubmitButton type={"add"} text={"Customer"} />
                </form>
            )}
            </Formik>

                <br/>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default CustomerModal