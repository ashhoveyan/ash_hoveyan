import express from 'express';
import users from './users.js';
import posts from './post.js';
import comments from './comments.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.render('login')
});
// router.get('/', (req, res) => {
//     req.session.userId = Date.now()
//     console.log(1)
//     res.json({
//         message: req.session.userId,
//     })
// });


router.use('/users', users);
router.use('/post', posts)
router.use('/comments', comments);


export default router;