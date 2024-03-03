import React from 'react';
import { Card, CardContent, CardHeader, Grid, TextField, InputLabel, Stack, Divider , FormHelperText } from '@mui/material';

const EmployeeAccountInfoCard = ({ values, setFieldValue, errors }) => (
  <Card>
    <CardHeader title="Account Information" />
    <Divider />
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={4}>
            <Stack spacing={1}>
                <InputLabel>Email</InputLabel>
                <TextField
                    fullWidth
                    placeholder="Ex. jon@yopmail.com"
                    name="employeeInfo.email"
                    value={values.employeeInfo.email}
                    onChange={(e) => setFieldValue('employeeInfo.email', e.target.value)}
                />
                {errors?.employeeInfo?.email && (
                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                        {errors?.employeeInfo?.email}
                    </FormHelperText>
                )}
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <Stack spacing={1}>
                <InputLabel>Password</InputLabel>
                <TextField
                    fullWidth
                    name="employeeInfo.password"
                    value={values.employeeInfo.password}
                    onChange={(e) => setFieldValue('employeeInfo.password', e.target.value)}
                />
                {errors?.employeeInfo?.password && (
                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                        {errors?.employeeInfo?.password}
                    </FormHelperText>
                )}
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <Stack spacing={1}>
                <InputLabel>Retype Password</InputLabel>
                <TextField
                    fullWidth
                    name="retype_password"
                    value={values.retype_password}
                    onChange={(e) => setFieldValue('retype_password', e.target.value)}
                />
                {errors?.retype_password && (
                    <FormHelperText error id="standard-weight-helper-text-retype-password">
                        {errors?.retype_password}
                    </FormHelperText>
                )}
            </Stack>
        </Grid>        
      </Grid>
    </CardContent>
  </Card>
);

export default EmployeeAccountInfoCard;
