import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  getAllCourseSuggestions as getAllCourseSuggestionsActionCreator,
  deleteCourseSuggestion as deleteCourseSuggestionActionCreator,
} from '../store/course-suggestions/actions';
import { RootState } from '../store';
import {
  CourseSuggestions as CourseSuggestionsComponent
} from '../components/admin/course-suggestions/course-suggestions';

const mapDispatch = {
  getAllCourseSuggestions: () => {
    return getAllCourseSuggestionsActionCreator();
  },
  deleteCourseSuggestion: (id: string) => {
    return deleteCourseSuggestionActionCreator(id);
  }
}

const mapState = (state: RootState) => ({
  courseSuggestions: state.courseSuggestions.allCourseSuggestions
});

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

function CourseSuggestionsContainer(props: PropsFromRedux) {
  useEffect(() => {
    if (props.courseSuggestions === null) {
      props.getAllCourseSuggestions();
    }
  }, [props]);

  return (
    <CourseSuggestionsComponent
      courseSuggestions={props.courseSuggestions}
      deleteCourseSuggestion={props.deleteCourseSuggestion}
    />
  )
};

export const CourseSuggestions = connector(CourseSuggestionsContainer);
