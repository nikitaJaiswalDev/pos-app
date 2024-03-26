import { useState, useRef, useEffect } from 'react';
import { toggleLoader } from 'store/reducers/loader';

const useEmployeeForm = (addUser, dispatch) => {
  const [initialValues, setInitialValues] = useState({
    employeeInfo: {
      first_name: '',
      last_name: '',
      role_id: '',
      phone_no: '',
      email: '',
      password: '',
    },
    retype_password: '',
    profile_picture: null
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const formikRef = useRef();

  const handleSubmit = async (values, actions ) => {
    dispatch(toggleLoader({ loader: true}))
    const data = new FormData();
    data.append('first_name', values.employeeInfo.first_name);
    data.append('last_name', values.employeeInfo.last_name);
    data.append('image', values.profile_picture);
    data.append('role_id', values.employeeInfo.role_id);
    data.append('phone_no', values.employeeInfo.phone_no);
    data.append('email', values.employeeInfo.email);
    data.append('password', values.employeeInfo.password);
    await addUser(data)
    actions.resetForm();
  };

  return { initialValues, handleSubmit, formikRef, uploadedImage, setUploadedImage };
};

export default useEmployeeForm;