const express = require('express')
const router = express.Router();
const { createNewUSer, getUser, getUserById, updateUser, deleteUser, login } = require("../controllers/userController");
const { checkToken } = require('../middlewares/token_validation')


router.post('/', checkToken, createNewUSer);
router.get('/', checkToken, getUser);
router.get('/:id', checkToken, getUserById);
router.patch('/', checkToken, updateUser);
router.delete('/', checkToken, deleteUser);
router.post('/login', login);


module.exports = router;