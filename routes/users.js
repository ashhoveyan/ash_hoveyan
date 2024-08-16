import controller from '../controllers/usersControllers.js'
import checkToken from '../middlewares/checkToken.js'
import validate from '../middlewares/validate.js'
import userSchema from '../schemas/users.js'
import express from 'express'
const router = express.Router()



router.get('/registration', (req, res) => {
  res.render('registration')
})


router.post(
    '/registration',
    validate(userSchema.registration, 'body'),
    controller.registration
)

router.get('/login', (req, res) => {
  res.render('login')
})


router.post('/login', validate(userSchema.login, 'body'), controller.login)

router.get('/getUsersList', checkToken, controller.getUsersList)


router.get('/profile', (req, res) => {
  res.render('profile')
})
router.get('/profile/data', (req, res) => {
  res.render('usersList')
})
router.get('/updateUserProfile', (req, res) => {
  res.render('showUpdateUserProfile')
})



router.get('/getUsersList', checkToken, controller.getUsersList)
router.get('/getUserProfile', checkToken, controller.getUserProfile)
router.put(
    '/updateUserProfile',
    checkToken,
    validate(userSchema.register, 'body'),
    controller.updateUserProfile
)
router.delete('/deleteUser/:id', checkToken, controller.deleteUser)
export default router