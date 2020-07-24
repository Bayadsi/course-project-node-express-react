import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  getCurrentCourse as getCurrentCourseActionCreator,
  addReviewToCourse as addReviewToCourseActionCreator,
  addReviewVote as addReviewVoteActionCreator
} from '../store/course/actions';
import { RootState } from '../store';
import {
  CoursePage as CoursePageComponent
} from '../components/course-page/course-page';
import { Course, Review, Votes } from '../store/course/types';
import { useParams } from 'react-router-dom';

const mapDispatch = {
  getCurrentCourse: (id: string, courses: Course[] | null) => {
    return getCurrentCourseActionCreator(id, courses);
  },
  addReviewToCourse: (courseId: string, review: Review) => {
    return addReviewToCourseActionCreator(courseId, review);
  },
  addReviewVote: (courseId: string, reviewId: string, userId: string, vote: Votes) => {
    return addReviewVoteActionCreator(courseId, reviewId, userId, vote);
  }
}

const mapState = (state: RootState) => ({
  courses: state.courses.allCourses,
  currentCourse: state.courses.currentCourse,
  user: state.users.user,
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

function CoursePageContainer(props: PropsFromRedux) {
  const { id } = useParams();
  useEffect(() => {
    if (props.currentCourse === null || props.currentCourse._id !== id) {
      props.getCurrentCourse(id, props.courses);
    }
  }, [props, id]);
  if (!props.user) {
    return (
      <></>
    );
  }

  return (
    <CoursePageComponent
      course={props.currentCourse}
      addReviewToCourse={(reviewText: string) => props.addReviewToCourse(id, {
        text: reviewText,
        creatorId: props.user?._id || '',
      })}
      addReviewVote={(reviewId: string, vote: Votes) => props.currentCourse && props.addReviewVote(
        props.currentCourse._id || '', reviewId, props.user?._id || '',
        vote
      )}
      user={props.user}
    />
  );
};

export const CoursePage= connector(CoursePageContainer);
