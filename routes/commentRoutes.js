const express = require("express");
const {
  createComment,
  getAllComment
} = require("../controllers/commentController");

const router = express.Router();

router.post("/createComment", createComment);
router.get("/getAllComment", getAllComment);

module.exports = router;