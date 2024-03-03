import React from 'react';
import { Card, CardContent, CardHeader, Grid, TextField, MenuItem, Select, InputLabel, Stack, Divider, OutlinedInput, FormHelperText} from '@mui/material';
import InputFile from 'components/CustomInput/InputFile';

const EmployeeGeneralInfoCard = ({ roleSlice,values, setFieldValue,errors, uploadedImage, setUploadedImage }) => (
  <Card>
    <CardHeader title="General Information" />
    <Divider />
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={4}>
            <Stack spacing={1}>
                <InputLabel>First Name</InputLabel>
                <TextField
                    fullWidth
                    placeholder="Ex. John"
                    name="employeeInfo.first_name"
                    value={values.employeeInfo.first_name}
                    onChange={(e) => setFieldValue('employeeInfo.first_name', e.target.value)}
                />
                {errors?.employeeInfo?.first_name && (
                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                        {errors?.employeeInfo?.first_name}
                    </FormHelperText>
                )}
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <Stack spacing={1}>
                <InputLabel>Last Name</InputLabel>
                <TextField
                    fullWidth
                    placeholder="Ex. Doe"
                    name="employeeInfo.last_name"
                    value={values.employeeInfo.last_name}
                    onChange={(e) => setFieldValue('employeeInfo.last_name', e.target.value)}
                />
                {errors?.employeeInfo?.last_name && (
                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                        {errors?.employeeInfo?.last_name}
                    </FormHelperText>
                )}
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <Stack spacing={1}>
                <InputLabel>Image (Optional)</InputLabel>
                <InputFile setFieldValue={setFieldValue} setUploadedImage={setUploadedImage}/>
            </Stack>
        </Grid>

        <Grid item xs={4}>
            <Stack spacing={1}>
                <InputLabel>Role</InputLabel>
                <Select
                    fullWidth
                    name="employeeInfo.role_id"
                    value={values.employeeInfo.role_id}
                    onChange={(e) => setFieldValue('employeeInfo.role_id', e.target.value)}
                    defaultValue=""
                >
                {roleSlice.allRolesList.map((role) => (
                    <MenuItem key={role._id} value={role._id}>
                    {role.name}
                    </MenuItem>
                ))}
                </Select>
                {errors?.employeeInfo?.role_id && (
                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                        {errors?.employeeInfo?.role_id}
                    </FormHelperText>
                )}
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <Stack spacing={1}>
                <InputLabel>Phone</InputLabel>
                <TextField
                    fullWidth
                    placeholder="Ex: +8080121***"
                    name="employeeInfo.phone_no"
                    value={values.employeeInfo.phone_no}
                    onChange={(e) => setFieldValue('employeeInfo.phone_no', e.target.value)}
                />
                {errors?.employeeInfo?.phone_no && (
                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                        {errors?.employeeInfo?.phone_no}
                    </FormHelperText>
                )}
            </Stack>
        </Grid>
        { uploadedImage  &&
            <Grid item xs={4}>
                <img src={uploadedImage} alt="Uploaded" height={100} width={100} style={{ borderRadius: 50}}/>                
            </Grid>
        }
        
      </Grid>
    </CardContent>
  </Card>
);

export default EmployeeGeneralInfoCard;
