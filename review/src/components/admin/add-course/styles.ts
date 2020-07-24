import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    display: 'flex',
    borderWidth: 1,
    flexGrow: 1,
    marginTop: 20,
    flexShrink: 1,
    width: 450,
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 200,
  },
  signUpLink: {
    marginTop: 50,
  },
  tutor: {
    display: 'flex',
    flexDirection: 'row',
    width: 450,
  },
  formControl: {
    margin: theme.spacing(1),
    width: 450,
  },
  tutors: {
    width: 450,
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  tutorsLabel: {
    marginTop: 20,
  },
  addButton: {
    height: 56,
    marginTop: 20,
    marginLeft: 5,
  }
}));
