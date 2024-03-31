import MainCard from 'components/MainCard'
import React, { useCallback, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Formik, Form } from 'formik';
import { convertBufferIntoFile, convertImage, productFormValidationSchema } from 'utils/index';
import SubmitButton from 'components/CustomButton/SubmitButton';
import AddProductForm from './AddProductForm';
import useProductForm from './useProductForm';
import { useMutation } from '@tanstack/react-query'
import { addProduct, getProductById, updateProduct } from 'api/index';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { toggleLoader } from 'store/reducers/loader';

const AddNew = () => {

    const [type, setType] = useState({type: 'add', id: null});
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let { productId } = useParams();
    
  // ----------------------- API Calls-------------------------
  // Add Product
  const { mutateAsync: addProductData } = useMutation({
    mutationFn: (data) => !type.id ? addProduct(data): updateProduct(type.id,data),
  })
  const { initialValues, handleSubmit, formikRef, uploadedImage, setUploadedImage } = useProductForm(addProductData, dispatch, setType, navigate, type);

  const fetchProductData = async () => {
    if (productId) {
      dispatch(toggleLoader({loader: true}))
      const data = await getProductById(productId);
      if (data) {
        setUploadedImage(convertImage(data.data.image.data));
        formikRef.current.setValues((prevValues) => ({
          ...prevValues,
          name: data.data.name,
          product_code: data.data.sku,
          brand: data.data.brand,
          quantity: data.data.qtn,
          unit_type: data.data.unit,
          unit_value: data.data.unit_value,
          category: data.data.category,
          supplier: data.data.supplier,
          selling_price: data.data.selling_price,
          purchase_price: data.data.purchase_price,
          discount_value: data.data.discount,
          tax: data.data.tax,
          profile_picture: convertBufferIntoFile(convertImage(data.data.image.data)),
        }));
      }
      dispatch(toggleLoader({loader: false}))
    }
  };

  useEffect(() => {
    if(productId) {
        setType({ type: 'update', id: productId})
        fetchProductData()
    }
  }, [productId])
 
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: '30px' }}>
        <AddCircleOutlineIcon />
        <Typography variant="h3">Add New Product</Typography>
      </Box>

      <MainCard>
        <Formik initialValues={initialValues} 
        validationSchema={type.type == 'add' && productFormValidationSchema}
         onSubmit={handleSubmit} innerRef={formikRef}>
            {(formikProps) => {
              formikRef.current = { setValues : formikProps.setFieldValue };
              return (
                <Form>
                  <AddProductForm values={formikProps.values} setFieldValue={formikProps.setFieldValue} uploadedImage={uploadedImage} setUploadedImage={setUploadedImage}  errors={formikProps.errors}/>
                  <br/> 
                  <SubmitButton type={type.type} text={"Product"} />
                </Form>
              )
            }}
          </Formik>
      </MainCard>
    </React.Fragment>
  )
}

export default AddNew