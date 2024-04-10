import MainCard from 'components/MainCard'
import React, { useEffect, useRef, useState } from 'react'
import { Typography, Box, InputLabel, Grid, Stack, FormHelperText, OutlinedInput, Select, MenuItem, InputAdornment } from '@mui/material';
import { supplierFormValidationSchema } from 'utils/index';
import SubmitButton from 'components/CustomButton/SubmitButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Formik } from 'formik';
import { Countries } from 'utils/countries_state'
import { addSupplier, getSupplierById, updateSupplier } from 'api/index';
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { toggleLoader } from 'store/reducers/loader';
import { openToast } from 'store/reducers/toast';

const AddSupplier = () => {
    let { supplierId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [type, setType] = useState({type: 'add'})
    const formikRef = useRef();

    useEffect(() => {
        if(supplierId) {
            setType({ type: 'update'})
        }
    }, [supplierId])

    // Add Suuplier
    const { mutateAsync: addSupplierData } = useMutation({
        mutationFn: (data) => !supplierId ? addSupplier(data): updateSupplier(supplierId,data),
    })
    // fetch spcific supplier
    useQuery({
        queryKey: ['supplier', supplierId],
        queryFn: () => getSupplierById(supplierId),
        select: (data) => {
            if(supplierId) {
                formikRef.current.setValues((prevValues) => {
                    return {
                        ...prevValues,
                        name: data?.data?.name,
                        email: data?.data?.email,
                        country: data?.data?.country,
                        mobile_no: data?.data?.mobile_no,
                        state: data?.data?.state,
                        city: data?.data?.city,
                        zip_code: data?.data?.zip_code,
                        address: data?.data?.address,
                    };
                });
            }
        },
        enabled: !!supplierId
    });

    return (
        <React.Fragment>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <AddCircleOutlineIcon />
                <Typography variant="h3">Add New Supplier</Typography>
            </Box>

            <Formik 
                initialValues={{
                    name: '',
                    mobile_no: '',
                    email: '',
                    country: 'IN',
                    state: '',
                    city: '',
                    zip_code: '',
                    address: '',
                }}
                validationSchema={type.type === 'add' && supplierFormValidationSchema} 
                onSubmit={async (values, actions) => {
                    dispatch(toggleLoader({ loader: true }));
                    try {
                        const res = await addSupplierData(values);
                        if (res.status === 200) {
                            dispatch(openToast({ toast_open: true, title: res.data.message, type:"success" }));
                            actions.resetForm();
                            if (supplierId) {
                                setTimeout(() => {
                                    navigate(`/supplier/list`);
                                }, 500);
                            }
                        } else {
                            dispatch(openToast({ toast_open: true, title: res.data.message, type:"error" }));
                        }
                    } catch (error) {
                        dispatch(openToast({ toast_open: true, title: error, type:"error"}));
                    } finally {
                        dispatch(toggleLoader({ loader: false }));
                    }
                }}
                
                innerRef={formikRef}>
                {( { errors, touched, handleChange, handleSubmit, values, setValues }) => {
                    formikRef.current = { setValues };
                    return (
                        <form noValidate onSubmit={handleSubmit}>
                            <MainCard>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <InputLabel>Supplier Name *</InputLabel>
                                            <OutlinedInput
                                                type="text"
                                                fullWidth
                                                placeholder="Supplier name"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                error={Boolean(errors.name && touched.name)}
                                            />
                                            {errors.name && touched.name && (
                                                <FormHelperText error>
                                                {errors.name}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <InputLabel>Email *</InputLabel>
                                            <OutlinedInput
                                                type="email"
                                                fullWidth
                                                placeholder="Ex: ex@example.com"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                error={Boolean(errors.email && touched.email)}
                                            />
                                            {errors.email && touched.email && (
                                                <FormHelperText error>
                                                {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <InputLabel>Country *</InputLabel>
                                            <Select
                                                fullWidth
                                                name="country"
                                                value={values.country}
                                                onChange={handleChange}
                                                error={Boolean(errors.country && touched.country)}
                                            >
                                                { Countries.map(item => (
                                                    <MenuItem key={item.iso2} value={item.iso2}>{item.name}</MenuItem>
                                                ))}
                                            </Select>
                                            {errors.country && touched.country && (
                                                <FormHelperText error>
                                                {errors.country}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <InputLabel>Mobile no *</InputLabel>
                                            <OutlinedInput
                                                type="number"
                                                fullWidth
                                                placeholder="Mobile no"
                                                name="mobile_no"
                                                value={values.mobile_no}
                                                onChange={handleChange}
                                                startAdornment={<InputAdornment position="start">
                                                    +{ 
                                                        values.country !== '' && Countries.find(country => country.iso2 === values.country)?.phone_code
                                                    }
                                                </InputAdornment>}
                                                error={Boolean(errors.mobile_no && touched.mobile_no)}
                                            />
                                            {errors.mobile_no && touched.mobile_no && (
                                                <FormHelperText error>
                                                {errors.mobile_no}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <InputLabel>State *</InputLabel>
                                            <Select
                                                fullWidth
                                                name="state"
                                                value={values.state}
                                                onChange={handleChange}
                                                error={Boolean(errors.state && touched.state)}
                                                displayEmpty
                                            >
                                                <MenuItem value=''>----State----</MenuItem>
                                                {
                                                    values.country !== '' && Countries.find(country => country.iso2 === values.country)?.states.map(state => (
                                                        <MenuItem key={state.state_code} value={state.state_code}>{state.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            {errors.state && touched.state && (
                                                <FormHelperText error>
                                                {errors.state}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <InputLabel>City</InputLabel>
                                            <OutlinedInput
                                                type="text"
                                                fullWidth
                                                placeholder="City"
                                                name="city"
                                                value={values.city}
                                                onChange={handleChange}
                                                error={Boolean(errors.city && touched.city)}
                                            />
                                            {errors.city && touched.city && (
                                                <FormHelperText error>
                                                {errors.city}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <InputLabel>Zip code *</InputLabel>
                                            <OutlinedInput
                                                type="text"
                                                fullWidth
                                                placeholder="Zip Code"
                                                name="zip_code"
                                                value={values.zip_code}
                                                onChange={handleChange}
                                                error={Boolean(errors.zip_code && touched.zip_code)}
                                            />
                                            {errors.zip_code && touched.zip_code && (
                                                <FormHelperText error>
                                                {errors.zip_code}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Stack spacing={1}>
                                            <InputLabel>Address *</InputLabel>
                                            <OutlinedInput
                                                type="text"
                                                fullWidth
                                                placeholder="Address"
                                                name="address"
                                                value={values.address}
                                                onChange={handleChange}
                                                error={Boolean(errors.address && touched.address)}
                                            />
                                            {errors.address && touched.address && (
                                                <FormHelperText error>
                                                {errors.address}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                </Grid>
        
                                <br/>
                                <SubmitButton type={type.type} text={"Supplier"} />
                            </MainCard>
                        </form>
                    )}
                }
            </Formik>
        </React.Fragment>
    )
}

export default AddSupplier