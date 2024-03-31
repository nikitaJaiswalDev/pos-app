import React, { useEffect } from 'react';
import { Grid, TextField, MenuItem, Select, InputLabel, Stack, OutlinedInput, FormHelperText} from '@mui/material';
import InputFile from 'components/CustomInput/InputFile';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBrand, fetchAllCategories, fetchAllSuppliers, fetchAllUnits, selectAllEmployeeList } from 'store/reducers/employees';
import { capitalizedString } from 'utils/index';


const AddProductForm = ({ values, setFieldValue, uploadedImage, setUploadedImage, errors}) => {
    const dispatch = useDispatch();
    const { employeeSlice } = useSelector(selectAllEmployeeList);

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
                    <InputLabel>Product Code SKU *</InputLabel>
                    <TextField
                        fullWidth
                        placeholder="Product code"
                        name="product_code"
                        value={values.product_code}
                        onChange={(e) => setFieldValue('product_code', e.target.value)}
                        error={Boolean(errors.product_code)}
                    />
                     {errors?.product_code && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.product_code}
                        </FormHelperText>
                    )}
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
                        error={Boolean(errors.brand)}
                    >
                        <MenuItem value=''>--Select--</MenuItem>
                        { employeeSlice?.allBrands.map(item => (
                            <MenuItem key={item._id} value={item._id}>{capitalizedString(item.name)}</MenuItem>
                        ))}
                    </Select>
                    {errors?.brand && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.brand}
                        </FormHelperText>
                    )}
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Quantity *</InputLabel>
                    <OutlinedInput
                        type="number"
                        fullWidth
                        placeholder="Quantity"
                        name="quantity"
                        value={values.quantity}
                        onChange={(e) => setFieldValue('quantity', e.target.value)}
                        error={Boolean(errors.quantity)}
                    />
                     {errors?.quantity && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.quantity}
                        </FormHelperText>
                    )}
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
                        error={Boolean(errors.unit_type)}
                    >
                        <MenuItem value=''>--Select--</MenuItem>
                        { employeeSlice?.allUnits.map(item => (
                            <MenuItem key={item._id} value={item._id}>{capitalizedString(item.name)}</MenuItem>
                        ))}
                    </Select>
                    {errors?.unit_type && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.unit_type}
                        </FormHelperText>
                    )}
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Unit Value *</InputLabel>
                    <OutlinedInput
                        type="number"
                        fullWidth
                        placeholder="Unit Value"
                        name="unit_value"
                        value={values.unit_value}
                        onChange={(e) => setFieldValue('unit_value', e.target.value)}
                        error={Boolean(errors.unit_value)}
                    />
                    {errors?.unit_value && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.unit_value}
                        </FormHelperText>
                    )}
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
                        error={Boolean(errors.category)}
                    >
                        <MenuItem value=''>--Select--</MenuItem>
                        { employeeSlice?.allCategories.map(item => (
                            <MenuItem key={item._id} value={item._id}>{capitalizedString(item.name)}</MenuItem>
                        ))}
                    </Select>
                    {errors?.category && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.category}
                        </FormHelperText>
                    )}
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
                        error={Boolean(errors.supplier)}
                    >
                        <MenuItem value=''>--Select--</MenuItem>
                        { employeeSlice?.allSuppliers.map(item => (
                            <MenuItem key={item._id} value={item._id}>{capitalizedString(item.name)}</MenuItem>
                        ))}
                    </Select>
                    {errors?.supplier && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.supplier}
                        </FormHelperText>
                    )}
                </Stack>
            </Grid>
    
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Selling Price *</InputLabel>
                    <OutlinedInput
                        type="number"
                        fullWidth
                        placeholder="Selling Price"
                        name="selling_price"
                        value={values.selling_price}
                        onChange={(e) => setFieldValue('selling_price', e.target.value)}
                        error={Boolean(errors.selling_price)}
                    />
                    {errors?.selling_price && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.selling_price}
                        </FormHelperText>
                    )}
                </Stack>
            </Grid>

            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Purchase Price *</InputLabel>
                    <OutlinedInput
                        type="number"
                        fullWidth
                        placeholder="Purchase Price"
                        name="purchase_price"
                        value={values.purchase_price}
                        onChange={(e) => setFieldValue('purchase_price', e.target.value)}
                        error={Boolean(errors.purchase_price)}
                    />
                    {errors?.purchase_price && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.purchase_price}
                        </FormHelperText>
                    )}
                </Stack>
            </Grid>
    
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Discount Value (%)</InputLabel>
                    <OutlinedInput
                        type="number"
                        fullWidth
                        placeholder="Discount"
                        name="discount_value"
                        value={values.discount_value}
                        onChange={(e) => setFieldValue('discount_value', e.target.value)}
                        error={Boolean(errors.discount_value)}
                    />
                    {errors?.discount_value && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.discount_value}
                        </FormHelperText>
                    )}
                </Stack>
            </Grid>
    
            <Grid item xs={6}>
                <Stack spacing={1}>
                    <InputLabel>Tax in percent (%)</InputLabel>
                    <OutlinedInput
                        type="number"
                        placeholder="Tax"
                        name="tax"
                        value={values.tax}
                        onChange={(e) => setFieldValue('tax', e.target.value)}
                        error={Boolean(errors.tax)}
                    />
                    {errors?.tax && (
                        <FormHelperText error id="standard-weight-helper-text-retype-password">
                            {errors?.tax}
                        </FormHelperText>
                    )}
                </Stack>
            </Grid>
    
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <InputLabel>Image </InputLabel>
                    <InputFile setFieldValue={setFieldValue} setUploadedImage={setUploadedImage} color={errors.profile_picture ? 'red' : '#d0d0d0'}
                    />
                </Stack>
            </Grid>
            { uploadedImage  &&
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <img src={uploadedImage} alt="Uploaded" height='auto' width={300} style={{ borderRadius: 20}}/>                
                </Grid>
            }
            
        </Grid>
    );
 }

export default AddProductForm;
