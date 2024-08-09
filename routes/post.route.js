import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import upload from '../middlewares/multer.js';
import { addComment, addNewPost, bookMarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from '../controllers/post.controller.js';
const router = express.Router();

router.post('/addpost', isAuthenticated, upload.single('image'), addNewPost);
router.get('/all', isAuthenticated, getAllPost);
router.get('/userpost/all', isAuthenticated, getUserPost)
router.get('like/:id', isAuthenticated, likePost);
router.get('/dislike/:id', isAuthenticated, dislikePost);
router.post('/comment/:id', isAuthenticated, addComment);
router.post('/comment/all/:id', isAuthenticated, getCommentsOfPost);
router.post('/delete/:id', isAuthenticated, deletePost);
router.post('bookmark/:id',isAuthenticated,bookMarkPost);

export default router;