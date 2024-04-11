import express from 'express'
import { updateuser } from '../controllers/user.controllers.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.put('/update/:userId',verifyToken,updateuser)


export default router