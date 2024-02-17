import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  last_name: yup
    .string()
    .required('Last name is required')
    .min(2, 'First name must be at least 2 characters'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password file is required'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password file is required'),
});
