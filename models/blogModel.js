const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          // required: true,
        },
        description: {
          type: String,
          required: true,
        },
        image: String,
        // category: String,
        author: { type: mongoose.Types.ObjectId, ref: "user" 
        },
        likes: { type: Number, default: 0 },
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
      },
     
      {
        timestamps: true,
      },
    );

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;