const express = require("express");
const authRoute = require("./authRoutes");
const blogRoute = require("./blogRoutes")
const commentRoute = require("./commentRoutes")


const router = express.Router();

router.use("/auth", authRoute);
router.use("/blog", blogRoute );
router.use("/comment", commentRoute);

module.exports = router;
