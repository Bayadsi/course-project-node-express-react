import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      display: 'flex',
      flexDirection: 'column',
      height: '90vh',
      width: '90vw',
    },
    header: {
      fontWeight: 600,
      fontSize: 30,
      padding: 50,
    },
    body: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    text: {
      fontSize: 20,
      textAlign: 'justify',
    },
    buttonExplText: {
      fontSize: 20,
    },
    media: {
      float: 'right',
      height: 300,
      width: 300,
    },
    footer: {
      padding: 50,
    },
    button: {
      fontSize: 20,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
    },
    right: {
      flexBasis: 'auto',
    }, 
    left: {
      float: 'right',
    }
  }));
