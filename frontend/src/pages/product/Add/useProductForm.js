import { useState, useRef } from 'react';

const useProductForm = (type, addUser, addProfilePic) => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    product_code: '',
    brand: '',
    quantity: '',
    unit_type: '',
    unit_value: '',
    category: '',
    sub_category: '',
    selling_price: '',
    purchase_price: '',
    discount_type: '',
    discount_value: '',
    tax: '',
    supplier: '',
    image: '',
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const formikRef = useRef();

  const handleSubmit = async (event, values, actions ) => {
    console.log('clicked');
    actions.resetForm();
  };

  return { initialValues, handleSubmit, formikRef, uploadedImage, setUploadedImage };
};

export default useProductForm;