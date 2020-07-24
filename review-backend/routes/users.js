const express = require('express');
const sendErrorResponse = require('./utils').sendErrorResponse;
const ObjectID = require('mongodb').ObjectID;
const indicative = require('indicative');

const router = express.Router();

// Users API Feature
router.get('/', async (req, res) => {
  try {
    const users = await req.app.locals.db.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
});

router.get('/:_id', async (req, res) => {
  const params = req.params;
  try {
    await indicative.validator.validate(params, { _id: 'required|regex:^[0-9a-f]{24}$' });
    const user = await req.app.locals.db.collection('users').findOne({ _id: new ObjectID(req.params._id) });
    if (!user) {
      sendErrorResponse(req, res, 404, `User with ID=${req.params._id} does not exist`);
      return;
    }
    res.json(user);
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
  }
});

router.post('/', async (req, res) => {
  const user = req.body;
  try {
    await indicative.validator.validate(user, {
      firstName: 'required|string',
      lastName: 'required|string',
      username: 'required|string|regex:([0-9a-zA-z])|max:15',
      password: 'required|string|min:8|regex:([0-9]+)|regex:([@$!%*#?&]+)',
      gender: 'required|in:Female,Male',
      role: 'required|in:User,Admin',
    });
    user.registerTimestamp = new Date();
    user.lastModifiedTimestamp = new Date();
    if (!user.description) {
      user.description = '';
    }
    if (!user.picture) {
      user.picture = user.gender === 'Male'
        ? "https://cdn4.iconfinder.com/data/icons/business-conceptual-part1-1/513/business-man-512.png"
        : "https://www.pngitem.com/pimgs/m/137-1370168_professional-clipart-female-avatar-circle-hd-png-download.png"
    }

    try {
      const usernameTaken = await req.app.locals.db.collection('users').findOne({ username: user.username });
      if (usernameTaken) {
        sendErrorResponse(req, res, 400, `Unable to create user with username: ${user.username}`);
        return;
      }

      const r = await req.app.locals.db.collection('users').insertOne(user);
      if (r.result.ok && r.insertedCount === 1) {
        user._id = r.insertedId;
        res.status(201).location(`/users/${user._id}`).json(user);
      } else {
        sendErrorResponse(req, res, 500, `Unable to create user: ${user._id}: ${user.firstName} ${user.lastName}`);
      }
    } catch (err) {
      console.error(err);
      
      sendErrorResponse(req, res, 500, `Unable to create user: ${user._id}: ${user.firstName} ${user.lastName}`, err);
    }
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
  }
});

router.post('/login', async (req, res) => {
  const credentials = req.body;
  try {
    const user = await req.app.locals.db.collection('users').findOne(credentials);
    if (user) res.json(user);
    else {
      sendErrorResponse(req, res, 400, `Incorrect email or password `);
    }
  } catch (e) {
    sendErrorResponse(req, res, 400, `Invalid user data:`);
  }
})

router.put('/:_id', async (req, res) => {
  const old = await req.app.locals.db.collection('users').findOne({ _id: new ObjectID(req.params._id) });
  if (!old) {
    sendErrorResponse(req, res, 404, `User with ID=${req.params.id} does not exist`);
    return;
  }
  const { _id, registerTimestamp, username, ...newData } = req.body;
  newData.lastModifiedTimestamp = new Date();
  if (old._id.toString() !== _id) {
    sendErrorResponse(req, res, 400, `User ID=${_id} does not match URL ID=${req.params._id}`);
    return;
  }
  if (username && username !== old.username) {
    sendErrorResponse(req, res, 400, `Cannot modify username for user with ID=${_id}`);
    return;
  }

  try {
    await indicative.validator.validate(newData, {
      firstName: 'string',
      lastName: 'string',
      password: 'string|min:8|regex:([0-9]+)|regex:([@$!%*#?&]+)',
      gender: 'in:Female,Male',
      role: 'in:User,Admin',
      picture: 'url',
    });
    try {
      r = await req.app.locals.db.collection('users').updateOne({ _id: new ObjectID(req.params._id) }, { $set: newData });
      if (r.result.ok) {
        if (r.modifiedCount === 0) {
          console.log(`The old and the new users are the same.`);
        }
        updatedUser = await req.app.locals.db.collection('users').findOne({ _id: new ObjectID(req.params._id) });

        res.json(updatedUser);
      } else {
        sendErrorResponse(req, res, 500, `Unable to update user: ${old.id}: ${old.firstName} ${old.lastName}`);
      }
    } catch (err) {
      sendErrorResponse(req, res, 500, `Unable to update user: ${old.id}: ${old.firstName} ${old.lastName}`, err);
    }
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
  }
});

router.delete('/:_id', async (req, res) => {
  const params = req.params;
  try {
    await indicative.validator.validate(params, { _id: 'required|regex:^[0-9a-f]{24}$' });
    const old = await req.app.locals.db.collection('users').findOne({ _id: new ObjectID(params._id) });
    if (!old) {
      sendErrorResponse(req, res, 404, `User with ID=${params._id} does not exist`);
      return;
    }
    const r = await req.app.locals.db.collection('users').deleteOne({ _id: new ObjectID(params._id) });
    if (r.result.ok && r.deletedCount === 1) {
      res.send();
    } else {
      sendErrorResponse(req, res, 500, `Unable to delete user: ${old._id}: ${old.firstName} ${old.lastName}`);
    }
  } catch (errors) {
    sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
  }
});

module.exports = router;
