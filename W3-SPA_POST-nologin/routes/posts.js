const express = require('express');
const Posts = require('../schemas/posts');
const router = express.Router();

//post 전체 조회
router.get('/posts', async (req, res) => {
    const posts = await Posts.find({}, { _id: 0, postsId: 1, title: 1, name: 1, date: 1 }).sort({ date: -1 });

    res.json({
        posts,
    });
});

//post 상세 조회
router.get('/posts/:postsId', async (req, res) => {
    const { postsId } = req.params;

    const posts = await Posts.find(
        { postsId: Number(postsId) },
        { _id: 0, postsId: 1, title: 1, name: 1, date: 1, post: 1 }
    );

    res.json({
        posts,
    });
});

//게시글 작성
router.post('/posts', async (req, res) => {
    const { postsId, title, name, post, password } = req.body;

    const posts = await Posts.find({ postsId });
    if (posts.length) {
        return res.status(400).json({ success: false, errorMessage: '이미 존재하는 게시글 번호.' });
    }

    const createdPosts = await Posts.create({ postsId, title, name, post, password });

    res.json({ posts: createdPosts });
});

//게시글 수정
router.put('/posts/:postsId', async (req, res) => {
    const { postsId } = req.params;
    const { password } = req.body;
    const { title } = req.body;
    const { post } = req.body;

    const checkpassword = await Posts.findOne({ postsId: Number(postsId) });
    if (checkpassword['password'] === Number(password)) {
        await Posts.updateOne({ postsId: Number(postsId) }, { $set: { title, post } });
    } else {
        return res.status(400).json({ success: false, errorMessage: '비밀번호가 다릅니다.' });
    }

    res.json({ success: true });
});

//게시글 삭제
router.delete('/posts/:postsId', async (req, res) => {
    const { postsId } = req.params;
    const { password } = req.body;

    const checkpassword = await Posts.findOne({ postsId: Number(postsId) });
    if (checkpassword['password'] === Number(password)) {
        await Posts.deleteOne({ postsId: Number(postsId) });
    } else {
        return res.status(400).json({ success: false, errorMessage: '비밀번호가 다릅니다.' });
    }

    res.json({ success: true });
});

module.exports = router;
