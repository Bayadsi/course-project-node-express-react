import React from 'react';
import { Container, Typography, IconButton, Avatar, Box } from '@material-ui/core';
import { Review, Votes, Vote } from '../../store/course/types';
import { useStyles } from './styles';
import {ThumbUpAlt, ThumbDownAlt } from '@material-ui/icons';
import { User } from '../../store/user/types';

export interface ReviewItemProps {
  review: Review;
  addReviewVote: any;
  user: User;
}

export function ReviewItem(props: ReviewItemProps) {
  const classes = useStyles();
  const { review } = props;
  const { votes = [] } = review;
  const likesCount = votes.filter((v: Vote) => v.vote === Votes.LIKE).length;
  const dislikesCount = votes.length - likesCount;

  return (review && review.creator) ? (
    <Container className={classes.root}>
      <Avatar alt="Cindy Baker" src={review.creator.picture || ''} />
      <Container className={classes.info}>
        <Typography component='span' className={classes.name}>
          {review.creator.firstName} {review.creator.lastName}:
        </Typography>
        <Typography component='span'>
          {props.review.text}
        </Typography>
      </Container>
      <Box className={classes.likeButtons}>
        <Box className={classes.buttonWrapper}>
          <Typography component='span' className={classes.likesNumber}>
            {likesCount}
          </Typography>
          <IconButton
            onClick={() => props.addReviewVote(Votes.LIKE)}
            disabled={props.user?._id === review.creatorId}
          >
            <ThumbUpAlt />
          </IconButton>
          </Box>
        <Box className={classes.buttonWrapper}>
          <Typography component='span' className={classes.dislikesNumber}>
            {dislikesCount}
          </Typography>
          <IconButton
            onClick={() => props.addReviewVote(Votes.DISLIKE)}
            disabled={props.user?._id === review.creatorId}
          >
          <ThumbDownAlt />
        </IconButton>
          </Box>
      </Box>
    </Container>
  )
  : <></>;
} 