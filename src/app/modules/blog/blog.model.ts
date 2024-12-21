import { Schema, model } from 'mongoose';
import { Blog } from './blog.interface';

const blogSchema = new Schema<Blog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

const blogModel = model('Blog', blogSchema);

export default blogModel;
