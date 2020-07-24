import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { Course, Votes } from '../../store/course/types';
import { ReviewInput } from '../review-input/review-input';
import { ReviewItem } from '../review-item/review-item';
import { useStyles } from './styles';
import { getCategoryName } from '../../service';
import { User } from '../../store/user/types';

export interface CoursePageProps {
  course: Course | null;
  addReviewToCourse: any;
  addReviewVote: any;
  user: User;
}

export function CoursePage(props: CoursePageProps) {
  const { course } = props;

  const classes = useStyles();
  if (!course) {
    return (
      <Typography>
        Sorry, we could not find the course you are looking for.
      </Typography>
    );
  }

  return (
    <Container>
      <Typography className={classes.title}>
        Course: {course.name}
      </Typography>
      <Container className={classes.courseDetails}>
        {course.credits && (
          <>
            <br />
            <Typography component='span' className={classes.propertyName}>
              Credits:
            </Typography>
            <Typography component='span' className={classes.text}>
              {course.credits}
            </Typography>
          </>
        )}
        {course.category && (
          <>
            <br />
            <Typography component='span' className={classes.propertyName}>
              Category:
            </Typography>
            <Typography component='span' className={classes.text}>
              {getCategoryName(course.category)}
            </Typography>
          </>
        )}
        {course.tutors && !!course.tutors.length && (
          <>
            <br />
            <Typography component='span' className={classes.propertyName}>
              Turors:
            </Typography>
            <Typography component='span' className={classes.text}>
              {course.tutors.join(', ')}
            </Typography>
          </>
        )}
        {course.description && (
          <>
            <br />
            <Typography component='span' className={classes.propertyName}>
              Description:
            </Typography>
            <Typography component='span' className={classes.text}>
              {course.description}
            </Typography>
          </>
        )}
      </Container>
      {course.reviews && course.reviews.map((review, index) => (
        <ReviewItem
          key={index}
          review={review}
          addReviewVote={(vote: Votes) => props.addReviewVote(review._id, vote)}
          user={props.user}
        />
      ))}
      <ReviewInput addReviewToCourse={props.addReviewToCourse} />
    </Container>
  );
}