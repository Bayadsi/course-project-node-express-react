const express = require('express');
const sendErrorResponse = require('./utils').sendErrorResponse;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');
const { getCourse } = require('../calls/getCourse');

const router = express.Router();
const coursesCollection = 'courses';
const reviewsCollection = 'reviews';
const votesCollection = 'votes';
const subscriptionsCollection = 'subscriptions';
const courseSuggestionsCollection = 'course-suggestions';

// Courses API Feature
router.get('/', async (req, res) => {
  try {
    const courses = await req.app.locals.db.collection(coursesCollection).aggregate([
      {
        $lookup:
        {
          from: subscriptionsCollection,
          localField: '_id',
          foreignField: 'courseId',
          as: 'subscriptions',
        }
      },
      {
        $lookup:
        {
          from: reviewsCollection,
          localField: '_id',
          foreignField: 'courseId',
          as: 'review',
        }
      },
      {
        $unwind: {
          path: '$review',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $lookup:
        {
          from: 'users',
          localField: 'review.creatorId',
          foreignField: '_id',
          as: 'review.creator',
        }
      },
      {
        $unwind: {
          path: '$review.creator',
          preserveNullAndEmptyArrays: true,
        }
      },
      {
        $group: {
          _id : "$_id",
          name: { $first: "$name" },
          category: { $first: "$category" },
          credits: { $first: "$credits" },
          createdTimeStamp: { $first: "$createdTimeStamp" },
          subscriptions: { $first: "$subscriptions" },
          reviews: { $push: "$review" }
        }
      },
    ]).toArray();
    res.json(courses);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
});

router.get('/:_id', async (req, res) => {
  const params = req.params;
  try {
    await indicative.validator.validate(params, { _id: 'required|regex:^[0-9a-f]{24}$' });
    const db = req.app.locals.db;
    const course = await getCourse(db, req.params._id);

    if (!course) {
      sendErrorResponse(req, res, 404, `Course with ID=${req.params._id} does not exist`);
      return;
    }
  
    res.json(course);
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid course data: ${errors.map(e => e.message).join(', ')}`, errors);
  }
});

router.post('/', async (req, res) => {
  const course = req.body;
  const { suggestionId } = course;
  delete course.suggestionId;

  try {
    await indicative.validator.validate(course, {
      name: 'required|string|max:80',
      tutors: 'array',
      category: 'required|in:M,P,TCS,MPCS',
      credits: 'required|number',
      description: 'required|max:500',
    });

    course.createdTimeStamp = new Date();
    course.lastModifiedTimestamp = new Date();
    try {
      const c = await req.app.locals.db.collection(coursesCollection).insertOne(course);
      if (c.result.ok && c.insertedCount === 1) {
        const c = await req.app.locals.db.collection(courseSuggestionsCollection).deleteOne({
          _id: new ObjectID(suggestionId)
        });
        course._id = c.insertedId;
        res.status(201).location(`/course/${course._id}`).json(course);
      } else {
        sendErrorResponse(req, res, 500, `Unable to create course: ${course._id}`);
      }
    } catch (err) {
      sendErrorResponse(req, res, 500, `Unable to create course : ${course._id}`, err);
    }
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid course data: ${errors.map(e => e.message).join(', ')}`, errors);
  }
});

router.post('/:_id/reviews', async (req, res) => {
  const review = req.body;
  try {
    await indicative.validator.validate(req.params, { _id: 'required|regex:^[0-9a-f]{24}$' });
    await indicative.validator.validate(review, {
      text: 'required|string',
    });
    const db = req.app.locals.db;
    const course = await getCourse(db, req.params._id);
    if (!course) {
      sendErrorResponse(req, res, 400, `Unable to create review, course with id: ${req.params._id} does not exist`);
    }

    review.createdTimeStamp = new Date();
    review.lastModifiedTimestamp = new Date();
    review.courseId = new ObjectID(req.params._id);
    review.creatorId = new ObjectID(review.creatorId);
    try {
      const c = await req.app.locals.db.collection(reviewsCollection).insertOne(review);
      if (c.result.ok && c.insertedCount === 1) {
        review._id = c.insertedId;
        const updatedCourse = await getCourse(db, req.params._id);
        res.status(201).location(`/courses/${course._id}/reviews/${review._id}`).json(updatedCourse);
      } else {
        sendErrorResponse(req, res, 500, `Unable to create review: ${review._id}`);
      }
    } catch (err) {
      sendErrorResponse(req, res, 500, `Unable to create review: ${review._id}`, err);
    }
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid review data: ${errors.map(e => e.message).join(', ')}`, errors);
  }
});


router.post('/:courseId/subscriptions', async (req, res) => {
  const { userId } = req.body;
  const { courseId } = req.params;
  try {
    await indicative.validator.validate(req.params, { courseId: 'required|regex:^[0-9a-f]{24}$' });
    await indicative.validator.validate(req.body, { userId: 'required|regex:^[0-9a-f]{24}$' });

    const db = req.app.locals.db;
    const course = await getCourse(db, courseId);
    if (!course) {
      sendErrorResponse(req, res, 400, `Unable to subscribe to course, course with id: ${courseId} does not exist`);
    }
    const subscription = {
      userId: new ObjectID(userId),
      courseId: new ObjectID(courseId),
      createdTimestamp: Date.now(),
    }
    try {
      const oldSubscription = await req.app.locals.db.collection(subscriptionsCollection).findOne({
        userId: new ObjectID(userId),
        courseId: new ObjectID(courseId),
      });
  
      if (oldSubscription) {
        const r = await req.app.locals.db.collection(subscriptionsCollection).deleteOne({
          _id: new ObjectID(oldSubscription._id)
        });
        const updatedCourse = await getCourse(db, courseId);
        res.status(201).json(updatedCourse);
      } else {
        const c = await req.app.locals.db.collection(subscriptionsCollection).insertOne(subscription);
        if (c.result.ok && c.insertedCount === 1) {
          subscription._id = c.insertedId;
          const updatedCourse = await getCourse(db, courseId);
          res.status(201).location(`/courses/${course._id}/subscriptions/${subscription._id}`).json(updatedCourse);
        } else {
          sendErrorResponse(req, res, 500, `Unable to create subscription: ${subscription._id}`);
        }
      }
    } catch (err) {
      sendErrorResponse(req, res, 500, `Unable to create subscription: ${subscription._id}`, err);
    }
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid subscription data: ${errors}`, errors);
  }
});

router.post('/:courseId/reviews/:reviewId/votes', async (req, res) => {
  const { vote, userId } = req.body;
  const { courseId, reviewId } = req.params;
  try {
    await indicative.validator.validate(req.params, {
      courseId: 'required|regex:^[0-9a-f]{24}$',
      reviewId: 'required|regex:^[0-9a-f]{24}$',
    });
    await indicative.validator.validate(req.body, {
      userId: 'required|regex:^[0-9a-f]{24}$',
      vote: 'required|in:like,dislike',
    });
  
    const review = await req.app.locals.db.collection(reviewsCollection).findOne({
      _id: new ObjectID(req.params.reviewId),
      courseId: new ObjectID(courseId),
    });

    if (!review) {
      sendErrorResponse(req, res, 400, `Unable to create review, course with id: ${req.params._id} does not exist`);
    }
    if (review.creatorId == userId) {
      sendErrorResponse(req, res, 400, `Unable to vote for your own review`);
    }

    const alreadyVoted = await req.app.locals.db.collection(votesCollection).findOne({
      userId: new ObjectID(userId),
      reviewId: new ObjectID(reviewId),
    });

    if (alreadyVoted) {
      if (alreadyVoted.vote == vote) {
        const r = await req.app.locals.db.collection(votesCollection).deleteOne({
          _id: new ObjectID(alreadyVoted._id)
        });
      } else {
        const r = await req.app.locals.db.collection(votesCollection).updateOne({
          _id: new ObjectID(alreadyVoted._id)
        }, { $set: { vote } });
      }
    } else {
      const voteObject = {
        createdTimeStamp: new Date(),
        userId: new ObjectID(userId),
        reviewId: new ObjectID(reviewId),
        vote,
      }

      try {
        const c = await req.app.locals.db.collection(votesCollection).insertOne(voteObject);
        if (c.result.ok && c.insertedCount === 1) {
          //nothing
        } else {
          sendErrorResponse(req, res, 500, `Unable to create review: ${reviewId}`);
        }
      } catch (err) {
        sendErrorResponse(req, res, 500, `Unable to create review: ${reviewId}`, err);
      }
    }
    
    const updatedCourse = await getCourse(req.app.locals.db, courseId);
    res.status(201).location(`/courses/${courseId}/reviews/${reviewId}/votes`).json(updatedCourse);
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid review data: ${errors}`, errors);
  }
});

router.delete('/:_id', async (req, res) => {
  const params = req.params;
  try {
    await indicative.validator.validate(params, { _id: 'required|regex:^[0-9a-f]{24}$' });
    const old = await req.app.locals.db.collection(coursesCollection).findOne({ _id: new ObjectID(params._id) });
    if (!old) {
      sendErrorResponse(req, res, 404, `Course with ID=${params._id} does not exist`);
      return;
    }
    const r = await req.app.locals.db.collection(coursesCollection).deleteOne({ _id: new ObjectID(params._id) });
    if (r.result.ok && r.deletedCount === 1) {
      res.send();
    } else {
      sendErrorResponse(req, res, 500, `Unable to delete course: ${old._id}: ${old.firstName} ${old.lastName}`);
    }
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid course data: ${errors.map(e => e.message).join(', ')}`, errors);
  }
});

module.exports = router;
