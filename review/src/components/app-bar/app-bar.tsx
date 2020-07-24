import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
} from '@material-ui/core';
import {
  AccountCircle,
} from '@material-ui/icons';
import { useStyles } from './styles';
import { useHistory } from 'react-router-dom';

export function CustomAppBar(props: any) {
  const classes = useStyles();
  function onLogout() {
    props.onLogout();
    handleMenuClose();
  }
  const isOnCoursesPage = props.path === '/courses';

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
      <MenuItem onClick={onLogout}>Logout</MenuItem>
    </Menu>
  );

  const history = useHistory();
  const goToCourses = () => {
    history.push('/courses');
  }
  const goToSuggestions = () => {
    history.push('/\course-suggestions');
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            ReviewIt
          </Typography>
          {!isOnCoursesPage && (
            <Button className={classes.coursesButton} color="primary" variant="contained" onClick={goToCourses}>
              View All Courses
            </Button>
          )}
          {
            props.user && props.user.role === 'admin' && (
              <Button className={classes.coursesButton} color="primary" variant="contained" onClick={goToSuggestions}>
                View All Course Suggestions
              </Button>
            )
          }
          <div className={classes.grow} />
          {props.user && (
            <Typography> {props.user.firstName} {props.user.lastName}</Typography>
          )}
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
