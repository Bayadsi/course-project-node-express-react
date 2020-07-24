import { Category } from "../course/types";

export interface CourseSuggestion {
  _id?: string;
  name: string;
  tutors: string[];
  creatorId: string;
  credits?: number;
  category?: Category;
  description?: string;
}

export interface CourseSuggestionState {
  addCourseError: string;
  allCourseSuggestions: CourseSuggestion[] | null;
  getCourseSuggestionsError: string;
}

export const ADD_COURSE_SUGGESTION = 'ADD_COURSE_SUGGESTION';
export const ADD_COURSE_SUGGESTION_FAILURE = 'ADD_COURSE_SUGGESTION_FAILURE';

export const GET_ALL_COURSE_SUGGESTIONS = 'GET_ALL_COURSE_SUGGESTIONS';
export const GET_ALL_COURSE_SUGGESTIONS_FAILURE = 'GET_ALL_COURSE_SUGGESTIONS_FAILURE';

export enum DELETE_COURSE_SUGGESTION {
  SUCCESS = 'DELETE_COURSE_SUGGESTION_SUCCESS',
  LOADING = 'DELETE_COURSE_SUGGESTION_LOADING',
  FAILURE = 'DELETE_COURSE_SUGGESTION_FAILURE',
}

interface AddCourseSuggestion {
  type: typeof ADD_COURSE_SUGGESTION;
  payload: CourseSuggestion;
}

interface AddCourseSuggestionFailureAction {
  type: typeof ADD_COURSE_SUGGESTION_FAILURE;
  payload: string;
}

interface GetAllCourseSuggestionsAction {
  type: typeof GET_ALL_COURSE_SUGGESTIONS;
  payload: CourseSuggestion[];
}

interface GetAllCourseSuggestionsFailureAction {
  type: typeof GET_ALL_COURSE_SUGGESTIONS_FAILURE;
  payload: string;
}

interface DeleteCourseSuggestionSuccesAction {
  type: typeof DELETE_COURSE_SUGGESTION.SUCCESS;
  payload: string;
}

interface DeleteCourseSuggestionFailureAction {
  type: typeof DELETE_COURSE_SUGGESTION.FAILURE;
  payload: string;
}

export type CourseSuggestionActionTypes =
  AddCourseSuggestion
  | AddCourseSuggestionFailureAction
  | GetAllCourseSuggestionsAction
  | GetAllCourseSuggestionsFailureAction
  | DeleteCourseSuggestionSuccesAction
  | DeleteCourseSuggestionFailureAction;
