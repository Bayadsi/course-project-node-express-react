import {
  ADD_COURSE_SUGGESTION,
  ADD_COURSE_SUGGESTION_FAILURE,
  CourseSuggestionActionTypes,
  CourseSuggestionState,
  GET_ALL_COURSE_SUGGESTIONS,
  GET_ALL_COURSE_SUGGESTIONS_FAILURE,
  DELETE_COURSE_SUGGESTION,
} from "./types";

const initialState: CourseSuggestionState = {
  allCourseSuggestions: null,
  addCourseError: '',
  getCourseSuggestionsError: '',
};

export function courseSuggestionsReducer(
  state = initialState,
  action: CourseSuggestionActionTypes): CourseSuggestionState {
  switch (action.type) {
    case ADD_COURSE_SUGGESTION: {
      const newCourseSuggestions = state.allCourseSuggestions
        ? [
          ...state.allCourseSuggestions,
          action.payload
        ]
        : null;
        
      return {
        ...state,
        allCourseSuggestions: newCourseSuggestions,
      }
    }
    case ADD_COURSE_SUGGESTION_FAILURE: {
      return {
        ...state,
        addCourseError: action.payload,
      }
    }
    case GET_ALL_COURSE_SUGGESTIONS: {
      return {
        ...state,
        allCourseSuggestions: action.payload,
      }
    }
    case GET_ALL_COURSE_SUGGESTIONS_FAILURE: {
      return {
        ...state,
        getCourseSuggestionsError: action.payload,
      }
    }
    case DELETE_COURSE_SUGGESTION.SUCCESS: {
      const newCourseSuggestions = state.allCourseSuggestions
        ? [...state.allCourseSuggestions.filter(u => u._id !== action.payload)]
        : state.allCourseSuggestions;
      return {
        ...state,
        allCourseSuggestions: newCourseSuggestions,
      }
    }
    default: {
      return state;
    }
  }
}