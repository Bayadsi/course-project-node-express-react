import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderWidth: 1,
      borderColor: theme.palette.primary.main,
      borderStyle: 'solid',
      borderRadius: 20,
      textAlign: 'justify',
      padding: 20,
      margin: 20,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    info: {
      flexGrow: 1,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    name: {
      fontWeight: 600,
      marginRight: 5,
    },
    likeButtons: {
      alignSelf: 'center',
    },
    buttonWrapper: {
      justifyContent: 'space-between',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    likesNumber: {
      textAlign: 'right',
      color: '#22ee5b'
    },
    dislikesNumber: {
      textAlign: 'right',
      color: '#fe0000',
    }
  }),
);
