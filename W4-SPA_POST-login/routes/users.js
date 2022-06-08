const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Users = require('../schemas/users');
const authMiddleware = require('../middlewares/auth-middlewares');
const router = express.Router();

//회원가입 joi(완료)
const postUsersSchema = Joi.object({
  nickname: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.ref('password'),
});

//회원가입(로그인중 미구현)
router.post('/users', async (req, res) => {
  //로그인 중이면 에러 메세지
  const checkToken = req.headers['token'];

  if (checkToken.length) {
    res.status(401).send({
      errorMessage: '로그인 중임',
    });
    return;
  }

  try {
    const { nickname, password, confirmPassword } = await postUsersSchema.validateAsync(req.body);

    //비밀번호 검사
    if (password !== confirmPassword) {
      res.status(401).send({
        errorMessage: '패스워드 불일치',
      });
      return;
    }

    //닉네임 검사
    const userscheck = await Users.find({
      nickname: nickname,
    });
    if (userscheck.length) {
      res.status(401).send({
        errorMessage: '이미 가입된 닉네임.',
      });
      return;
    }

    //닉네임,비밀번호 동일여부
    if (nickname === password) {
      res.status(401).send({
        errorMessage: '아이디랑 비밀번호는 같을 수 없음.',
      });
      return;
    }

    const createdUsers = await Users.create({ nickname, password });
    res.json({ users: createdUsers });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      errorMessage: '형식이 올바르지 않음',
    });
  }
});

//로그인(로그인중 미구현)
router.post('/auth', async (req, res) => {
  const { nickname, password } = req.body;

  //로그인 중이면 에러메세지
  const checkToken = req.headers['token'];
  if (checkToken.length) {
    res.status(401).send({
      errorMessage: '로그인 중임',
    });
    return;
  }

  //db에 있는 닉네임인지 검사
  const user = await Users.findOne({ nickname, password }).exec();

  if (!user) {
    res.status(401).send({
      errorMessage: '닉네임 or 비밀번호 틀림',
    });
    return;
  }

  const token = jwt.sign({ userId: user.userId }, 'my-secret-key');
  res.send({
    token,
  });
});

//내 정보 조회(완료)
router.get('/users/me', authMiddleware, async (req, res) => {
  const { user } = res.locals;
  res.send({
    user,
  });
});

module.exports = router;
