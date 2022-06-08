##API 명세

> /routes/users

|     내용     | Method |    api    |                                 request                                 |           response           |
| :----------: | :----: | :-------: | :---------------------------------------------------------------------: | :--------------------------: |
|   회원가입   |  POST  |  /users   | **headers** : checkToken, **body** : nickname, password,confirmPassword |    (status, errorMessage)    |
|    로그인    |  POST  |   /auth   |                      **body** : nickname,password                       | (status,errorMessage), token |
| 내 정보 조회 |  GET   | /users/me |                                                                         |   **locals** : user, user    |

<br>

> /routes/posts

|      내용       | Method |       api       |                   request                    |                   response                   |
| :-------------: | :----: | :-------------: | :------------------------------------------: | :------------------------------------------: |
| posts 전체 조회 |  GET   |     /posts      |                                              |                    psots                     |
| posts 상세 조회 |  GET   | /posts/:postsId |             **params** : postsId             |                psots,comments                |
|   게시글 작성   |  POST  |     /psots      |           **body** : title, posts            |         **locals** : nickname, posts         |
|   게시글 수정   |  PUT   | /posts/:postsId | **params** : postsId,**body** : title, posts | **locals** : nickname, (status,errorMessage) |
|   게시글 삭제   | DELETE | /posts/:postsId |             **params** : postsId             | **locals** : nickname, (status,errorMessage) |

<br>

> /routes/comments

|   내용    | Method |             api             |                   request                    |                   response                   |
| :-------: | :----: | :-------------------------: | :------------------------------------------: | :------------------------------------------: |
| 댓글 작성 |  POST  |       /posts/:postsId       |  **body** : comments, **params** : postsId   |       **locals** : nickname, comments        |
| 댓글 수정 |  PUT   | /posts/comments/:commentsId | **body** : comments, **params** : commentsId | **locals** : nickname, (status,errorMessage) |
| 댓글 삭제 | DELETE | /posts/comments/:commentsId |           **params** : commentsId            | **locals** : nickname, (status,errorMessage) |
