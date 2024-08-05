import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost
} from '../controllers/postController.js';

const router = express.Router();

// Create a new post
router.post('/posts', createPost);

// Get all posts
router.get('/posts', getAllPosts);

// Get a specific post by ID
router.get('/posts/:id', getPost);

// Update a post by ID
router.put('/posts/:id', updatePost);

// Delete a post by ID
router.delete('/posts/:id', deletePost);

export default router;
