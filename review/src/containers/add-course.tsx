import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  AddCourse as AddCourseComponent,
} from '../components/admin/add-course/add-course';
import { Course } from '../store/course/types';
import {
  addCourse as addCourseActionCreator
} from '../store/course/actions';
import { RootState } from '../store';

const mapDispatch = {
  addCourse: (course: Course, suggestionId: string) => {
    return addCourseActionCreator(course, suggestionId);
  }
}

const mapState = (state: RootState) => ({
  loggedUsername: state.users.user?._id || '',
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

function AddCourseContainer(props: PropsFromRedux) {
  return (
    <AddCourseComponent
      loggedUsername={props.loggedUsername}
      addCourse={props.addCourse}
    />
  )
};

export const AddCourse = connector(AddCourseContainer);