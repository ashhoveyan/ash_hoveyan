import controllers from '../controllers/postsController.js'
import checkToken from '../middlewares/checkToken.js'
import validate from '../middlewares/validate.js'
import postSchema from '../schemas/posts.js'
import { Router } from 'express'
let router = Router()

router.get('/createPost', (req, res) => {
    res.render('createPost')
})
router.get('/showGetPosts', (req, res) => {
    res.render('showGetPosts')
})
router.get('/showGetSinglePost', (req, res) => {
    res.render('showGetSinglePost')
})
router.get('/updateUserPost', (req, res) => {
    res.render('showUpdateUserPost')
})


router.post('/createPost', validate(postSchema.create, 'body'), checkToken, controllers.createPost)

router.get('/getPosts', checkToken, controllers.getPosts)
router.get('/getSinglePost', checkToken, controllers.getSinglePost)
router.put('/updatePost', checkToken, controllers.updatePost)
router.delete('/deletePost/:id', controllers.deletePost)
export default router