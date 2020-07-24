import React from 'react';
import { Typography } from '@material-ui/core';
import { CoursesTable } from '../courses-table/courses-table';
import { Course } from '../../store/course/types';
import { User } from '../../store/user/types';

export interface CoursesListProps {
  courses: Course[] | null;
  deleteCourse: any;
  user: User;
  subscribe: (courseId: string) => void;
}

export function CoursesList(props: CoursesListProps) {
  if (!props.courses) {
    return (
      <Typography>
        There are no available courses yet.
      </Typography>
    )
  }
  return (
    <CoursesTable
      courses={props.courses}
      user={props.user}
      subscribe={props.subscribe}
    />
  );
}
