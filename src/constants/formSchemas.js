import * as yup from 'yup';

export const signUpSchema = yup.object({
  email: yup
    .string()
    .email('The email should be a valid email address')
    .required('The email field is required'),
  username: yup
    .string()
    .max(14, 'The username must not exceed 14 characters')
    .required('The username field is required'),
  password: yup
    .string()
    .min(6, 'The password must be at least 6 characters')
    .required('The password field is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'The passwords must match')
    .required('The confirm password field is required'),
});
