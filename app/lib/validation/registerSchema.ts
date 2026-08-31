import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().required('Name is required'),

  email: yup
    .string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email')
    .required('Email is required'),

  phone: yup
    .string()
    .required()
    .matches(/^\+\d{7,15}$/, {
      message: 'Phone must start with + and contain 7-15 digits',
      excludeEmptyString: true,
    }),

  password: yup
    .string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
});
