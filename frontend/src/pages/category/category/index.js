import MainCard from 'components/MainCard'
import React, { useEffect, useState } from 'react'
import { Typography, Box, Grid, Stack, InputLabel, TextField, FormHelperText } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SubmitButton from 'components/CustomButton/SubmitButton';
import CategoryTable from './CategoryTable';
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, updateCategory } from 'api/index';
import { toggleLoader } from 'store/reducers/loader';
import { fetchAllCategories, selectAllEmployeeList } from 'store/reducers/employees';
import { openToast } from 'store/reducers/toast';

const Category = () => {
  const dispatch = useDispatch();
  const { employeeSlice } = useSelector(selectAllEmployeeList);

  const [type, set_type] = useState({type: 'add', id: null})
  const [category, set_category] = useState({
    name: null, name_error: null
  })

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Add Category
  const { mutateAsync: addCategoryData } = useMutation({
    mutationFn: (data) => !type.id ? addCategory(data): updateCategory(type.id,data),
  })

  const handleSubmit = async () => {
    if(!category.name) {set_category({...category, name_error: 'Required'})}
    else {
      dispatch(toggleLoader({loader: true}))
      const obj = {
        name: category.name
      }
      const res = await addCategoryData(obj)
      if(res.status === 200) {
        dispatch(fetchAllCategories());
        set_category({ name: '', name_error: null})
        dispatch(toggleLoader({loader: false}))
        set_type({ type: 'add', id: null})
        dispatch(openToast({ toast_open: true, title: res.data.message}))
      }
    }
  }

  return (
    <React.Fragment>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
        <AddCircleOutlineIcon />
        <Typography variant="h3">Add New Category</Typography>
      </Box>

      <MainCard>
        <Grid item xs={12}>
            <Stack spacing={1}>
                <InputLabel>Category Name</InputLabel>
                <TextField
                    fullWidth
                    placeholder="Add category name"
                    name="name"
                    value={category.name}
                    onChange={(e) => set_category({...category, name: e.target.value, name_error: null})}
                    error={Boolean(category.name_error)}
                />
                {category?.name_error && (
                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                        {category.name_error}
                    </FormHelperText>
                )}
            </Stack>
        </Grid>
        <br/>
        <SubmitButton type={type.type} text={"Category"} onClick={handleSubmit}/>
      </MainCard>
                
        <br/>
      <MainCard>
        <CategoryTable data={employeeSlice?.allCategories} set_category={set_category} set_type={set_type} />
      </MainCard>
    </React.Fragment>
  )
}

export default Category