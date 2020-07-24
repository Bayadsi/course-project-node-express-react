import React, { useState } from 'react';
import { Button, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './styles';

export interface ReviewInputProps {
  addReviewToCourse: (review: string) => any;
}

export function ReviewInput(props: ReviewInputProps) {
  const classes = useStyles();
  const [review, setReviewText] = useState<string>('');

  return (
    <Container className={classes.root}>
      <TextField
        value={review}
        multiline
        rowsMax={4}
        id="outlined-full-width"
        label="Your review"
        style={{ margin: 8 }}
        placeholder="Type something"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        onChange={(e) => setReviewText(e.target.value)}
      />
      <Button
        color='primary'
        variant='contained'
        onClick={() => props.addReviewToCourse(review)}
        className={classes.button}
        disabled={!review.length}
      >
        Add Review
      </Button>
    </Container>
  );
}
