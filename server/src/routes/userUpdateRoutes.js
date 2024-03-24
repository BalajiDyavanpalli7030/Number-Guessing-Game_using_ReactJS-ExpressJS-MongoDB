import express from "express"

import authenticateToken from "../middleware/authenticateToken.js"
import { fullUserUpdate, partialUserUpdate,deleteUser } from '../controllers/userUpdateController.js'
const router = express.Router()

router.put('/users/:username',authenticateToken,fullUserUpdate)
router.patch('/users/:username',authenticateToken,partialUserUpdate)
router.delete('/users/:username',authenticateToken,deleteUser)

export default router