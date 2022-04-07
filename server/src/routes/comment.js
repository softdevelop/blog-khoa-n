const express = require('express');
const router = express.Router();
const CommentController = require("../controllers/CommentController.js");

router.post("/create", async (req, res) => {
    CommentController.create(req, res);
})

router.get("/", async (req, res) => {
    CommentController.getAllComments(req, res);
})

router.get("/:id", async (req, res) => {
    CommentController.getCommentById(req, res);
})

router.put("/edit/:id", async (req, res) => {
    CommentController.updateComment(req, res);
})

router.post("/post/:id", async (req, res) => {
    CommentController.commentPost(req, res);
})

router.post("/comment/:id", async (req, res) => {
    CommentController.commentToComment(req, res);
})

router.put("/like/:id", async (req, res) => {
    CommentController.like(req, res);
})

router.delete("/:id", async (req, res) => {
    CommentController.deleteComment(req, res);
})

module.exports = router;
