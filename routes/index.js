import express from 'express';
import users from './users.js';
import posts from './post.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.render('login')
});

router.use('/users', users);
router.use('/post', posts)


export default router;