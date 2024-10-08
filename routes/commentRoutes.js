import express from 'express';
import { addComment, updateComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/posts/:postId/comments', addComment);
router.put('/comments/:commentId', updateComment);
router.delete('/comments/:commentId', deleteComment);

export default router;
