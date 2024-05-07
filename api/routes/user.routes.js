import express from 'express'
import { updateUser,deleteUser,signout,getUsers,getUser } from '../controllers/user.controllers.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.put('/update/:userId',verifyToken,updateUser)

router.delete('/delete/:userId',verifyToken,deleteUser)

router.post('/signout',signout)

router.get('/getusers', verifyToken, getUsers);

router.get('/:userId',verifyToken,getUser)

export default router