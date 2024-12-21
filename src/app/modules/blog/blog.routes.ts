import express from 'express';
import { blogControllers } from './blog.controller';
import { authenticateUser } from '../user/user.auth';

const router = express.Router();

router.post('/', authenticateUser, blogControllers.createBlog);
router.get('/', blogControllers.getBlogs);
router.patch('/:id', authenticateUser, blogControllers.updateBlog);
router.delete('/:id', authenticateUser, blogControllers.deleteBlog);

export const blogRoutes = router;
