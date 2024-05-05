import * as Yup from 'yup';

export const capitalizedString = (inputString) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export const roleFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    roles: Yup.array()
    .of(
      Yup.object().shape({
        role_id: Yup.string().required(),
        name: Yup.string().required(),
        status: Yup.boolean().required(),
      })
    )
    .test('at-least-one-true', 'Select any one role', (value) => {
      return value.some((role) => role.status === true);
    })
    .required('Roles are required'),
});
  
export const formValidationSchema = Yup.object().shape({
  employeeInfo: Yup.object().shape({
    first_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    role_id: Yup.string().required('Required'),
    phone_no: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Required'),
  }),
  retype_password: Yup.string().oneOf([Yup.ref('employeeInfo.password'), null], 'Passwords must match').required('Required'),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required'),
});

export const convertImage = (buffer) => {
  const binary = buffer.reduce((data, byte) => data + String.fromCharCode(byte), '');
  return 'data:image/png;base64,' + btoa(binary);
}

export const convertBufferIntoFile = (base64Data, fileName='file.png') => {
  const parts = base64Data?.split(';base64,');
    const mimeType = parts[0]?.split(':')[1];
    const imageData = parts[1];
    const byteString = atob(imageData);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: mimeType });
    const file = new File([blob], fileName, { type: mimeType });
    
    return file;
}

export const productFormValidationSchema = Yup.object().shape({
  name: Yup.string().matches(/^[A-Za-z ]*$/, 'Name must contain only letters').required('Required'),
  product_code: Yup.string().required('Required'),
  brand: Yup.string().required('Required'),
  quantity: Yup.number().required('Required'),
  unit_type: Yup.string().required('Required'),
  unit_value: Yup.number().required('Required'),
  category: Yup.string().required('Required'),
  purchase_price: Yup.number().required('Required'),
  discount_value: Yup.number().required('Required'),
  tax: Yup.number().required('Required'),
  supplier: Yup.string().required('Required'),
  profile_picture: Yup.string().required('Required'),
  selling_price: Yup.number().required('Required'),
});

export const customerFormValidationSchema = Yup.object().shape({
  name: Yup.string().matches(/^[A-Za-z ]*$/, 'Name must contain only letters').required('Required'),
  mobile_no: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  state: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  zip_code: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
});

export const supplierFormValidationSchema = Yup.object().shape({
  name: Yup.string().matches(/^[A-Za-z ]*$/, 'Name must contain only letters').required('Required'),
  mobile_no: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  country: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  zip_code: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
});
export const shopFormValidationSchema = Yup.object().shape({
  name: Yup.string().matches(/^[A-Za-z ]*$/, 'Name must contain only letters').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  vat: Yup.string().required('Required'),
  profile_picture: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
});
export const PaymentFormSchema = Yup.object().shape({
  payment_method: Yup.string().max(50).required('Required'),
  collected_cash: Yup.string().max(50).required('Required'),
});