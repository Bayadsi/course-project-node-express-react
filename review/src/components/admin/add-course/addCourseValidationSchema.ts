import * as Yup from 'yup';

export const addCourseValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(80, 'Recipe name should be less than 80 chars')
    .required('This field is required.'),
  description: Yup.string()
    .max(256, 'Short description should be less than 500 chars')
    .required('This field is required.'),
  credits: Yup.number()
    .required('This field is required.'),
});
