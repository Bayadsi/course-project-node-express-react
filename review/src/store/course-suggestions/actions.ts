import {
  ADD_COURSE_SUGGESTION,
  ADD_COURSE_SUGGESTION_FAILURE,
  CourseSuggestion,
  GET_ALL_COURSE_SUGGESTIONS,
  GET_ALL_COURSE_SUGGESTIONS_FAILURE,
  DELETE_COURSE_SUGGESTION,
} from "./types";
import courseSuggestionApi from "../../api-calls/course-suggestions";

export function addCourseSuggestion(courseSuggestion: CourseSuggestion) {
  return async function (dispatch: any) {
    const response = await courseSuggestionApi.createCourseSuggestion(courseSuggestion);
    if (response.success) {
      dispatch({
        type: ADD_COURSE_SUGGESTION,
        payload: response.user,
      });
    } else {
      dispatch({
        type: ADD_COURSE_SUGGESTION_FAILURE,
        payload: response.message,
      });
    }
  }
}

export function getAllCourseSuggestions() {
  return async function (dispatch: any) {
    const response = await courseSuggestionApi.getAllCourseSuggestions();
    if (response.success) {
      dispatch({
        type: GET_ALL_COURSE_SUGGESTIONS,
        payload: response.courseSuggestions,
      });
    } else {
      dispatch({
        type: GET_ALL_COURSE_SUGGESTIONS_FAILURE,
        payload: response.message,
      });
    }
  }
}


export function deleteCourseSuggestion(id: string) {
  return async function (dispatch: any) {
    await courseSuggestionApi.deleteCourseSuggestion(id);
    dispatch({
      type: DELETE_COURSE_SUGGESTION.SUCCESS,
      payload: id,
    });
  }
}
