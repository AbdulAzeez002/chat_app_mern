import express from 'express'
import { getMessages, sendMessage,updateUnreadCount } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router=express.Router()

router.post('/send/:id',protectRoute,sendMessage)
router.get('/:id',protectRoute,getMessages)
router.post('/updateCount/:id',protectRoute,updateUnreadCount)

export default router;