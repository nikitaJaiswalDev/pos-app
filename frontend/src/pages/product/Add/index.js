import MainCard from 'components/MainCard'
import React, { useState } from 'react'
import { Box, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Formik, Form } from 'formik';
import { productFormValidationSchema } from 'utils/index';
import SubmitButton from 'components/CustomButton/SubmitButton';
import AddProductForm from './AddProductForm';
import useProductForm from './useProductForm';

const AddNew = () => {

    const [type, setType] = useState('add');
    const { initialValues, handleSubmit, formikRef, uploadedImage, setUploadedImage } = useProductForm();

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: '30px' }}>
        <AddCircleOutlineIcon />
        <Typography variant="h3">Add New Product</Typography>
      </Box>

      <MainCard>
        <Formik initialValues={initialValues} 
        // validationSchema={type == 'add' && productFormValidationSchema}
         onSubmit={handleSubmit} innerRef={formikRef}>
            {(formikProps) => (
              <Form>
                <AddProductForm values={formikProps.values} setFieldValue={formikProps.setFieldValue} uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
                <br/> 
                <SubmitButton type={type} text={"Product"} />
              </Form>
            )}
          </Formik>
      </MainCard>
    </React.Fragment>
  )
}

export default AddNew