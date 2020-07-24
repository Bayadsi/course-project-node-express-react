import React from 'react';
import {
  Grid,
  Typography,
  CardMedia,
  Button
} from '@material-ui/core';
import { useHistory, Redirect } from 'react-router-dom';
import { User } from '../../store/user/types';
import { useStyles } from './styles';

export interface HomeProps {
  user: User | undefined;
}

export function Home(props: HomeProps) {
  const classes = useStyles();
  const history = useHistory();

  const goToSignUpPage = () => {
    history.push('/sign-up');
  }

  const goToLoginPage = () => {
    history.push('/log-in');
  }

  
  if (props.user) {
    return <Redirect to="/courses" />
  }

  return (
    <div className={classes.content}>
      <Typography className={classes.header}>
        Welcome to ReviewIt
      </Typography>
      <Grid container item xs={12} className={classes.body} spacing={10}>
        <Grid item xs={6}>
          <CardMedia
            className={classes.media}
            image='reviewItIcon.JPG'
            title="Paella dish"
          />
        </Grid>
        <Grid item xs={6} >
          <Typography className={classes.text} > 
            Are you studying at the Faculty of Mathematics and Informatics in Sofia University?
            Curious about an elective course? How about hearing about the experience of other students
            who have already taken the course?
          </Typography>
          <Typography className={classes.text}>
            Join our Platform now to read and write reviews to help other students too.
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.footer} spacing={10}>
        <Grid
          container
          item
          xs={6}
          alignItems="flex-end"
          justify="flex-end"
          direction="column"
        >
          <Typography className={classes.buttonExplText}>
            First time here? Join us!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={goToSignUpPage}
            className={classes.button}
          >
            Sign up!
          </Button>
        </Grid>
        <Grid
          container
          item
          xs={6}
          alignItems="flex-start"
          justify="flex-start"
          direction="column"
        >
          <Typography className={classes.buttonExplText}>
            Already have an account?
          </Typography>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={goToLoginPage}
          >
            Log in!
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
