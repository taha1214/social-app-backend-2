const express = require("express");
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlog,
  likeBlog
} = require("../controllers/blogController");

const upload = require("../multer-config.js");

const router = express.Router();


router.post("/createBlog", upload.single("image"), createBlog);
router.put("/updateBlog", upload.single("image"), updateBlog);
router.get("/getAllBlogs", getAllBlogs);
router.delete("/deleteBlog/:id", deleteBlog);
router.get("/getBlog/:blogId", getBlog);
router.post("/likeBlog/:id", likeBlog);


module.exports = router;
