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
  password: Yup.string().max(255).required('Password is required')
});

export const convertImage = (buffer) => {
  const binary = buffer.reduce((data, byte) => data + String.fromCharCode(byte), '');
  return 'data:image/png;base64,' + btoa(binary);
}