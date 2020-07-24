import {
  Course,
  ADD_COURSE,
  GET_ALL_COURSES,
  DELETE_COURSE,
  GET_CURRENT_COURSE,
  Review,
  ADD_COURSE_REVIEW,
  ADD_REVIEW_VOTE,
  Votes,
  SUBSCRIBE_TO_COURSE,
} from "./types";
import coursesApi from "../../api-calls/courses";
import { DELETE_COURSE_SUGGESTION } from "../course-suggestions/types";

export function addCourse(course: Course, suggestionId: string) {
  return async function (dispatch: any) {
    const response = await coursesApi.createCourse(course);
    if (response.success) {
      dispatch({
        type: ADD_COURSE.SUCCESS,
        payload: response.course,
      });
      dispatch({
        type: DELETE_COURSE_SUGGESTION.SUCCESS,
        payload: suggestionId,
      });
    } else {
      dispatch({
        type: ADD_COURSE.FAILURE,
        payload: response.message,
      });
    }
  }
}

export function getAllCourses() {
  return async function (dispatch: any) {
    const response = await coursesApi.getAllCourses();
    if (response.success) {
      dispatch({
        type: GET_ALL_COURSES.SUCCESS,
        payload: response.courses,
      });
    } else {
      dispatch({
        type: GET_ALL_COURSES.FAILURE,
        payload: response.message,
      });
    }
  }
}

export function deleteCourse(id: string) {
  return async function (dispatch: any) {
    await coursesApi.deleteCourse(id);
    dispatch({
      type: DELETE_COURSE.SUCCESS,
      payload: id,
    });
  }
}

export function getCurrentCourse(id: string, courses: Course[] | null) {
  return async function (dispatch: any) {
    const course = await coursesApi.getCourse(id);
    dispatch({
      type: GET_CURRENT_COURSE.SUCCESS,
      payload: course.course,
    });
  }
}

export function addReviewToCourse(courseId: string, review: Review) {
  return async function (dispatch: any) {
    const response = await coursesApi.addReviewToCourse(courseId, review);
    if (response.success) {
      dispatch({
        type: ADD_COURSE_REVIEW.SUCCESS,
        payload: response.course,
      });
      dispatch({
        type: GET_CURRENT_COURSE.SUCCESS,
        payload: response.course,
      });
    } else {
      dispatch({
        type: ADD_COURSE_REVIEW.FAILURE,
        payload: response.message,
      });
    }
  }
}

export function addReviewVote(courseId: string, reviewId: string, userId: string, vote: Votes) {
  return async function (dispatch: any) {
    const response = await coursesApi.addReviewVote(courseId, reviewId, userId, vote);
    if (response.success) {
      dispatch({
        type: ADD_REVIEW_VOTE.SUCCESS,
        payload: response.course,
      });
      dispatch({
        type: GET_CURRENT_COURSE.SUCCESS,
        payload: response.course,
      });
    } else {
      dispatch({
        type: ADD_REVIEW_VOTE.FAILURE,
        payload: response.message,
      });
    }
  }
}

export function subscribeToCourse(courseId: string, userId: string) {
  return async function (dispatch: any) {
    const response = await coursesApi.subscribeToCourse(courseId, userId);
    if (response.success) {
      dispatch({
        type: SUBSCRIBE_TO_COURSE.SUCCESS,
        payload: response.course,
      });
    } else {
      dispatch({
        type: SUBSCRIBE_TO_COURSE.FAILURE,
        payload: response.message,
      });
    }
  }
}