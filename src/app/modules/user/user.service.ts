import userModel from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Register, Login } from './user.interface';

const registerUserService = async (data: Register) => {
  const existingUser = await userModel.findOne({ email: data.email });
  if (existingUser) {
    const error = new Error('Email is already registered');
    throw error;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await userModel.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });
  return newUser;
};

const loginUserService = async (data: Login) => {
  const user = await userModel.findOne({ email: data.email });
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error('Invalid credentials or User not found');
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'defaultSecret',
    {
      expiresIn: '1d',
    }
  );
  return { token };
};

export const userServices = {
  registerUserService,
  loginUserService,
};
