import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidation from './user.validation';

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = userValidation.parse(req.body);
    const user = await userServices.registerUserService(userData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      statusCode: 201,
      data: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error: any) {
    const statusCode =
      error.message === 'Email is already registered' ? 400 : 500;
    const errorMessage =
      statusCode === 400 ? 'Validation error' : 'Internal server error';

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      statusCode,
      error: { details: error.message },
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData = userValidation
      .pick({ email: true, password: true })
      .parse(req.body);
    const { token } = await userServices.loginUserService(loginData);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: { token },
    });
  } catch (error: any) {
    const statusCode =
      error.message === 'Invalid credentials or User not found' ? 401 : 500;
    const errorMessage =
      statusCode === 401 ? 'Authentication error' : 'Internal server error';

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      statusCode,
      error: { details: error.message },
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};

export const UserControllers = {
  registerUser,
  loginUser,
};
