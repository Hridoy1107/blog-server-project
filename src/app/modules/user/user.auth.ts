import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from './user.model';

interface DecodedToken {
  id: string;
  role: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authentication token is missing or invalid',
        statusCode: 401,
        error: { details: 'No token provided or invalid token' },
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'defaultSecret'
    ) as DecodedToken;

    const user = await userModel.findById(decoded.id);
    if (!user || user.isBlocked) {
      res.status(403).json({
        success: false,
        message: 'Access denied',
        statusCode: 403,
        error: { details: 'User is blocked or not found' },
      });
    }

    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (error) {
    next(error);
  }
};

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Admin access required',
      statusCode: 403,
      error: { details: 'You are not authorized to access this resource' },
    });
  }
  next();
};
