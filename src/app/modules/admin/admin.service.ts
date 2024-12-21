import userModel from '../user/user.model';
import blogModel from '../blog/blog.model';

const blockUserService = async (userId: string) => {
  const user = await userModel.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true }
  );
  if (!user) {
    const error = new Error('User not found');
    throw error;
  }
  return user;
};

const deleteBlogAdminService = async (blogId: string) => {
  const blog = await blogModel.findByIdAndDelete(blogId);
  if (!blog) throw new Error('Blog not found');
  return blog;
};

export const adminServices = {
  blockUserService,
  deleteBlogAdminService,
};
