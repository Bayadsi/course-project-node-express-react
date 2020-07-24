import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AddCourseSuggestion as AddCourseSuggestionComponent } from '../components/add-course-suggestion/add-course-suggestion';
import { CourseSuggestion } from '../store/course-suggestions/types';
import { addCourseSuggestion } from '../store/course-suggestions/actions';
import { RootState } from '../store';

const mapDispatch = {
  addCourseSuggestion: (courseSuggestion: CourseSuggestion) => {
    return addCourseSuggestion(courseSuggestion);
  }
}

const mapState = (state: RootState) => ({
  loggedUsername: state.users.user?._id || '',
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

function AddCourseSuggestionContainer(props: PropsFromRedux) {
  return (
    <AddCourseSuggestionComponent
      loggedUsername={props.loggedUsername}
      addCourseSuggestion={props.addCourseSuggestion}
    />
  )
};

export const AddCourseSuggestion = connector(AddCourseSuggestionContainer);