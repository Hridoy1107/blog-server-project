import { Request, Response } from 'express';
import { blogServices } from './blog.service';
import blogValidation from './blog.validation';

const formatErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  details: any = null,
  stack: any = null
) => {
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: { details },
    stack: stack || undefined,
  });
};

const createBlog = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return formatErrorResponse(
        res,
        401,
        'Authentication required. Please log in.'
      );
    }

    const validationResult = blogValidation
      .omit({ author: true })
      .safeParse(req.body);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      formatErrorResponse(
        res,
        400,
        'Validation failed. Please correct the errors and try again.',
        formattedErrors
      );
    }

    const blog = await blogServices.createBlogService(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      500,
      'Failed to create blog',
      error.message,
      error.stack
    );
  }
};

const getBlogs = async (req: Request, res: Response) => {
  try {
    const {
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      filter,
    } = req.query;

    const queryOptions = {
      search: search.toString(),
      sortBy: sortBy.toString(),
      sortOrder: sortOrder.toString(),
      filter: filter?.toString(),
    };

    const blogs = await blogServices.getBlogsService(queryOptions);
    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      data: blogs,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      500,
      'Internal server error',
      error.message,
      error.stack
    );
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return formatErrorResponse(
        res,
        401,
        'Authentication required. Please log in.'
      );
    }

    const validationResult = blogValidation.partial().safeParse(req.body);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return formatErrorResponse(
        res,
        400,
        'Validation failed. Please correct the errors and try again.',
        formattedErrors
      );
    }

    const blog = await blogServices.updateBlogService(
      req.params.id,
      req.body,
      req.user.id
    );
    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      404,
      'Blog not found or validation error',
      error.message,
      error.stack
    );
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return formatErrorResponse(
        res,
        401,
        'Authentication required. Please log in.'
      );
    }

    await blogServices.deleteBlogService(req.params.id, req.user.id);
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    formatErrorResponse(res, 404, 'Blog not found', error.message, error.stack);
  }
};

export const blogControllers = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
};
