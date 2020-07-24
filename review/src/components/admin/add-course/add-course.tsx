import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import {
  Typography,
  TextField,
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  IconButton,
  Box,
  Chip
} from '@material-ui/core';
import { useStyles } from './styles';
import { CourseSuggestion } from '../../../store/course-suggestions/types';
import { Category } from '../../../store/course/types';
import { getCategoryName } from '../../../service';
import { addCourseValidationSchema } from './addCourseValidationSchema';
import CloseIcon from '@material-ui/icons/Close';

interface AddCourseProps {
  loggedUsername: string;
  addCourse: any;
}

export function AddCourse(props: AddCourseProps) {
  const classes = useStyles();
  const location = useLocation();
  const courseSuggestion = ((location && location.state) || {
    name: '',
    tutors: [],
    creatorId: '',
    description: '',
    credits: undefined,
    _id: '',
  }) as CourseSuggestion;
  console.log(location.state);
  const initialValues = {
    suggestionId: courseSuggestion._id,
    name: courseSuggestion.name,
    tutors: courseSuggestion.tutors,
    reviews: [],
    category: courseSuggestion.category,
    credits: courseSuggestion.credits,
    description: courseSuggestion.description,
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [tempTutor, setTempTutor] = useState<string>('');
  return (
    <>
      <Typography variant='h4' className={classes.title}>
        Edit the form below to add a course.
      </Typography>
      <Container className={classes.formWrapper}>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Course Created!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            const suggestion = props.addCourse(values, values.suggestionId);
            handleOpen();
          }}
          validationSchema={addCourseValidationSchema}
          validateOnBlur
          initialErrors={{ name: 'bla' }}
        >
          {({ values,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            isValid
          }) => (
              <div className={classes.form}>
                <TextField
                  className={classes.input}
                  name='name'
                  value={values.name}
                  label="Name"
                  helperText={(touched.name && errors.name) || ' '}
                  variant="outlined"
                  onChange={handleChange}
                  error={touched.name && !!errors.name}
                  onBlur={handleBlur}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={values.category}
                    label="Category"
                    onChange={(e) => setFieldValue('category', e.target.value)}
                  >
                    <MenuItem value={undefined}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={Category.M}>{getCategoryName(Category.M)}</MenuItem>
                    <MenuItem value={Category.P}>{getCategoryName(Category.P)}</MenuItem>
                    <MenuItem value={Category.MPCS}>{getCategoryName(Category.MPCS)}</MenuItem>
                    <MenuItem value={Category.TCS}>{getCategoryName(Category.TCS)}</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  id="outlined-number"
                  label="Credits"
                  type="number"
                  value={values.credits}
                  variant="outlined"
                  name="credits"
                  className={classes.input}
                  error={touched.credits && !!errors.credits}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={(touched.credits && errors.credits)}
                />
                <Typography className={classes.tutorsLabel}>Tutors:</Typography>
                <Box className={classes.tutor}>
                  <TextField
                    variant="outlined"
                    className={classes.input}
                    value={tempTutor}
                    onChange={(event) => setTempTutor(event.target.value)}
                  />
                  <Button
                    disabled={!tempTutor}
                    className={classes.addButton}
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setFieldValue(
                        'tutors',
                        [...values.tutors.filter(w => w !== tempTutor), tempTutor]
                      );
                      setTempTutor('');
                    }}
                  >
                    Add
                </Button>
                </Box>
                <Box className={classes.tutors}>
                  {values.tutors && values.tutors.map((tutor, index) => (
                    <Chip
                      key={tutor+index}
                      label={tutor}
                      onDelete={() => setFieldValue(
                        'tutors',
                        values.tutors.filter(t => t !== tutor)
                      )}
                    />
                  ))}
                </Box>
              
                <TextField
                  name='description'
                  value={values.description}
                  multiline
                  rowsMax={10}
                  id="outlined-full-width"
                  label="Course Description"
                  variant="outlined"
                  className={classes.input}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && !!errors.description}
                  helperText={(touched.description && errors.description)}
                />
                <Button
                  disabled={!isValid}
                  color='primary'
                  variant="contained"
                  className={classes.submitButton}
                  onClick={() => handleSubmit()}
                >
                  Submit Course
            </Button>
              </div>
            )}
        </Formik>
      </Container>
    </>
  );
}