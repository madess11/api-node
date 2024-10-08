import express from 'express';
import { createPost, getPosts, updatePost, deletePost, unlikePost, likePost } from '../controllers/postController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

router.post('/:id/like', protect, likePost); 
router.post('/:id/unlike', protect, unlikePost);

export default router;
