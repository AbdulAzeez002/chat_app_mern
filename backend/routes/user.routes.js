import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar,userSearch,getUserDetails } from '../controllers/user.controllers.js';

const router=express.Router()

router.get('/',protectRoute,getUsersForSidebar)
router.get('/search/:term?',protectRoute,userSearch)
router.get('/:id',protectRoute,getUserDetails)

export default router;