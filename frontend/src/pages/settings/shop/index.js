import MainCard from 'components/MainCard'
import React, { useEffect, useRef, useState } from 'react'
import { Typography, Box, FormHelperText, Grid, OutlinedInput, InputLabel, Stack, Select, MenuItem, Button, InputAdornment} from '@mui/material';
import { Formik } from 'formik';
import { Countries } from 'utils/countries_state'
import InputFile from 'components/CustomInput/InputFile';
import { convertBufferIntoFile, convertImage, shopFormValidationSchema } from 'utils/index';
import { updateShop } from 'api/index';
import { useMutation } from '@tanstack/react-query'
import { toggleLoader } from 'store/reducers/loader';
import { openToast } from 'store/reducers/toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShop, selectAllEmployeeList } from 'store/reducers/employees';

const ShopSetup = () => {
  const formikRef = useRef();
  const [uploadedImage, setUploadedImage] = useState(null)
  const dispatch = useDispatch()
  const { employeeSlice } = useSelector(selectAllEmployeeList);

  useEffect(() => {
      dispatch(fetchShop());
  }, [dispatch]);
    
  useEffect(() => {
      if(employeeSlice.shop[0]) {
        setUploadedImage(convertImage(employeeSlice.shop[0]?.image?.data))
        formikRef.current.setValues((prevValues) => {
            return {
                ...prevValues,
                name: employeeSlice.shop[0]?.name,
                email: employeeSlice.shop[0]?.email,
                phone: employeeSlice.shop[0]?.phone,
                address: employeeSlice.shop[0]?.address,
                country: employeeSlice.shop[0]?.country,
                vat: employeeSlice.shop[0]?.vat,
                currency: employeeSlice.shop[0]?.currency,
                profile_picture: convertBufferIntoFile(convertImage(employeeSlice.shop[0]?.image?.data)),
            };
        });
    }
  }, [employeeSlice])

  // Add Shop
  const { mutateAsync: addShopData } = useMutation({
    mutationFn: (data) => updateShop(employeeSlice.shop[0]?._id,data),
    onSuccess: (response) => {
        if(response.status == 200) {
          dispatch(openToast({ toast_open: true, title: response.data.message, type:"success" }));
          dispatch(toggleLoader({loader: false}))
          dispatch(fetchShop());
        } else {
          dispatch(openToast({ toast_open: true, title: response.data.message, type:"error" }));
        }
      }
  })

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
        <Typography variant="h3">Shop Setup</Typography>
      </Box>

      <MainCard>
        <Formik 
          initialValues={{
              name: '',
              email: '',
              phone: '',
              address: '',
              country: 'IN',
              vat: '',
              profile_picture: '',
              currency: ''
          }}
          
          validationSchema={shopFormValidationSchema} 
          onSubmit={async (values) => {
            dispatch(toggleLoader({ loader: true}))
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('address', values.address);
            formData.append('country', values.country);
            formData.append('vat', values.vat);
            formData.append('image', values.profile_picture); 
            formData.append('currency', values.currency); 
           await addShopData(formData)
           dispatch(toggleLoader({ loader: false}))
          }}
          innerRef={formikRef}
        >
          {( { errors, touched, handleChange, handleSubmit, values, setFieldValue, setValues }) => { 
            formikRef.current = { setValues, values}
            return (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                  <Grid item xs={4}>
                      <Stack spacing={1}>
                          <InputLabel>Shop Name *</InputLabel>
                          <OutlinedInput
                              type="text"
                              fullWidth
                              placeholder="Shop name"
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
                  <Grid item xs={4}>
                      <Stack spacing={1}>
                          <InputLabel>Shop Email *</InputLabel>
                          <OutlinedInput
                              type="email"
                              fullWidth
                              placeholder="Shop Email"
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
                  <Grid item xs={4}>
                      <Stack spacing={1}>
                          <InputLabel>VAT Registration No.</InputLabel>
                          <OutlinedInput
                              type="text"
                              fullWidth
                              name="vat"
                              value={values.vat}
                              onChange={handleChange}
                              error={Boolean(errors.vat && touched.vat)}
                          />
                          {errors.vat && touched.vat && (
                              <FormHelperText error>
                              {errors.vat}
                              </FormHelperText>
                          )}
                      </Stack>
                  </Grid>

                  <Grid item xs={4}>
                      <Stack spacing={1}>
                          <InputLabel>Shop Address</InputLabel>
                          <OutlinedInput
                              type="text"
                              fullWidth
                              placeholder="Shop address"
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
                  <Grid item xs={4}>
                      <Stack spacing={1}>
                          <InputLabel>Country</InputLabel>
                          <Select
                              fullWidth
                              name="country"
                              value={values.country}
                              onChange={(event) => {
                                const selectedCountry = event.target.value;
                                    const selectedCountryData = Countries.find(country => country.iso2 === selectedCountry);
                                    if (selectedCountryData) {
                                        formikRef.current.setValues({
                                            ...formikRef.current.values,
                                            country: selectedCountry,
                                            currency: selectedCountryData.currency_symbol
                                        });
                                    }
                              }}
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
                  <Grid item xs={4}>
                      <Stack spacing={1}>
                          <InputLabel>Shop Phone</InputLabel>
                            <OutlinedInput
                                type="number"
                                fullWidth
                                placeholder="Shop Phone"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start">
                                    +{ 
                                        values.country !== '' && Countries.find(country => country.iso2 === values.country)?.phone_code
                                    }
                                </InputAdornment>}
                                error={Boolean(errors.phone && touched.phone)}
                            />
                            {errors.phone && touched.phone && (
                                <FormHelperText error>
                                {errors.phone}
                                </FormHelperText>
                            )}
                      </Stack>
                  </Grid>
                  

                  <Grid item xs={4}>
                      <Stack spacing={1}>
                          <InputLabel>Currency</InputLabel>
                          <OutlinedInput
                              type="text"
                              fullWidth
                              name="currency"
                            //   readOnly
                              value={values.currency}
                              error={Boolean(errors.currency && touched.currency)}
                          />
                          {errors.currency && touched.currency && (
                              <FormHelperText error>
                              {errors.currency}
                              </FormHelperText>
                          )}
                      </Stack>
                  </Grid>

                  <Grid item xs={12}>
                      <Stack spacing={1}>
                          <InputLabel>Image </InputLabel>
                          <InputFile 
                            setFieldValue={setFieldValue} setUploadedImage={setUploadedImage} color={errors.profile_picture ? 'red' : '#d0d0d0'}
                          />
                      </Stack>
                  </Grid>
                  { uploadedImage  &&
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                          <img src={uploadedImage} alt="Uploaded" height='auto' width={300} style={{ borderRadius: 20}}/>                
                      </Grid>
                  }
                </Grid>
                <br/> 
                <Button size="large" type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            )
          }}

        </Formik>
      </MainCard>
    </React.Fragment>
  )
}

export default ShopSetup