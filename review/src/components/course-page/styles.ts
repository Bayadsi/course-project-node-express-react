import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    fontSize: 30,
    fontWeight: 600,
  },
  courseDetails: {
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    borderStyle: 'solid',
    borderRadius: 20,
    textAlign: 'justify',
    padding: 20,
    margin: 20,
    width: '100%',
  },
  propertyName: {
    fontWeight: 600,
    marginRight: 10,
    color: '#ffffff',
  },
  text: {
    color: '#ffffff',
  }
}));
