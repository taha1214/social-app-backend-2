const Blog = require("../models/blogModel")
const { uploadImage } = require("../storage")


const getAllBlogs = (req, res) => {
    Blog.find()
    .populate("author")
    .then((allBlogs) => {
        res.send({
            message: "fetched Blogs successfully",
            allBlogs,
        })
      })
        .catch((err) => {
            res.status(400).send({
                err: err.message,
                error: err,
            })
        })
    
}

const likeBlog = (req, res) => {
  const { id } = req.params;
  const userId = req.userId; // Assuming user authentication is set up

  console.log("Request parameters:", req.params);
  console.log("Request userId:", req.userId);

  // Find the blog post
  Blog.findById(id)
    .then(blog => {
      if (!blog) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      // Check if the user has already liked the blog
      if (blog.likedBy.includes(userId.toString())) {
        return res.status(400).json({ message: "You have already liked this post" });
      }

      // Increment like count and add user to likedBy
      blog.likes += 1;
      blog.likedBy.push(userId);

      return blog.save();
    })
    .then(updatedBlog => {
      res.status(200).json({ likes: updatedBlog.likes });
    })
    .catch(error => {
      console.error("Error updating like count:", error);
      res.status(500).json({ message: 'Error updating like count', error: error.message });
    });
};



    const getBlog = (req,res) => {
        const blogId = req.params.blogId
        Blog.findById(blogId)
        .then((blog)=>{
            if(blog){
                res.send({ blog })
            }else{
                res.status(400).send("blog not found")
                alert("blog not found")
            }
        })
        .catch((err)=>{
            res.status(400).send("err" ,err)
            message: err.message
        })

    }
    
    const createBlog = (req, res) => {
      const body = req.body;
      console.log("🚀 ~ body:", body);
      console.log("🚀 ~ createBlog ~ body:", req.file);
    
      uploadImage(req.file)
        .then((result) => {
          console.log("🚀 ~ .then ~ result:", result);
          const newBlog = new Blog({
            // title: body.title,
            description: body.description,
            // category: body.category,
            author: body.authorId,
            image: result.url,
          });
          newBlog
            .save()
            .then((response) => {
              if (response) {
                res.send({ message: "Blog created successfully", blog: response });
              } else {
                res.status(400).send({
                  message: "Something went wrong try again letter",
                  blog: null,
                });
              }
            })
            .catch((err) => {
              console.log("🚀 ~ .then ~ err =>>:", err);
              res.status(400).send({
                message: err?.message,
                error: err,
              });
            });
        })
        .catch((err) => {
          console.log("err =>", err);
          res.status(400).send({
            message: err?.message,
            error: err,
          });
        });
    };
    
    const updateBlog = (req, res) => {
      const body = req.body;
    
      console.log("🚀 ~ updateBlog ~ req.file:", req.file);
    
      if (req.file) {
        uploadImage(req.file)
          .then((result) => {
            console.log("🚀 ~ .then ~ result:", result);
            Blog.findByIdAndUpdate(body.id, {
              // title: body.title,
              description: body.description,
              image: result.url,
              // category: body.category,
            })
              .then((response) => {
                if (response) {
                  res.send({
                    message: "Blog updated successfully",
                    blog: body,
                  });
                } else {
                  res.status(400).send({
                    message: "Something went wrong try again letter",
                    blog: null,
                  });
                }
              })
              .catch((err) => {
                res.status(400).send({
                  message: err?.message,
                  error: err,
                });
              });
          })
          .catch((err) => {
            console.log("err =>", err);
            res.status(400).send({
              message: err?.message,
              error: err,
            });
          });
      } else {
        Blog.findByIdAndUpdate(body.id, {
          // title: body.title,
          description: body.description,
          // category: body.category,
        })
          .then((response) => {
            if (response) {
              res.send({
                message: "Blog updated successfully",
                blog: body,
              });
            } else {
              res.status(400).send({
                message: "Something went wrong try again letter",
                blog: null,
              });
            }
          })
          .catch((err) => {
            res.status(400).send({
              message: err?.message,
              error: err,
            });
          });
      }
    };
    

    const deleteBlog = (req, res) => {
        const  { id }  = req.params
        Blog.findByIdAndDelete(id)
        .then((deletedBLog) => {
            if(!deletedBLog){
                res.status(400).send({
                    message: "Blog not found"
                })
            }
            else{
                res.send({
                    message: "blog deleted successfully",
                    blog: deletedBLog,
                })
            }
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message,
                error: err,
            })
        })
    }

    

    module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog, getBlog, likeBlog }