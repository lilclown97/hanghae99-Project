const express = require('express');
const connect = require('./schemas');
const app = express();
const port = 5000; 

connect();

const postsRouter = require('./routes/posts');

const requestMiddleware = (req, res, next) => {
    console.log('request URL:', req.originalUrl, '-', new Date());
    next();
};

app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleware);

app.use('/', [postsRouter]);

app.get('/', (req, res) => {
    res.send('Homework  - Post');
});

app.listen(port, () => {
    console.log(port, '포트');
});
