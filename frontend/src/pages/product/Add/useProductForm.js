import { useState, useRef } from 'react';
import { toggleLoader } from 'store/reducers/loader';
import { openToast } from 'store/reducers/toast';

const useProductForm = (addProductData, dispatch, setType, navigate, type) => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    product_code: '',
    brand: '',
    quantity: '',
    unit_type: '',
    unit_value: '',
    category: '',
    selling_price: '',
    purchase_price: '',
    discount_value: '',
    tax: '',
    supplier: '',
    profile_picture: null
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const formikRef = useRef();

  const handleSubmit = async (values, actions ) => {
    dispatch(toggleLoader({ loader: true}))
    const data = new FormData();
    data.append('name', values.name);
    data.append('sku', values.product_code);
    data.append('brand', values.brand);
    data.append('qtn', values.quantity);
    data.append('unit', values.unit_type);
    data.append('unit_value', values.unit_value);
    data.append('category', values.category);
    data.append('supplier', values.supplier);
    data.append('selling_price', values.selling_price);
    data.append('purchase_price', values.purchase_price);
    data.append('discount', values.discount_value);
    data.append('tax', values.tax);
    data.append('image', values.profile_picture);
    try {
      const res = await addProductData(data)
      if(res.status !== 200) throw new Error(res.data.message)
      dispatch(openToast({ toast_open: true, title: res.data.message }));
      setUploadedImage(null)
      setType({ type: 'add', id: null})
    } catch (error) {
      dispatch(openToast({ toast_open: true, title: error.message }));
    } finally {
      dispatch(toggleLoader({loader: false}))
      actions.resetForm();
      if(type.type == 'update') {
        navigate('/product/list')
      }
    }
  };

  return { initialValues, handleSubmit, formikRef, uploadedImage, setUploadedImage };
};

export default useProductForm;