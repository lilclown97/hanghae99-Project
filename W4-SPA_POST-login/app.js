const express = require('express');
const connect = require('./schemas');
const app = express();
const port = 5050;

connect();

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const requestMiddleware = (req, res, next) => {
  console.log('request URL:', req.originalUrl, '-', new Date());
  next();
};

app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleware);

app.use('/', [postsRouter, usersRouter, commentsRouter]);

app.get('/', (req, res) => {
  res.send('Homework  - Post/login/comment');
});

app.listen(port, () => {
  console.log(port, '포트');
});
