import {
  CourseState, CourseActionTypes, ADD_COURSE, DELETE_COURSE, GET_ALL_COURSES, GET_CURRENT_COURSE, ADD_COURSE_REVIEW, ADD_REVIEW_VOTE, SUBSCRIBE_TO_COURSE
} from "./types";

const initialState: CourseState = {
  allCourses: null,
  addCourseError: '',
  getCoursesError: '',
  getCurrentCourseError: '',
  currentCourse: null,
};

export function courseReducer(
  state = initialState,
  action: CourseActionTypes): CourseState {
  switch (action.type) {
    case ADD_COURSE.SUCCESS: {
      const newCourses = state.allCourses
        ? [
          ...state.allCourses,
          action.payload
        ]
        : null;
        
      return {
        ...state,
        allCourses: newCourses,
      }
    }
    case ADD_COURSE.FAILURE: {
      return {
        ...state,
        addCourseError: action.payload,
      }
    }
    case GET_ALL_COURSES.SUCCESS: {
      return {
        ...state,
        allCourses: action.payload,
      }
    }
    case GET_ALL_COURSES.FAILURE: {
      return {
        ...state,
        getCoursesError: action.payload,
      }
    }
    case GET_CURRENT_COURSE.SUCCESS: {
      return {
        ...state,
        currentCourse: action.payload,
      }
    }
    case GET_CURRENT_COURSE.FAILURE: {
      return {
        ...state,
        getCurrentCourseError: action.payload,
      }
    }
    case DELETE_COURSE.SUCCESS: {
      const newCourses = state.allCourses
        ? [...state.allCourses.filter(u => u._id !== action.payload)]
        : state.allCourses;
      return {
        ...state,
        allCourses: newCourses,
      }
    }
    case ADD_COURSE_REVIEW.SUCCESS: {
      const updatedCourses = state.allCourses
        ? [...state.allCourses.filter(c => c._id !== action.payload._id), action.payload]
        : state.allCourses;
      return {
        ...state,
        allCourses: updatedCourses,
      }
    }
    case ADD_REVIEW_VOTE.SUCCESS: {
      const updatedCourses = state.allCourses
        ? [...state.allCourses.filter(c => c._id !== action.payload._id), action.payload]
        : state.allCourses;
      return {
        ...state,
        allCourses: updatedCourses,
      }
    }
    case SUBSCRIBE_TO_COURSE.SUCCESS: {
      const updatedCourses = state.allCourses
        ? [...state.allCourses.filter(c => c._id !== action.payload._id), action.payload]
        : state.allCourses;

      return {
        ...state,
        allCourses: updatedCourses,
      }
    }
    default: {
      return state;
    }
  }
}