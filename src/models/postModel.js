const dbconnection = require('../configs/dbConfig')

const Posts = function(posts){
    this.title = posts.title;
    this.postText = posts.postText;
    this.username = posts.username;
    this.status = posts.status;
    this.is_deleted = posts.is_deleted;
    this.createdAt =  new Date();
    this.updatedAt =  new Date();
}

Posts.getPostsList= (result) => {
    dbconnection.query("select * from posts where is_deleted = 0", (res, err) =>{
        if(err){
            console.log("Error while fetch data", err);
            result(null, err)
        }else{
            console.log("Post data has fetched");
            result(null, res)
        }
    })

}

Posts.getPostById = (id, result) => {
    dbconnection.query("select * from posts where id = ?", id, (res, err) => {
        if(err){
            console.log("Error while get data by id", err)
            result(null, err)
        }else{
            console.log("Data fetched by ID")
            result(null, res)
        }
    })
}

Posts.addNewPost = (postReqData, result) => {
    dbconnection.query("insert into posts SET ?", postReqData, (res, err) => {
        if(err){
            console.log("Error while insert", err)
            result(null, err)
        }else{
            console.log("Data inserted")
            result(null, res)
        }
    })
}


Posts.updatePostQuery = (id, postReqData, result) => {
    dbconnection.query("update posts SET ? where id = ?", [postReqData, id],
     (err, res) => {
        if(err){
            console.log("Error while updating the post", err);
            result(null, err)
        }else{
            console.log("Updating Post");
            result(null, res)
        }
    })
}

Posts.deletedPostQuery = (id, result) => {
    dbconnection.query("UPDATE posts SET is_deleted=? WHERE id = ?", [1, id], (err, res) => {
        if(err){
            console.log("Error while delete the data")
            result(null, err)
        }else{
            console.log("Deleted query excuted")
            result(null, res)
        }
    })
}

module.exports = Posts;