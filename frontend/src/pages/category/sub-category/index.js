import MainCard from 'components/MainCard'
import React from 'react'
import { Typography, Box, Grid, Stack, InputLabel, TextField, FormHelperText, Select, MenuItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SubmitButton from 'components/CustomButton/SubmitButton';
import SubCategoryTable from './SubCategoryTable';

const SubCategory = () => {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
        <AddCircleOutlineIcon />
        <Typography variant="h3">Add New Sub Category</Typography>
      </Box>

      <MainCard>
        <Grid container spacing={2}>
        <Grid item xs={6}>
            <Stack spacing={1}>
                <InputLabel>Category Name</InputLabel>
                <TextField
                    fullWidth
                    placeholder="Add category name"
                    name="employeeInfo.first_name"
                />
                {/* {errors?.employeeInfo?.first_name && (
                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                        {errors?.employeeInfo?.first_name}
                    </FormHelperText>
                )} */}
            </Stack>
        </Grid>
        <Grid item xs={6}>
            <Stack spacing={1}>
                <InputLabel>Main Category *</InputLabel>
                <Select
                    fullWidth
                    name="brand"
                    defaultValue="----Select---"
                >
                    <MenuItem value={'test'}>Test</MenuItem>
                </Select>
                {/* {errors?.employeeInfo?.role_id && (
                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                        {errors?.employeeInfo?.role_id}
                    </FormHelperText>
                )} */}
            </Stack>
        </Grid>
        </Grid>
        <br/>
        <SubmitButton type="add" text={"Sub Category"}/>
      </MainCard>
                
        <br/>
      <MainCard>
        <SubCategoryTable />
      </MainCard>
    </React.Fragment>
  )
}

export default SubCategory