const express = require('express');
const Comments = require('../schemas/comments');
const authMiddleware = require('../middlewares/auth-middlewares');
const router = express.Router();

//댓글 작성(완료)
router.post('/posts/:postsId', authMiddleware, async (req, res) => {
  const { nickname } = res.locals.user;
  const { comments } = req.body;
  const { postsId } = req.params;

  if (comments === '') {
    res.status(400).send({
      errorMessage: '글을 써..',
    });
    return;
  }
  const maxCommentsId = await Comments.findOne().sort('-commentsId').exec();
  let commentsId = 1;

  if (maxCommentsId) {
    commentsId = maxCommentsId.commentsId + 1;
  }

  const createdComments = await Comments.create({ postsId, commentsId, nickname, comments });

  res.json({ comments: createdComments });
});

//댓글 수정(완료)
router.put('/posts/comments/:commentsId', authMiddleware, async (req, res) => {
  const { nickname } = res.locals.user;
  const { commentsId } = req.params;
  const { comments } = req.body;

  //토큰값 nickname이랑 글을 쓴 nickname 비교 - nickname은 unique
  const checkNickname = await Comments.findOne({ commentsId: Number(commentsId) });
  if (checkNickname['nickname'] !== nickname) {
    res.status(400).send({
      errorMessage: '너가 쓴 댓글 아니야',
    });
    return;
  }

  await Comments.updateOne({ commentsId: Number(commentsId) }, { $set: { comments } });

  res.json({ success: true });
});

//댓글 삭제(완료)
router.delete('/posts/comments/:commentsId', authMiddleware, async (req, res) => {
  const { nickname } = res.locals.user;
  const { commentsId } = req.params;

  //토큰값 nickname이랑 글을 쓴 nickname 비교 - nickname은 unique
  const checkNickname = await Comments.findOne({ commentsId: Number(commentsId) });
  if (checkNickname['nickname'] !== nickname) {
    res.status(400).send({
      errorMessage: '너가 쓴 댓글 아니야',
    });
    return;
  }

  await Comments.deleteOne({ commentsId: Number(commentsId) });

  res.json({ success: true });
});

module.exports = router;
