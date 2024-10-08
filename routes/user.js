const express = require('express');
const { register, updateUser, deleteUser, getAllUsers, searchUsers } = require('../controller/user')

const router = express.Router();

// router.post('/adduser', register);
// router.patch('/updateuser', updateUser);
router.delete('/deleteuser', deleteUser);
router.get('/getusers', getAllUsers);
router.post('/search', searchUsers);

module.exports = router;