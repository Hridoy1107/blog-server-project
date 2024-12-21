import { Request, Response } from 'express';
import { adminServices } from './admin.service';

const blockUser = async (req: Request, res: Response) => {
  try {
    const user = await adminServices.blockUserService(req.params.id);
    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      statusCode: 400,
      error: { details: error.message },
      stack: error.stack,
    });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    await adminServices.deleteBlogAdminService(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      statusCode: 400,
      error: { details: error.message },
      stack: error.stack,
    });
  }
};

export const adminControllers = {
  blockUser,
  deleteBlog,
};
