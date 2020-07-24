import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';

export const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: 1,
      fontSize: 30,
      fontWeight: 600,
      paddingTop: 10,
    },
    accordion: {
      flex: 1,
    },
    formControl: {
      margin: theme.spacing(3),
    },
    addNewCourseBuuton: {
      marginTop: 10,
      paddingRight: 20,
      paddingLeft: 20,
    },
    searchInput: {
      marginTop: 10,

    },
  }),
);


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    subscribeButton: {
      width: 140,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

