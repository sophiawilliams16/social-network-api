const router = require('express').Router();

// Importing the functions from user controllers 
const {
    getUsers,
    getSingleUser,
    updateUser,
    createUser,
    deleteUser,
    addFriend
} = require('../../controllers/userController');

// Define which functions run based on the URL
//   /api/users 
router.route('/').get(getUsers).post(createUser);

//   /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//   /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend).delete();

//   /api/users/:userId/friends/:friendId 
router.route("/:userId/friends/:friendId").delete();

module.exports = router;