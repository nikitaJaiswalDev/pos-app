import MainCard from 'components/MainCard'
import React, { useRef, useState } from 'react'
import { Typography, Box, FormHelperText, Grid, OutlinedInput, InputLabel, Stack, Select, MenuItem, Button} from '@mui/material';
import { Formik } from 'formik';
import { Countries } from 'utils/countries_state'
import InputFile from 'components/CustomInput/InputFile';
import { shopFormValidationSchema } from 'utils/index';

const ShopSetup = () => {
  const [type, setType] = useState({type: 'add'})
  const formikRef = useRef();
  const [uploadedImage, setUploadedImage] = useState(null)
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
              mobile_no: '',
              address: '',
              country: 'IN',
              vat: '',
              profile_picture: ''
          }}
          
          validationSchema={type.type === 'add' && shopFormValidationSchema} 
          onSubmit={async (values, actions) => { 

          }}
          innerRef={formikRef}
        >
          {( { errors, touched, handleChange, handleSubmit, values, setValues }) => { 
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
                          <InputLabel>Shop Phone</InputLabel>
                          <OutlinedInput
                              type="number"
                              fullWidth
                              placeholder="Shop Phone"
                              name="mobile_no"
                              value={values.mobile_no}
                              onChange={handleChange}
                              error={Boolean(errors.mobile_no && touched.mobile_no)}
                          />
                          {errors.mobile_no && touched.mobile_no && (
                              <FormHelperText error>
                              {errors.mobile_no}
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

                  <Grid item xs={12}>
                      <Stack spacing={1}>
                          <InputLabel>Image </InputLabel>
                          <InputFile setFieldValue={setValues} setUploadedImage={setUploadedImage} color={errors.profile_picture ? 'red' : '#d0d0d0'}
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