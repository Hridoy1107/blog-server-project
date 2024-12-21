import blogModel from './blog.model';
import { CreateBlog, UpdateBlog } from './blog.interface';

const createBlogService = async (data: CreateBlog, authorId: string) => {
  const newBlog = await blogModel.create({ ...data, author: authorId });
  const populatedBlog = await blogModel
    .findById(newBlog._id)
    .populate('author', 'name email');
  return populatedBlog;
};

const getBlogsService = async (query: {
  search: string;
  sortBy: string;
  sortOrder: string;
  filter?: string;
}) => {
  const { search, sortBy, sortOrder, filter } = query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryObject: any = {};

  if (search) {
    queryObject.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  if (filter) {
    queryObject.author = filter;
  }

  const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  const blogs = await blogModel
    .find(queryObject)
    .sort(sortOptions)
    .populate('author', 'name email');

  return blogs;
};

const updateBlogService = async (
  blogId: string,
  data: UpdateBlog,
  authorId: string
) => {
  const blog = await blogModel
    .findOneAndUpdate({ _id: blogId, author: authorId }, data, { new: true })
    .populate('author', 'name email');
  if (!blog) throw new Error('Blog not found');
  return blog;
};

const deleteBlogService = async (blogId: string, authorId: string) => {
  const blog = await blogModel.findOneAndDelete({
    _id: blogId,
    author: authorId,
  });
  if (!blog) throw new Error('Blog not found');
  return blog;
};

export const blogServices = {
  createBlogService,
  getBlogsService,
  updateBlogService,
  deleteBlogService,
};
