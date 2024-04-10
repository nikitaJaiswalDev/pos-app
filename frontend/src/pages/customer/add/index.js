import MainCard from 'components/MainCard'
import React, { useEffect, useRef, useState } from 'react'
import { Typography, Box, InputLabel, Grid, Stack, FormHelperText, OutlinedInput,TextField } from '@mui/material';
import SubmitButton from 'components/CustomButton/SubmitButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Formik } from 'formik';
import { addCustomer, getCustomerById, updateCustomer } from 'api/index';
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { toggleLoader } from 'store/reducers/loader';
import { openToast } from 'store/reducers/toast';

const AddCustomer = () => {
    let { customerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [type, setType] = useState({type: 'add'})
    const formikRef = useRef();

    useEffect(() => {
        if(customerId) {
            setType({ type: 'update'})
        }
    }, [customerId]) 

    // Add customer
    const { mutateAsync: addCustomerData } = useMutation({
        mutationFn: (data) => !customerId ? addCustomer(data): updateCustomer(customerId,data),
    })
    // fetch spcific supplier
    useQuery({
        queryKey: ['supplier', customerId],
        queryFn: () => getCustomerById(customerId),
        select: (data) => {
            if(customerId) {
                formikRef.current.setValues((prevValues) => {
                    return {
                        ...prevValues,
                        name: data?.data?.name,
                        mobile_no: data?.data?.mobile_no,
                        email: data?.data?.email,
                        state: data?.data?.state,
                        city: data?.data?.city,
                        zip_code: data?.data?.zip_code,
                        address: data?.data?.address,
                    };
                });
            }
        },
        enabled: !!customerId
    });

    return (
        <React.Fragment>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <AddCircleOutlineIcon />
                <Typography variant="h3">Add New Customer</Typography>
            </Box>

            <Formik 
                initialValues={{ name: '',  mobile_no: '',  email: '',  state: '',  city: '',  zip_code: '',  address: '' }} 
                onSubmit={async (values, actions) => {
                    dispatch(toggleLoader({ loader: true }));
                    try {
                        const res = await addCustomerData(values);
                        if (res.status === 200) {
                            dispatch(openToast({ toast_open: true, title: res.data.message, type:"success" }));
                            if (customerId) {
                                navigate(`/customer-list`);
                            }
                        } else {
                            dispatch(openToast({ toast_open: true, title: res.data.message, type:"error" }));
                        }
                    } catch (error) {
                        dispatch(openToast({ toast_open: true, title: error, type:"error" }));
                    } finally {
                        dispatch(toggleLoader({ loader: false }));
                        actions.resetForm()
                    }
                }}
                innerRef={formikRef}
            >{( { errors, handleChange, handleSubmit, values, setValues }) => {
                formikRef.current = { setValues }
                return (
                    <form noValidate onSubmit={handleSubmit}>
                        <MainCard >
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
                        </MainCard>
                        <br/>
                        <SubmitButton type={type.type} text={"Customer"} />
                    </form>
                )
            }}
            </Formik>
        </React.Fragment>
    )
}

export default AddCustomer