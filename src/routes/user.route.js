const express = require('express')
const router = express.Router();
const { createNewUSer, getUser, getUserById, updateUser, deleteUser, login } = require("../controllers/userController");
const { checkToken } = require('../middlewares/token_validation')
const { userAuthorization } = require("../middlewares/authorization");


router.post('/', createNewUSer);
router.get('/', checkToken, getUser);
router.get('/:id', userAuthorization, getUserById);
router.patch('/', checkToken, updateUser);
router.delete('/', checkToken, deleteUser);
router.post('/login', login);


module.exports = router;