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
  generalInfo: Yup.object().shape({
    first_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    profile_picture: Yup.mixed().required('Required'),
    role: Yup.string().required('Required'),
    phone_no: Yup.string().required('Required'),
  }),
  accountInfo: Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(3).max(8).required('Required'),
    retype_password: Yup.string().min(3).max(8).required('Required'),
  }),
});