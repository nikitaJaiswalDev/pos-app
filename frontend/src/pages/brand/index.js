import MainCard from 'components/MainCard'
import React, { useEffect, useState } from 'react'
import { Typography, Box, Grid, Stack, InputLabel, TextField, FormHelperText } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SubmitButton from 'components/CustomButton/SubmitButton';
import InputFile from 'components/CustomInput/InputFile';
import BrandTable from './BrandTable';
import { useDispatch, useSelector } from 'react-redux';
import { addBrand, updateBrand } from 'api/index';
import { toggleLoader } from 'store/reducers/loader';
import { useMutation } from '@tanstack/react-query'
import { fetchAllBrand, selectAllEmployeeList } from 'store/reducers/employees';
import { openToast } from 'store/reducers/toast';

const Brand = () => {

  const dispatch = useDispatch();
  const { employeeSlice } = useSelector(selectAllEmployeeList);

  const [type, set_type] = useState({type: 'add', id: null})
  const [brand, set_brand] = useState({ name: null, name_error: null, image: null, image_error: null })
  const [image, set_image] = useState()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(fetchAllBrand({ limit: pagination.pageSize, skip: pagination.pageIndex * pagination.pageSize}));
  }, [dispatch, pagination]);

  // Add Employee
  const { mutateAsync: addBrandData } = useMutation({
    mutationFn: (data) => !type.id ? addBrand(data): updateBrand(type.id,data),
  })

  const handleBrandSubmit = async (event) => {
    event.preventDefault()
    if (!brand.name) {
      set_brand({...brand, name_error: 'Required'});
      return;
    }
    if (!brand.image) {
      set_brand({...brand, image_error: 'Required'});
      return;
    }
    const formData = new FormData();
    formData.append('image', brand.image);
    formData.append('name', brand.name);
    try {
      dispatch(toggleLoader({ loader: true }));
      const response = await addBrandData(formData);
      if (response.status === 200) {
        dispatch(openToast({ open: true, title: response.data.message, type:"success"}))
        set_brand({ name: '', name_error: null, image: null, image_error: null})
        set_image(null)
        set_type({ type: 'add', id: null})
        dispatch(fetchAllBrand({ limit: pagination.pageSize, skip: pagination.pageIndex * pagination.pageSize}));
      }
    } catch (error) {
      console.error("Error adding brand data:", error);
    } finally {
      dispatch(toggleLoader({ loader: false }));
    }
  }


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
        <AddCircleOutlineIcon />
        <Typography variant="h3">Add New Brand</Typography>
      </Box>

      <MainCard>
          <form method='POST' onSubmit={handleBrandSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Brand Name</InputLabel>
                        <TextField
                            fullWidth
                            placeholder="Brand name"
                            name="name"
                            value={brand.name}
                            onChange={(e) => set_brand({...brand, name: e.target.value, name_error: null})}
                            error={Boolean(brand.name_error)}
                        />
                        {brand?.name_error && (
                            <FormHelperText error id="standard-weight-helper-text-retype-password">
                                {brand?.name_error}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <InputLabel>Image *</InputLabel>
                        <InputFile setUploadedImage={set_image} set_data={set_brand} data={brand} color={brand.image_error ? 'red' : '#d0d0d0'}
                        />
                        {brand.image_error && (
                            <FormHelperText error id="standard-weight-helper-text-retype-password">
                                {brand.image_error}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                { image && 
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                      <img src={image} alt="Uploaded" height={100} width={100} style={{ borderRadius: 10}}/>
                  </Grid>
                }
            </Grid>
            <br/>
            <SubmitButton type={type.type} text={"Brand"} />
          </form>
      </MainCard>
                
        <br/>
      <MainCard>
        <BrandTable data={employeeSlice?.allBrands || []} set_brand={set_brand} set_image={set_image} set_type={set_type} pagination={pagination} setPagination={setPagination}/>
      </MainCard>
    </React.Fragment>
  )
}

export default Brand