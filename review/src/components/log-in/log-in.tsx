import React from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField, Link, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const logInValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('This field is required.'),
  password: Yup.string()
    .required('This field is required.'),
});

export interface LogInFormValues {
  username: string;
  password: string;
}

export function LogIn(props: any) {
  const classes = useStyles();
  const initialValues: LogInFormValues = { username: '', password: '' };

  if (props.user) {
    return (<Redirect to='/courses' />);
  }

  return (
    <div className={classes.root}>
      <h1>Welcome</h1>
      
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => props.onLogIn(values)}
        validationSchema={logInValidationSchema}
        validateOnBlur
        initialErrors={{ username: 'bla' }}
      >
        {({ values, touched, handleBlur, handleChange, handleSubmit, errors, isValid }) => (
          <div className={classes.form}>
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
              value={values.password}
              error={touched.password && !!errors.password}
              label='Password'
              helperText={(touched.password && errors.password) || ' '}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              type="password"
            />

            <Button
              disabled={!isValid}
              color='primary'
              variant="contained"
              className={classes.submitButton}
              onClick={() => handleSubmit()}
            >
              Log In
            </Button>
            {props.logInError && (
              <Typography className={classes.error}>
                {props.logInError}
              </Typography>
            )}
          </div>
        )}
      </Formik>
      <Link href="/sign-up" className={classes.signUpLink}>
        Don't have an account? Sign up here.
      </Link>
    </div>
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
    flexGrow: 1,
    marginTop: 20,
    minWidth: 350,
    flexShrink: 1,
  },
  form: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
  },
  submitButton: {
    marginTop: 20,
    flexGrow: 1,
  },
  signUpLink: {
    marginTop: 20,
  },
  media: {
    height: 140,
    width: 140
  },
  error: {
    marginTop: 20,
    color: 'red',
  }
});
