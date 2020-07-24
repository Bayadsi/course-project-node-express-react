const ObjectID = require('mongodb').ObjectID;

const coursesCollection = 'courses';
const reviewsCollection = 'reviews';
const subscriptionsCollection = 'subscriptions';

async function getCourse(db, courseId) {
  const course = await db.collection(coursesCollection).aggregate([
    {
      $match: { _id: new ObjectID(courseId) }
    },
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
      $lookup:
      {
        from: 'votes',
        localField: 'review._id',
        foreignField: 'reviewId',
        as: 'review.votes',
      }
    },
    {
      $group: {
        _id : "$_id",
        name: { $first: "$name" },
        tutors: { $first: "$tutors" },
        category: { $first: "$category" },
        description: { $first: "$description" },
        credits: { $first: "$credits" },
        createdTimeStamp: { $first: "$createdTimeStamp" },
        subscriptions: { $first: "$subscriptions" },
        reviews: { $push: "$review" }
      }
    },
  ]).toArray();
  if (!course) {
    return null;
  }
  return course[0];
}

module.exports = {
  getCourse
};
