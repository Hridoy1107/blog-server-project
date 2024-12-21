import { Schema, model } from 'mongoose';
import { User } from './user.interface';

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

const userModel = model('User', userSchema);

export default userModel;
