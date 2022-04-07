const postModel = require('../models/postModel');

exports.getPostList = (req, res) => {
    postModel.getPostsList((err, posts) => {
        if(err)
        res.send(err)
        console.log("All data fetched");
        res.send(posts)
    });
}

exports.getPostDataById = (req, res) => {
    postModel.getPostById(req.params.id,(err, posts) => {
        if(err)
        res.send(err)
        console.log("Data fetched by Id")
        res.send(posts)
    })
}

exports.addNewPostData = (req, res) => {
    const postReqData = new postModel(req.body);

    if(req.body.contructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({status:false, message: "Fill the all data"})
    }else{
        postModel.addNewPost(postReqData, (err, posts) => {
            if(err)
            res.send(err)
            console.log("Inserted Data")
            res.json({status:true, message: "Post Inserted Successfully", data: posts})
        })
    }
}

exports.updatePostData = (req, res) => {
    const PostReqData = new postModel(req.body);

    if(req.body.contructor === Object && Object.keys(req.body).length ===0){
        res.send(400).send({status:false, message: "Please fill the all data"})
    }else{
        postModel.updatePostQuery(req.params.id, PostReqData, (err, posts) => {
            if(err)
            res.send(err)
            console.log("Updated Post data", posts)
            res.json({status:true, message: "Updated the selected post"})
        })
    }
}

exports.deletePostData = (req, res) => {
    postModel.deletedPostQuery(req.params.id, (err, posts) => {
        if(err)
        res.send(err)
        console.log("Deleted Post", posts)
        res.json({status:true, message: "Post has been Deleted"})
    })
}