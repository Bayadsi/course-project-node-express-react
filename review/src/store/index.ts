import { combineReducers } from 'redux';
import { userReducer } from './user/reducers';
import { courseReducer } from './course/reducers';
import { courseSuggestionsReducer } from './course-suggestions/reducers';

const rootReducer = combineReducers({
  users: userReducer,
  courseSuggestions: courseSuggestionsReducer,
  courses: courseReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>