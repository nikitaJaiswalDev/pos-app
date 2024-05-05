import React from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import { Formik } from 'formik';

// project import
import AuthWrapper from './AuthWrapper';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { loginValidationSchema } from 'utils/index';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query'
import { loginUser } from 'api/index';
import { toggleLoader } from 'store/reducers/loader';
import { openToast } from 'store/reducers/toast';
// ================================|| LOGIN ||================================ //

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);

  // Add customer
  const { mutateAsync: login } = useMutation({
      mutationFn: (data) => loginUser(data)
  })

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            signIn: false
          }}
          validationSchema={loginValidationSchema}
          onSubmit={async ( values, actions ) => {
            dispatch(toggleLoader({ loader: true }));
            try {
                const res = await login(values);
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token)
                    navigate('/')
                } else {
                  dispatch(openToast({ toast_open: true, title: res.data.message, type:"error" }));
                }
            } catch (error) {
                dispatch(openToast({ toast_open: true, title: error, type:"error" }));
            } finally {
                dispatch(toggleLoader({ loader: false }));
                actions.resetForm()
            }
          }}
        >
          {({ errors, handleChange, handleSubmit, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <p>{JSON.stringify(values.submit)}</p>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                    <OutlinedInput
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onChange={handleChange}
                      placeholder="Enter email address"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-login">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="-password-login"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} sx={{ mt: -1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.signIn}
                          onChange={handleChange}
                          name="signIn"
                          color="primary"
                          size="small"
                        />
                      }
                      label={<Typography variant="h6">Keep me sign in</Typography>}
                    />
                    
                  </Stack>
                </Grid>
                {values.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                    <Button fullWidth size="large" type="submit" variant="contained" color="primary">
                      Login
                    </Button>
                </Grid>
                
              </Grid>
            </form>
          )}
        </Formik>
        </Grid>
      </Grid>
    </AuthWrapper>
  )
};

export default Login;
