# Blogs Server Project

- Live link: https://blog-server-virid.vercel.app/
- Admin info [ email: admin@me.com, password: adminpassword]

A brief description of what my project operations, features and how to set up locally

- Operations

---

- User Operations

Start point: `/api/users`

1. Register User

   - Endpoint: POST /register
   - Description: Register a new user.
   - Controller: UserControllers.registerUser`

2. Login User
   - Endpoint: POST /login
   - Description: Authenticate a user and return a token.
   - Controller: UserControllers.loginUser

---

- Blog Operations

Start point: `/api/blogs`

1. Create Blog

   - Endpoint: POST /
   - Description: Create a new blog post.
   - Controller: blogControllers.createBlog

2. Get All Blogs

   - Endpoint: GET /
   - Description: Retrieve all blog posts with optional search and filters.
   - Controller: blogControllers.getBlogs

3. Update Blog by ID

   - Endpoint: PATCH /:id
   - Description: Update the details of a blog post by its ID.
   - Controller: blogControllers.updateBlog

4. Delete Blog by ID
   - Endpoint: DELETE /:id
   - description: Delete a blog post by its ID.
   - Controller: blogControllers.deleteBlog

---

- Admin Operations

Start point: `/api/admin`

- User Management

1. Block User
   - Endpoint: PATCH /users/:id/block
   - Description: Block a user account.
   - Controller: `adminControllers.blockUser`

- Blog Management

2. Delete Blog
   - Endpoint: DELETE /blogs/:id
   - Description: Delete any blog post (admin-only operation).
   - Controller: adminControllers.deleteBlog

- Features

1.  Production Server: Start the application in production mode.
2.  Development Server: Start the application in development mode with automatic restarts on code changes.
3.  Build: Compile TypeScript files into JavaScript.
4.  Linting: Enforce code quality and consistency using ESLint.
5.  Prettier: Format code automatically for better readability and consistency.
6.  Testing: Placeholder for test command (if any tests are to be added).
7.  User experience: As a user, you can easily register, log in, and access your blogs. You can create, update, and delete your own blog posts, while also viewing a list of all blogs. Access to features is secured with authentication, ensuring only authorized users can perform actions.
8.  Admin experience: As an admin, you have additional privileges to manage users and content. You can block users and delete any blog post from the system, ensuring proper content management and user control. All admin actions are protected by role-based access control for security.

- Technologies Used

1.  Node.js: Server-side JavaScript runtime.
2.  TypeScript: For type safety and modern JavaScript features.
3.  ESLint: Linting tool to enforce code style.
4.  Prettier: Code formatter for maintaining consistency.
5.  Authentication: JWT is used to maintain security.

- Setup Instructions
  Follow these steps to set up the project locally:

1. Clone the repository
   git clone <repository-url>
   cd <project-directory>
2. Install Dependencies
   Run the following command to install all necessary dependencies:
   npm install
