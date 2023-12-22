import express from "express";
const router = express.Router();

import postController from "../app/controllers/PostController";

router.get("/get/:id", postController.getPost);

router.get("/all", postController.getAllPosts);

router.post("/new", postController.newPost);

router.put("/update/:id", postController.updatePost);

router.delete("/delete/:id", postController.deletePost);

export default router;
