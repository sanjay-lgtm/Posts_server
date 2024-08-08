import express from 'express';
import { editProfile, followOrUnFollow, getProfile, getSuggestedUser, login, logout, register } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/profile/:id',isAuthenticated,getProfile);
router.post('/profile/edit',isAuthenticated,upload.single('profilePicture'),editProfile);
router.get('/suggested',isAuthenticated,getSuggestedUser);
router.get('/followorunfollow/:id',isAuthenticated,followOrUnFollow);


export default router;