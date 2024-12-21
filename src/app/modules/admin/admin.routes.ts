import express from 'express';
import { adminControllers } from './admin.controller';
import { authenticateUser, authenticateAdmin } from '../user/user.auth';

const router = express.Router();

router.patch(
  '/users/:id/block',
  authenticateUser,
  authenticateAdmin,
  adminControllers.blockUser
);
router.delete(
  '/blogs/:id',
  authenticateUser,
  authenticateAdmin,
  adminControllers.deleteBlog
);

export const adminRoutes = router;
