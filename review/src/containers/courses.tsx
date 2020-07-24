import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  getAllCourses as getAllCoursesActionCreator,
  deleteCourse as deleteCoursesActionCreator,
  subscribeToCourse as subscribeToCourseActionCreator,
} from '../store/course/actions';
import { RootState } from '../store';
import { CoursesList } from '../components/courses-list/courses-list';

const mapDispatch = {
  getAllCourses: () => {
    return getAllCoursesActionCreator();
  },
  deleteCourse: (id: string) => {
    return deleteCoursesActionCreator(id);
  },
  subscribe: (courseId: string, userId: string) => {
    return subscribeToCourseActionCreator(courseId, userId);
  }
}

const mapState = (state: RootState) => ({
  courses: state.courses.allCourses,
  user: state.users.user,
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

function CoursesContainer(props: PropsFromRedux) {
  useEffect(() => {
    if (props.courses === null) {
      props.getAllCourses();
    }
  }, [props]);

  if (!props.user) {
    return <></>
  }

  return (
    <CoursesList
      courses={props.courses}
      deleteCourse={props.deleteCourse}
      user={props.user}
      subscribe={(courseId: string) => { props.subscribe(courseId, props.user?._id || '') }}
    />
  )
};

export const Courses = connector(CoursesContainer);