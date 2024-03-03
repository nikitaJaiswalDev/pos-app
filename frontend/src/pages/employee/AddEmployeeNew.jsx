import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MainCard from 'components/MainCard';
import CustomLoader from 'components/Loader/CustomLoader';
import SuccessToast from 'components/CustomToast/SuccessToast';
import WarningModal from 'components/CustomModal/Warning';
import { fetchAllRolesList, selectAllRolesList } from 'store/reducers/roleSlice';
import { fetchAllEmployeesList } from 'store/reducers/employees';
import useEmployeeForm from './useEmployeeForm'; // Assume you create this
import EmployeeGeneralInfoCard from 'components/cards/EmployeeGeneralInfoCard'; // Assume you create this
import EmployeeAccountInfoCard from 'components/cards/EmployeeAccountInfoCard'; // Assume you create this
import SubmitButton from '../../components/CustomButton/SubmitButton'; // Assume you create this
import { convertImage, formValidationSchema } from 'utils/index';
import EmployeeTable from 'components/CustomTable/EmployeeTable';
import { addEmployee, deleteEmployee, deletePicture, getPicture, updateEmployee, uploadProfile } from 'api/index';
import { useMutation } from '@tanstack/react-query'

const AddEmployee = () => {
  const dispatch = useDispatch();
  const { roleSlice, employeeSlice } = useSelector(selectAllRolesList);
  const [showToast, setShowToast] = useState({ open: false, title: '' });
  const [warning, setWarning] = useState({ open: false, content: '', id: null });
  const [type, setType] = useState('add');
 

  useEffect(() => {
    dispatch(fetchAllRolesList());
    dispatch(fetchAllEmployeesList());
  }, [dispatch]);

  const handleDetete = () => {
    deletedUser(warning.id._id)
    deletePic(warning.id.profile_picture_id)
  }

  // ----------------------- API Calls-------------------------
  // Delete Employee
  const { mutateAsync: deletedUser, isIdle: isDeleteIdle, isSuccess: isDeleteSuccess } = useMutation({
    mutationFn: (id) => deleteEmployee(id),
    onSuccess: (response) => {
      setShowToast({...showToast, open: true, title: response.data.message})
      setWarning({open: false, id: null, content: ''})
      dispatch(fetchAllEmployeesList());
    }
  })
  // Delete Profile Picture
  const { mutateAsync: deletePic } = useMutation({
    mutationFn: (id) => deletePicture(id),
    onSuccess: (response) => {
      dispatch(fetchAllEmployeesList());
    }
  })
  // Add Employee
  const { mutateAsync: addUser, isIdle: isEmployeeId, isSuccess: isEmployeeSuccess } = useMutation({
    mutationFn: (data) => !type.id ? addEmployee(data): updateEmployee(type.id,data),
    onSuccess: (response) => {
      if(response.status == 200) {
        setShowToast({...showToast, open: true, title: response.data.message})
        setType({ type: 'add', id: null})
        setUploadedImage(null)
        dispatch(fetchAllEmployeesList());
      } else {
        setShowToast({...showToast, open: true, title: response.data.message})
      }
    }
  })
 // Upload Profile Picture
  const { mutateAsync: addProfilePic } = useMutation({
    mutationFn: (data) => uploadProfile(data),
  })
  // Get Employee Picture
  const { mutateAsync: getUserPicture } = useMutation({
    mutationFn: (id) => getPicture(id),
    onSuccess: (response) => {
      const dataURL = convertImage(response.data.image.data);
      setUploadedImage(dataURL)
    }
  })

  const { initialValues, handleSubmit, formikRef, uploadedImage, setUploadedImage } = useEmployeeForm(type, addUser, addProfilePic);
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AddCircleOutlineIcon />
        <Typography variant="h3">Add New Employee</Typography>
      </Box>

      <CustomLoader open={employeeSlice?.isAllEmployeePending} />
      <WarningModal open={warning.open} handleClose={() => setWarning({ open: false, content: '' })} handleYes={async () => handleDetete()} title="Are you sure?" contentText={warning.content} />

      <MainCard>
        <Formik initialValues={initialValues} validationSchema={type == 'add' && formValidationSchema} onSubmit={handleSubmit} innerRef={formikRef}>
          {(formikProps) => (
            <Form>
              <EmployeeGeneralInfoCard roleSlice={roleSlice} values={formikProps.values} setFieldValue={formikProps.setFieldValue} errors={formikProps.errors} uploadedImage={uploadedImage} setUploadedImage={setUploadedImage}/>
              <br/>
              <EmployeeAccountInfoCard values={formikProps.values} setFieldValue={formikProps.setFieldValue} errors={formikProps.errors}/>
              <br/>
              <SubmitButton type={type} text={"Employee"} />
            </Form>
          )}
        </Formik>
          
          <br/><br/>
        <EmployeeTable employeeSlice={employeeSlice} setType={setType} setWarning={setWarning} getUserPicture={getUserPicture} formikRef={formikRef}/>
      </MainCard>

      <SuccessToast open={showToast.open} handleClose={() => setShowToast({ ...showToast, open: false })} title={showToast.title} />
    </React.Fragment>
  );
};

export default AddEmployee;
