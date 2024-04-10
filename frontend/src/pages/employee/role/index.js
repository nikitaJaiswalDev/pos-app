import MainCard from 'components/MainCard'
import React, { useState, useRef, useEffect} from 'react'
import {
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Button,
  Typography,
  Checkbox,
} from '@mui/material';
import { Formik } from 'formik';

import { useQuery, useMutation } from '@tanstack/react-query'
import { addRole, editRole, getAllRolesNames } from 'api/index';
import { capitalizedString, roleFormSchema } from 'utils/index';
import RoleTable from './RoleTable';
import { useDispatch, useSelector } from 'react-redux';
import { openToast } from 'store/reducers/toast';
import { fetchAllRolesList } from 'store/reducers/employees';
import { toggleLoader } from 'store/reducers/loader';

const AddRole = () => {

  const formikRef = useRef();
  const dispatch = useDispatch();

  const [type, setType] = useState({type: 'add', id: null})

  

  // ---------------------- API CALL --------------------
  // fetch role names
  const { isLoading: isRoleNameLoading } = useQuery({
    queryKey: ['roleNames'],
    queryFn: () => getAllRolesNames(),
    select: (data) => {
      const filtered = data?.data.filter(item => item.active).map(item => ({role_id: item._id, name: item.name, status: false}))
      formikRef.current.setValues({
        name: '',
        status: true,
        roles: filtered
      });
    }
  });

  useEffect(()=> {
    dispatch(toggleLoader({ loader: isRoleNameLoading}))
  }, [isRoleNameLoading])

   // add role list item
  const { mutateAsync: addRoleList } = useMutation({
    mutationFn: (data) => !type.id ? addRole(data): editRole(type.id,data),
    onSuccess: (response) => {
      if(response.status !== 200) {
        dispatch(openToast({toast_open: true, title: response.data.message, type:"success"}))
      } else {
        dispatch(openToast({toast_open: true, title: response.data.message, type:"error"}))
        dispatch(fetchAllRolesList());
        setType({ type: 'add', id: null})
        formikRef.current.setValues((prevValues) => {
          const updatedRoles = prevValues.roles.map(role => {
            return {...role, status: false}
          });
          return {
            ...prevValues,
            roles: updatedRoles,
            name: ''
          };
        });
      }
      dispatch(toggleLoader({loader: false}))
    }
  })

  return (
    <React.Fragment>

      {/* Roles section */}      
      <MainCard>
        <Formik
          initialValues={{
            name: '',
            status: true,
            roles: []
          }}
          validationSchema={roleFormSchema}
          onSubmit={async (values, 
            { setSubmitting, setTouched }
            ) => {
            try {
              dispatch(toggleLoader({loader: true}))
              setTouched({name: false})
              const roles = values.roles.filter(item => item.status).map(item => item.role_id)
              const obj = {
                name: values.name,
                status: values.status,
                roles: roles
              }
              await addRoleList(obj)
              setSubmitting(false);
            } catch (err) {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values, setValues }) => {
            formikRef.current = { setValues, values }; 
            return (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="role-name">Role name</InputLabel>
                      <OutlinedInput
                        id="role-name"
                        type="text"
                        value={values.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Add role name"
                        fullWidth
                        error={Boolean(errors.name && touched.name)}
                      />
                      {errors.name && touched.name && (
                        <FormHelperText error>
                          {errors.name}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  
                  <Grid item xs={2} >
                    <Typography variant="h5">Module Permission :</Typography>
                  </Grid>

                </Grid>

                <br/>
                <Grid item xs={12} sx={{ marginTop: '-15px'}}>
                  {errors.roles && touched.roles && (
                    <FormHelperText error>
                      {errors.roles}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid container xs={12}>
                  {
                    isRoleNameLoading ? <div>Loading...</div>
                    :
                      values.roles.map(item => {
                        return (
                          <Grid item xs={3} sx={{ marginTop: '-5px'}} key={item.id}>
                            <Checkbox size="small"
                              checked={item.status}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                formikRef.current.setValues((prevValues) => {
                                  const updatedRoles = prevValues.roles.map(role =>
                                    role.role_id === item.role_id ? { ...role, status: checked } : role
                                  );
                                  return {
                                    ...prevValues,
                                    roles: updatedRoles
                                  };
                                });
                            }}
                            />{ capitalizedString(item.name) }
                          </Grid>
                        )
                      })
                  }

                  <Grid item xs={12} sx={{ marginTop: '20px'}}>
                      <Button size="large" type="submit" variant="contained" color="primary">
                        {type.type == 'add' ? 'Submit': 'Update'}
                      </Button>
                  </Grid>

                </Grid>
              </form>
            )
          }}
        </Formik>
      </MainCard>

      <br/>
      {/* Role Table */}
      <MainCard>
          <RoleTable setType={setType} type={type} addRoleList={addRoleList} formikRef={formikRef}/>
      </MainCard>

    </React.Fragment>
  )
}

export default AddRole