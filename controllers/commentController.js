const Comment = require("../models/commentModel")


const getAllComment = (req, res) => {
    Comment.find()
    .populate("author")
    .then((allComments) => {
        res.send({
            message: "fetched comments successfully",
            allComments,
        })
      })
        .catch((err) => {
            res.status(400).send({
                err: err.message,
                error: err,
            })
        })
    
}


const createComment = (req, res) => {
    const data = req.body;

const newComment = new Comment({
  comment : data.comment,
  author: data.authorId,
  blogId: data.blogId,
});
newComment
   .save()
   .then((response) => {
    res.send({message: "comment posted successfully", comment: response })
})
.catch((err)=>{
    res.status(400).send({message: "error! please try again", error: err })
})
}

module.exports = { getAllComment, createComment }
