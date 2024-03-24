import express from 'express'
import { updateGameHistory, getGameHistory } from '../controllers/gameController.js'
import authenticateToken from '../middleware/authenticateToken.js'
const router = express.Router()


router.post('/users/:username/history',authenticateToken,updateGameHistory)

router.get('/users/:username/history',authenticateToken, getGameHistory)

export default router