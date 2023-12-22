import express from "express";
const router = express.Router();

import commentController from "../app/controllers/CommentController";

router.post("/create/:id", commentController.newComment);

router.delete("/delete/:commentId/post/:postId", commentController.deleteComment);

export default router;
