import express from 'express';
import users from './users.js';
import posts from './post.js';
const router = express.Router();

router.use('/users', users);
router.use('/post', posts)


export default router;