const express = require('express');
const sendErrorResponse = require('./utils').sendErrorResponse;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');

const router = express.Router();
const collectionName = 'course-suggestions';

// Course Suggestions API Feature
router.get('/', async (req, res) => {
  try {
    const courseSuggestions = await req.app.locals.db.collection(collectionName).find().toArray();
    res.json(courseSuggestions);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
});


router.post('/', async (req, res) => {
  const courseSuggestion = req.body;
  try {
    await indicative.validator.validate(courseSuggestion, {
      name: 'string|max:80',
      tutors: 'array',
      category: 'in:M,P,TCS,MPCS',
      credits: 'number',
      description: 'max:500',
    });

    courseSuggestion.createdTimeStamp = new Date();
    courseSuggestion.lastModifiedTimestamp = new Date();
    courseSuggestion.creatorId = new ObjectID(courseSuggestion.creatorId);
    try {
      const user = await req.app.locals.db.collection('users').findOne({
        _id: new ObjectID(courseSuggestion.creatorId)
      });
      if (!user) {
        sendErrorResponse(req, res, 400, `Unable to create suggestion, user with id: ${courseSuggestion.creatorId} does not exist`);
      }
  
      const cs = await req.app.locals.db.collection(collectionName).insertOne(courseSuggestion);
      if (cs.result.ok && cs.insertedCount === 1) {
        user._id = cs.insertedId;
        res.status(201).location(`/course-suggestion/${courseSuggestion._id}`).json(courseSuggestion);
      } else {
        sendErrorResponse(req, res, 500, `Unable to create course suggestion: ${courseSuggestion._id}`);
      }
    } catch (err) {
      sendErrorResponse(req, res, 500, `Unable to create course suggestion: ${courseSuggestion._id}`, err);
    }
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid course suggestion data: ${errors.map(e => e.message).join(', ')}`, errors);
  }
});


router.delete('/:_id', async (req, res) => {
  const params = req.params;
  try {
    await indicative.validator.validate(params, { _id: 'required|regex:^[0-9a-f]{24}$' });
    const old = await req.app.locals.db.collection(collectionName).findOne({ _id: new ObjectID(params._id) });
    if (!old) {
      sendErrorResponse(req, res, 404, `Courses Suggestion with ID=${params._id} does not exist`);
      return;
    }
    const r = await req.app.locals.db.collection(collectionName).deleteOne({ _id: new ObjectID(params._id) });
    if (r.result.ok && r.deletedCount === 1) {
      res.send();
    } else {
      console.log(`Unable to delete course suggestion: ${old._id}: ${old.firstName} ${old.lastName}`);
      sendErrorResponse(req, res, 500, `Unable to delete course suggestion: ${old._id}: ${old.firstName} ${old.lastName}`);
    }
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid course suggestion data: ${errors.map(e => e.message).join(', ')}`, errors);
  }
});

module.exports = router;
