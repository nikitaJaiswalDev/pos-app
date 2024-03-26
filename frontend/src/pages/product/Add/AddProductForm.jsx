import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, Grid, TextField, MenuItem, Select, InputLabel, Stack, Divider, OutlinedInput, FormHelperText} from '@mui/material';
import InputFile from 'components/CustomInput/InputFile';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBrand, fetchAllCategories, fetchAllSuppliers, fetchAllUnits, selectAllEmployeeList } from 'store/reducers/employees';
import { capitalizedString } from 'utils/index';


const AddProductForm = ({ values, setFieldValue, errors, touched}) => {
    const dispatch = useDispatch();
    const { employeeSlice } = useSelector(selectAllEmployeeList);
    // console.log({ employeeSlice });

    useEffect(() => {
        dispatch(fetchAllBrand());
        dispatch(fetchAllUnits());
        dispatch(fetchAllCategories());
        dispatch(fetchAllSuppliers());
    }, [dispatch]);
    return  (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Name *</InputLabel>
                    <TextField
                        fullWidth
                        placeholder="Product name"
                        name="name"
                        value={values.name}
                        onChange={(e) => setFieldValue('name', e.target.value)}
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
                    <InputLabel>Product Code SKU *</InputLabel>
                    <TextField
                        fullWidth
                        placeholder="Product code"
                        name="product_code"
                        value={values.product_code}
                        onChange={(e) => setFieldValue('product_code', e.target.value)}
                    />
                    {/* {errors?.employeeInfo?.last_name && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.employeeInfo?.last_name}
                        </FormHelperText>
                    )} */}
                </Stack>
            </Grid>
    
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Brand *</InputLabel>
                    <Select
                        fullWidth
                        name="brand"
                        value={values.brand}
                        onChange={(e) => setFieldValue('brand', e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value=''>----Select----</MenuItem>
                        { employeeSlice?.allBrands.map(item => (
                            <MenuItem value={item._id}>{capitalizedString(item.name)}</MenuItem>
                        ))}
                    </Select>
                    {/* {errors?.employeeInfo?.role_id && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.employeeInfo?.role_id}
                        </FormHelperText>
                    )} */}
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Quantity *</InputLabel>
                    <TextField
                        fullWidth
                        placeholder="Quantity"
                        name="quantity"
                        value={values.quantity}
                        onChange={(e) => setFieldValue('quantity', e.target.value)}
                    />
                    {/* {errors?.employeeInfo?.phone_no && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.employeeInfo?.phone_no}
                        </FormHelperText>
                    )} */}
                </Stack>
            </Grid>
    
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Unit Type *</InputLabel>
                    <Select
                        fullWidth
                        name="unit_type"
                        value={values.unit_type}
                        onChange={(e) => setFieldValue('unit_type', e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value=''>----Select----</MenuItem>
                        { employeeSlice?.allUnits.map(item => (
                            <MenuItem value={item._id}>{capitalizedString(item.name)}</MenuItem>
                        ))}
                    </Select>
                    {/* {errors?.employeeInfo?.role_id && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.employeeInfo?.role_id}
                        </FormHelperText>
                    )} */}
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Unit Value *</InputLabel>
                    <TextField
                        fullWidth
                        placeholder="Unit Value"
                        name="unit_value"
                        value={values.unit_value}
                        onChange={(e) => setFieldValue('unit_value', e.target.value)}
                    />
                    {/* {errors?.employeeInfo?.phone_no && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.employeeInfo?.phone_no}
                        </FormHelperText>
                    )} */}
                </Stack>
            </Grid>
    
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Category *</InputLabel>
                    <Select
                        fullWidth
                        name="category"
                        value={values.category}
                        onChange={(e) => setFieldValue('category', e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value=''>----Select----</MenuItem>
                        { employeeSlice?.allCategories.map(item => (
                            <MenuItem value={item._id}>{capitalizedString(item.name)}</MenuItem>
                        ))}
                    </Select>
                    {/* {errors?.employeeInfo?.role_id && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.employeeInfo?.role_id}
                        </FormHelperText>
                    )} */}
                </Stack>
            </Grid>

            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Select Supplier</InputLabel>
                    <Select
                        fullWidth
                        name="supplier"
                        value={values.supplier}
                        onChange={(e) => setFieldValue('supplier', e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value=''>----Select----</MenuItem>
                        { employeeSlice?.allSuppliers.map(item => (
                            <MenuItem value={item._id}>{capitalizedString(item.name)}</MenuItem>
                        ))}
                    </Select>
                    {/* {errors?.employeeInfo?.role_id && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.employeeInfo?.role_id}
                        </FormHelperText>
                    )} */}
                </Stack>
            </Grid>
    
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Selling Price *</InputLabel>
                    <TextField
                        fullWidth
                        placeholder="Selling Price"
                        name="selling_price"
                        value={values.selling_price}
                        onChange={(e) => setFieldValue('selling_price', e.target.value)}
                    />
                    {/* {errors?.employeeInfo?.phone_no && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.employeeInfo?.phone_no}
                        </FormHelperText>
                    )} */}
                </Stack>
            </Grid>

            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Purchase Price *</InputLabel>
                    <TextField
                        fullWidth
                        placeholder="Purchase Price"
                        name="purchase_price"
                        value={values.purchase_price}
                        onChange={(e) => setFieldValue('purchase_price', e.target.value)}
                    />
                    {/* {errors?.employeeInfo?.phone_no && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.employeeInfo?.phone_no}
                        </FormHelperText>
                    )} */}
                </Stack>
            </Grid>
    
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Discount Value (%)</InputLabel>
                    <TextField
                        fullWidth
                        placeholder="Discount"
                        name="discount_value"
                        value={values.discount_value}
                        onChange={(e) => setFieldValue('discount_value', e.target.value)}
                    />
                    {/* {errors?.employeeInfo?.phone_no && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.employeeInfo?.phone_no}
                        </FormHelperText>
                    )} */}
                </Stack>
            </Grid>
    
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Tax in percent (%)</InputLabel>
                    <TextField
                        fullWidth
                        placeholder="Tax"
                        name="tax"
                        value={values.tax}
                        onChange={(e) => setFieldValue('tax', e.target.value)}
                    />
                    {/* {errors?.employeeInfo?.phone_no && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.employeeInfo?.phone_no}
                        </FormHelperText>
                    )} */}
                </Stack>
            </Grid>
    
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <InputLabel>Image </InputLabel>
                    <InputFile />
                </Stack>
            </Grid>
            {/* { uploadedImage  &&
                <Grid item xs={4}>
                    <img src={uploadedImage} alt="Uploaded" height={100} width={100} style={{ borderRadius: 50}}/>                
                </Grid>
            } */}
            
        </Grid>
    );
 }

export default AddProductForm;
