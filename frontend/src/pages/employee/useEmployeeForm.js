import { useState, useRef, useEffect } from 'react';

const useEmployeeForm = (type, addUser, addProfilePic) => {
  const [initialValues, setInitialValues] = useState({
    employeeInfo: {
      first_name: '',
      last_name: '',
      profile_picture_id: '',
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
    let pic_id = ''
    if(values.profile_picture) {
      const data = new FormData();
      data.append('image', values.profile_picture);
      const response = await addProfilePic(data)
      if(response.status == 200) {
        pic_id = response.data._id
      }
    }
    await addUser({...values.employeeInfo, profile_picture_id: pic_id })
    actions.resetForm();
  };

  return { initialValues, handleSubmit, formikRef, uploadedImage, setUploadedImage };
};

export default useEmployeeForm;