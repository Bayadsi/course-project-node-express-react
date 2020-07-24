import React from 'react';
import {
  Formik,
} from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from '../../store/user/types';
import { Redirect } from 'react-router-dom';

export interface SignUpFormValues extends User {
  confirmPassword: string;
}

const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('This field is required.'),
  lastName: Yup.string()
    .required('This field is required.'),
  username: Yup.string()
    .max(15, 'The username you filled is too long')
    .required('This field is required.'),
  password: Yup.string()
    .matches(/([0-9]+)/, 'Password should contain at least one digit')
    .matches(/[^a-zA-Z0-9]/, 'Password should contain at least one special char')
    .min(8, 'Enter at least 8 charectors')
    .required('This field is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('This Field is required.'),
  gender: Yup.string()
    .required('This field is required.')
});

interface SignUpProps {
  user: User | undefined;
  onSignUp: any;
  signUpError: string;
}

export function SignUp(props: SignUpProps) {
  const classes = useStyles();
  const initialValues: SignUpFormValues = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: 'Male',
    role: 'User',
    registerTimestamp: new Date(),
    lastModifiedTimestamp: new Date(),
  };

  if (props.user) {
    return <Redirect to="/courses" />
  }

  return (
    <div className={classes.root}>
      <h1>Fill the Form below to sign up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const { confirmPassword, ...newUserValues } = values;
          (() => props.onSignUp(newUserValues))();
        }}
        validationSchema={signupValidationSchema}
        validateOnBlur
        initialErrors={{ firstName: 'bla' }}
      >
        {({ values, touched, handleChange, handleBlur, handleSubmit, errors, isValid }) => (
          <div className={classes.form}>
            <TextField
              name='firstName'
              className={classes.input}
              value={values.firstName}
              error={touched.firstName && !!errors.firstName}
              label="First Name"
              helperText={(touched.firstName && errors.firstName) || ' '}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              name='lastName'
              className={classes.input}
              value={values.lastName}
              error={touched.lastName && !!errors.lastName}
              label="Last Name"
              helperText={(touched.lastName && errors.lastName) || ' '}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              name='username'
              className={classes.input}
              value={values.username}
              error={touched.username && !!errors.username}
              label='Username'
              helperText={(touched.username && errors.username) || ' '}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />
            <TextField
              name='password'
              className={classes.input}
              type='password'
              value={values.password}
              error={touched.password && !!errors.password}
              label='Password'
              helperText={(touched.password && errors.password) || ' '}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />

            <TextField
              name='confirmPassword'
              className={classes.input}
              type='password'
              value={values.confirmPassword}
              error={touched.confirmPassword && !!errors.confirmPassword}
              label='Confirm Password'
              helperText={(touched.confirmPassword && errors.confirmPassword) || ' '}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />

            <Button
              disabled={!isValid}
              color='primary'
              variant="contained"
              className={classes.submitButton}
              onClick={() => handleSubmit()}
            >
              Sign up
            </Button>
            {props.signUpError && (
              <Typography className={classes.error}>
                {props.signUpError}
              </Typography>
            )}
          </div>
        )}
      </Formik>
      <Link href="/log-in" className={classes.signUpLink}>
        Already have an account? Log in here.
      </Link>
    </div >
  );
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
  },
  input: {
    display: 'flex',
    borderColor: 'yellow',
    borderWidth: 1,
    flexGrow: 1,
    marginTop: 20,
    flexShrink: 1,
    minWidth: 250,
  },
  form: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
    borderWidth: 1,
  },
  submitButton: {
    marginTop: 20,
    flexGrow: 1,
  },
  signUpLink: {
    marginTop: 50,
  },
  gender: {
    minWidth: 250,
  },
  error: {
    marginTop: 20,
    color: 'red',
  }
});
