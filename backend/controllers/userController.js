import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @async
 * @function authenticateUser
 * @desc Auth user & get token
 * - Route - POST /api/users/login
 * - access - Public
 * @param {Object} req - request object to get data from server
 * @param {Object} res - response object to send data to server
 * @category Backend
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export default authUser;
