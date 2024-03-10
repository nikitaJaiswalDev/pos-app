import MainCard from 'components/MainCard'
import React, { useState, useRef, useEffect} from 'react'
import {  Box,
  FormHelperText,
  IconButton,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Button,
  Typography,
  Checkbox,
  Chip
} from '@mui/material';
import { Formik } from 'formik';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { addRole, deleteRole, editRole, getAllRolesList, getAllRolesNames, getOneRole } from 'api/index';
import SuccessToast from 'components/CustomToast/SuccessToast';
import { capitalizedString, roleFormSchema } from 'utils/index';
import CustomLoader from 'components/Loader/CustomLoader';
import WarningModal from 'components/CustomModal/Warning';
import RoleTable from 'components/CustomTable/RoleTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRolesList, selectAllRolesList } from 'store/reducers/roleSlice';

const AddRole = () => {

  const queryClient = useQueryClient()
  const formikRef = useRef();
  const dispatch = useDispatch();
  const { roleSlice } = useSelector(selectAllRolesList);

  useEffect(() => {
    dispatch(fetchAllRolesList());
  }, [dispatch]);

  // states
  const [showToast, setShowToast] = useState({
    open: false,
    title: ''
  })
  const [type, setType] = useState({type: 'add', id: null})
  const [warning, setWarning] = useState({
    open: false, content: '', id: null
  })

  // ---------------------- API CALL --------------------
  // fetch role names
  const { data: roleNames, isLoading: isRoleNameLoading } = useQuery({
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

  // delete role list
  const { mutateAsync: deletedRoleList, isIdle: isDeleteIdle, isSuccess: isDeleteSuccess } = useMutation({
    mutationFn: (id) => deleteRole(id),
    onSuccess: (response) => {
      setShowToast({...showToast, open: true, title: response.message})
      setWarning({open: false, id: null, content: ''})
      dispatch(fetchAllRolesList());
    }
  })

   // add role list item
  const { mutateAsync: addRoleList, isIdle: isAddIdle, isSuccess: isAddSuccess } = useMutation({
    mutationFn: (data) => !type.id ? addRole(data): editRole(type.id,data),
    onSuccess: (response) => {
      console.log({ response });
      if(response.status !== 200) {
        setShowToast({open: true, title: response.data.message})
      } else {
        setShowToast({open: true, title: response.data.message})
        dispatch(fetchAllRolesList());
        setType({ type: 'add', id: null})
        setWarning({open: false, id: null, content: ''})
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
    }
  })

  return (
    <React.Fragment>

      {/* Roles section */}
      <CustomLoader open={isRoleNameLoading || 
        roleSlice.isAllRolesPending ||
        !isDeleteIdle && !isDeleteSuccess ||
        !isAddIdle && !isAddSuccess
      }/>

        <WarningModal
          open={warning.open} 
          handleClose={() => setWarning({open: false, content: ''})}
          handleYes={async() => await deletedRoleList(warning.id)}
          title={"Are you sure?"}
          contentText={warning.content}
        />
      
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
              setTouched({name: false})
              await addRoleList(values)
              setSubmitting(false);
            } catch (err) {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values, setValues }) => {
            formikRef.current = { setValues }; 
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
                    <Typography variant="h5" onClick={() => console.log(values)}>Module Permission :</Typography>
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
                      values.roles.map(item => (
                      <Grid item xs={3} sx={{ marginTop: '-5px'}} key={item.id}>
                        <Checkbox size="small"
                          checked={item.status}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            formikRef.current.setValues((prevValues) => {
                              console.log({ prevValues, item });
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
                    ))
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
        {!roleSlice.isAllRolesPending &&
          <RoleTable allRolesList={roleSlice.allRolesList} setType={setType} type={type} addRoleList={addRoleList}setShowToast={setShowToast} setWarning={setWarning} formikRef={formikRef}/>
        }
      </MainCard>
      {
        showToast.open &&
        <SuccessToast open={showToast.open} handleClose={() => setShowToast({...showToast, open: false})} title={showToast.title}/>

      }
    </React.Fragment>
  )
}

export default AddRole