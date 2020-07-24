import { User } from "../user/types";

export enum Category {
  M = 'M', // math
  P = 'P', // practicum
  TCS = 'TCS', // Theoretical Computer Science OKN
  MPCS= 'MPCS', // Methodical-Practical Computer Science QKN
}

export enum Votes {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

export interface Vote {
  userId: string;
  reviewId: string;
  vote: Votes,
  _id: string,
  createdTimeStamp: Date,
}

export interface Review {
  _id?: string;
  text: string;
  courseId?: string;
  creatorId: string;
  creator?: User;
  createdTimestamp?: string;
  votes?: Vote[];
}

export interface Subscription {
  _id: string;
  courseId: string;
  userId: string;
  createdTimestamp: Date;
}

export interface Course {
  _id?: string;
  name: string;
  tutors: string[];
  reviews: Review[];
  subscriptions: Subscription[];
  category: Category;
  credits: number;
  description: string;
}

export interface CourseState {
  addCourseError: string;
  allCourses: Course[] | null;
  getCoursesError: string;
  currentCourse: Course | null;
  getCurrentCourseError: string;
}

export enum ADD_COURSE {
  SUCCESS = 'ADD_COURSE_SUCCESS',
  LOADING = 'ADD_COURSE_LOADING',
  FAILURE = 'ADD_COURSE_FAILURE',
}

export enum DELETE_COURSE {
  SUCCESS = 'DELETE_COURSE_SUCCESS',
  LOADING = 'DELETE_COURSE_LOADING',
  FAILURE = 'DELETE_COURSE_FAILURE',
}

export enum GET_ALL_COURSES {
  SUCCESS = 'GET_ALL_COURSES_SUCCESS',
  LOADING = 'GET_ALL_COURSES_LOADING',
  FAILURE = 'GET_ALL_COURSES_FAILURE',
}

export enum GET_CURRENT_COURSE {
  SUCCESS = 'GET_CURRENT_COURSE_SUCCESS',
  LOADING = 'GET_CURRENT_COURSE_LOADING',
  FAILURE = 'GET_CURRENT_COURSE_FAILURE',
}

export enum ADD_COURSE_REVIEW {
  SUCCESS = 'ADD_COURSE_REVIEW_SUCCESS',
  LOADING = 'ADD_COURSE_REVIEW_LOADING',
  FAILURE = 'ADD_COURSE_REVIEW_FAILURE',
}

export enum ADD_REVIEW_VOTE {
  SUCCESS = 'ADD_REVIEW_VOTE_SUCCESS',
  LOADING = 'ADD_REVIEW_VOTE_LOADING',
  FAILURE = 'ADD_REVIEW_VOTE_FAILURE',
}

export enum SUBSCRIBE_TO_COURSE {
  SUCCESS = 'SUBSCRIBE_TO_COURSE_SUCCESS',
  FAILURE = 'SUBSCRIBE_TO_COURSE_FAILURE',
}

interface AddCourseSuccessAction {
  type: typeof ADD_COURSE.SUCCESS;
  payload: Course;
}

interface AddCourseLoadingAction {
  type: typeof ADD_COURSE.LOADING;
  payload: {};
}

interface AddCourseFailureAction {
  type: typeof ADD_COURSE.FAILURE;
  payload: string;
}

interface DeleteCourseSuccessAction {
  type: typeof DELETE_COURSE.SUCCESS;
  payload: string;
}

interface DeleteCourseLoadingAction {
  type: typeof DELETE_COURSE.LOADING;
  payload: {};
}

interface DeleteCourseFailureAction {
  type: typeof DELETE_COURSE.FAILURE;
  payload: string;
}

interface GetAllCoursesSuccessAction {
  type: typeof GET_ALL_COURSES.SUCCESS;
  payload: Course[];
}

interface GetAllCoursesLoadingAction {
  type: typeof GET_ALL_COURSES.LOADING;
  payload: {};
}

interface GetAllCoursesFailureAction {
  type: typeof GET_ALL_COURSES.FAILURE;
  payload: string;
}

interface GetCurrentCourseSuccessAction {
  type: typeof GET_CURRENT_COURSE.SUCCESS;
  payload: Course;
}

interface GetCurrentCourseLoadingAction {
  type: typeof GET_CURRENT_COURSE.LOADING;
  payload: {};
}

interface GetCurrentCourseFailureAction {
  type: typeof GET_CURRENT_COURSE.FAILURE;
  payload: string;
}

interface AddCourseReviewSuccessAction {
  type: typeof ADD_COURSE_REVIEW.SUCCESS,
  payload: Course,
}

interface AddCourseReviewLoadingAction {
  type: typeof ADD_COURSE_REVIEW.LOADING,
  payload: {},
};

interface AddCourseReviewFailureAction {
  type: typeof ADD_COURSE_REVIEW.FAILURE,
  payload: string,
};

interface AddReviewVoteSuccessAction {
  type: typeof ADD_REVIEW_VOTE.SUCCESS,
  payload: Course,
};

interface AddReviewVoteFailureAction {
  type: typeof ADD_REVIEW_VOTE.FAILURE,
  payload: string,
};


interface SubscribeToCourseSuccessAction {
  type: typeof SUBSCRIBE_TO_COURSE.SUCCESS,
  payload: Course,
};

interface SubscribeToCourseFailureAction {
  type: typeof SUBSCRIBE_TO_COURSE.FAILURE,
  payload: string,
};

export type CourseActionTypes =
  AddCourseSuccessAction
  | AddCourseLoadingAction
  | AddCourseFailureAction
  | DeleteCourseSuccessAction
  | DeleteCourseLoadingAction
  | DeleteCourseFailureAction
  | GetAllCoursesSuccessAction
  | GetAllCoursesLoadingAction
  | GetAllCoursesFailureAction
  | GetCurrentCourseSuccessAction
  | GetCurrentCourseLoadingAction
  | GetCurrentCourseFailureAction
  | AddCourseReviewSuccessAction
  | AddCourseReviewLoadingAction
  | AddCourseReviewFailureAction
  | AddReviewVoteSuccessAction
  | AddReviewVoteFailureAction
  | SubscribeToCourseSuccessAction
  | SubscribeToCourseFailureAction;
