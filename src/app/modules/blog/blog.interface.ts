import mongoose from 'mongoose';

export interface Blog {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBlog {
  title: string;
  content: string;
}

export interface UpdateBlog {
  title?: string;
  content?: string;
}
