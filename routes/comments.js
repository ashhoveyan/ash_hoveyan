import express from 'express';
import commentController from '../controllers/commentController.js';
import checkToken from '../middlewares/checkToken.js'

const router = express.Router();

router.get('/commentsList', checkToken, commentController.getComments)
router.post('/createComment', checkToken, commentController.createComment)

router.get('/commentsByPostId/:postId', checkToken, commentController.getCommentsByPostId)

export default router;