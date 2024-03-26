import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MainCard from 'components/MainCard';
import { fetchAllEmployeesList, selectAllEmployeeList } from 'store/reducers/employees';
import useEmployeeForm from './useEmployeeForm';
import SubmitButton from 'components/CustomButton/SubmitButton';
import { formValidationSchema } from 'utils/index';
import EmployeeTable from './EmployeeTable';
import { addEmployee, updateEmployee } from 'api/index';
import { useMutation } from '@tanstack/react-query'
import { openToast } from 'store/reducers/toast';
import { toggleLoader } from 'store/reducers/loader';
import AccountCard from './AccountCard';
import GeneralCard from './GeneralCard';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const { employeeSlice } = useSelector(selectAllEmployeeList);
  const [type, setType] = useState('add');
 

  useEffect(() => {
    dispatch(fetchAllEmployeesList());
  }, [dispatch]);


  // ----------------------- API Calls-------------------------
  // Add Employee
  const { mutateAsync: addUser } = useMutation({
    mutationFn: (data) => !type.id ? addEmployee(data): updateEmployee(type.id,data),
    onSuccess: (response) => {
      if(response.status == 200) {
        dispatch(openToast({ toast_open: true, title: response.data.message }));
        setType({ type: 'add', id: null})
        setUploadedImage(null)
        dispatch(fetchAllEmployeesList());
        dispatch(toggleLoader({loader: false}))
      } else {
        dispatch(openToast({ toast_open: true, title: response.data.message }));
      }
    }
  })

  const { initialValues, handleSubmit, formikRef, uploadedImage, setUploadedImage } = useEmployeeForm(addUser, dispatch);
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AddCircleOutlineIcon />
        <Typography variant="h3">Add New Employee</Typography>
      </Box>

      <MainCard>
        <Formik initialValues={initialValues} validationSchema={type == 'add' && formValidationSchema} onSubmit={handleSubmit} innerRef={formikRef}>
          {(formikProps) => (
            <Form>
              <GeneralCard roleSlice={employeeSlice} values={formikProps.values} setFieldValue={formikProps.setFieldValue} errors={formikProps.errors} uploadedImage={uploadedImage} setUploadedImage={setUploadedImage}/>
              <br/>
              <AccountCard values={formikProps.values} setFieldValue={formikProps.setFieldValue} errors={formikProps.errors}/>
              <br/>
              <SubmitButton type={type} text={"Employee"} />
            </Form>
          )}
        </Formik>
          
          <br/><br/>
        <EmployeeTable employeeSlice={employeeSlice} setType={setType} formikRef={formikRef} setUploadedImage={setUploadedImage}/>
      </MainCard>

    </React.Fragment>
  );
};

export default AddEmployee;
