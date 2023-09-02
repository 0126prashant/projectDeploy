const { Router } = require('express');
const { authAdmin } = require('../middlewares/authAdmin.middleware');
const {
  getPostsforAdmin,
  deletePostforAdmin,
  getUsersforAdmin,
  updateUserforAdmin,
  deleteUserforAdmin,
  getDeletedPostsforAdmin
} = require('../controllers/admin.cotrollers');

const adminRouter = Router();

// Users routes for admin
adminRouter.get('/users/:userID?', getUsersforAdmin);
adminRouter.patch('/users/update/:userID', authAdmin, updateUserforAdmin);
adminRouter.delete('/users/remove/:userID', deleteUserforAdmin);

// Posts routes for admin
adminRouter.get('/posts/:userID?', getPostsforAdmin);
adminRouter.delete('/posts/delete/:postID', deletePostforAdmin);
adminRouter.get('/deletedPosts', getDeletedPostsforAdmin);

module.exports = { adminRouter };
