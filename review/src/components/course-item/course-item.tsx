import React from 'react';
import { Typography, Card, CardActions, CardContent, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Course } from '../../store/course/types';
import { useStyles } from './styles';

export interface CourseItemProps {
  course: Course
}

export function CourseItem({ course }: CourseItemProps) {
  const classes = useStyles();
  const history = useHistory();
  const styles = useStyles();

  const goToCourse = (courseId = '') => {
    history.push(`/courses/${courseId}`);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Course: {course.name}
        </Typography>
        <Typography variant="body2" component="p">
          Description: {'course.description'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => goToCourse(course._id)}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
