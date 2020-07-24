import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from '../containers/home';
import { CoursePage } from '../containers/course-page';
import { Courses } from '../containers/courses';
import { SignUp } from '../containers/sign-up';
import { LogIn } from '../containers/log-in';
import { ProtectedRoute } from './protected-route';
import { AddCourseSuggestion } from '../containers/add-course-suggestion';
import { CourseSuggestions } from '../containers/course-suggestions';
import { AdminProtectedRoute } from './admin/admin-protected-route';
import { AddCourse } from '../containers/add-course';

export function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <ProtectedRoute path='/courses/:id' component={CoursePage} />
        <ProtectedRoute path='/courses' component={Courses} />
        <ProtectedRoute path='/add-course-suggestion' component={AddCourseSuggestion} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/log-in' component={LogIn} />
        <AdminProtectedRoute path='/course-suggestions' component={CourseSuggestions} />
        <AdminProtectedRoute path='/add-course' component={AddCourse} />
      </Switch>
    </Router>
  );
}
