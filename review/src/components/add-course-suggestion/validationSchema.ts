import * as Yup from 'yup';

export const addCourseSuggestionValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(80, 'Recipe name should be less than 80 chars')
    .required('This field is required.'),
  desription: Yup.string()
    .max(256, 'Short description should be less than 256 chars'),
  credits: Yup.number(),
});
