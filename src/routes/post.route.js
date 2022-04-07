const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')

// get all posts
router.get('/', postController.getPostList);

// get Post by ID
router.get('/:id', postController.getPostDataById);

// insert new data
router.post('/', postController.addNewPostData)

// Update the data
router.put('/:id', postController.updatePostData)

// Delete the data
router.delete('/:id', postController.deletePostData)

module.exports = router;