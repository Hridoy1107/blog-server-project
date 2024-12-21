import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRoutes } from './app/modules/user/user.routes';
import { blogRoutes } from './app/modules/blog/blog.routes';
import { adminRoutes } from './app/modules/admin/admin.routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);

const getController = (req: Request, res: Response) => {
  res.send('Server is working');
};

app.get('/', getController);

export default app;
