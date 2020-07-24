const express = require('express');
const usersRouter = require('./routes/users');
const courseSuggestionsRouter = require('./routes/course-suggestions');
const coursesRouter = require('./routes/course');
const sendErrorResponse = require('./routes/utils').sendErrorResponse;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const db_name = 'review-it';

const app = express();
const port = 8080;

app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use('/api/users', usersRouter)
  .use('/api/course-suggestions', courseSuggestionsRouter)
  .use('/api/courses', coursesRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
})

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, con) {
  if (err) throw err;
  app.locals.db = con.db(db_name);
  console.log(`Connection established to ${db_name}.`);
  app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
});
