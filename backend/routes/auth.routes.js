import express from 'express'
import { loginUser, logout, singupUser } from '../controllers/auth.controllers.js';

const router=express.Router();

router.post('/login',loginUser)
router.post('/signup',singupUser)
router.post('/logout',logout)
export default router;