import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar,userSearch } from '../controllers/user.controllers.js';

const router=express.Router()

router.get('/',protectRoute,getUsersForSidebar)
router.get('/search/:term?',protectRoute,userSearch)

export default router;