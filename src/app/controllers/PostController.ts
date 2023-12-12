import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";
import PostModel from "../models/Post";
import CommentModel from "../models/Comment";
import { UserTyping } from "../../typings/User";

class PostController {
	async getAllPosts(req: Request, res: Response, next: NextFunction) {
		if (!req.user) return res.status(401).send("Unauthorized");

		await PostModel.find({ isPublished: true })
			.populate("author", "username fullName _id ")
			.populate({
				path: "comments",
				populate: {
					path: "sender",
					select: "username fullName _id",
				},
			})
			.then((posts) => {
				res.json(posts);
			})
			.catch(next);
	}

	async getPost(req: Request, res: Response, next: NextFunction) {
		if (!req.user) return res.status(401).send("Unauthorized");

		await PostModel.findOne({ _id: req.params.id, isPublished: true })
			.populate("author", "username fullName _id ")
			.populate({
				path: "comments",
				populate: {
					path: "sender",
					select: "username fullName _id",
				},
			})
			.then((post) => {
				res.json(post);
			})
			.catch(next);
	}

	async newPost(req: Request, res: Response, next: NextFunction) {
		if (!req.user) return res.status(401).send("Unauthorized");

		const post = new PostModel({
			title: req.body.title,
			content: req.body.content,
			author: req.user.id,
		});

		await post
			.save()
			.then(() => {
				res.send("Post created");
			})
			.catch(next);

		const User: UserTyping | null = await UserModel.findById(req.user.id);

		if (User) {
			User.posts = [String(post._id)];
			await UserModel.updateOne({ _id: User._id }, User);
		}
	}

	async updatePost(req: Request, res: Response, next: NextFunction) {
		if (!req.user) return res.status(401).send("Unauthorized");

		const post = await PostModel.findById(req.params.id);

		if (String(post?.author) !== String(req.user.id)) return res.status(401).send("Unauthorized");

		await PostModel.updateOne({ _id: req.params.id }, req.body)
			.then(() => {
				res.send("Post updated");
			})
			.catch(next);
	}

	async deletePost(req: Request, res: Response, next: NextFunction) {
		if (!req.user) return res.status(401).send("Unauthorized");

		const post = await PostModel.findById(req.params.id);

		if (String(post?.author) !== String(req.user.id)) return res.status(401).send("Unauthorized");

		await PostModel.deleteOne({ _id: req.params.id });
	}

	async newComment(req: Request, res: Response, next: NextFunction) {
		if (!req.user) return res.status(401).send("Unauthorized");

		const comment = new CommentModel({
			content: req.body.content,
			sender: req.user.id,
		});

		await comment
			.save()
			.then((comment) => {
				PostModel.updateOne({ _id: req.params.id }, { $push: { comments: comment._id } })
					.then(() => {
						res.send("Comment created");
					})
					.catch(next);
			})
			.catch(next);
	}

	async deleteComment(req: Request, res: Response, next: NextFunction) {
		if (!req.user) return res.status(401).send("Unauthorized");

		const comment = await CommentModel.findById(req.params.id);

		if (String(comment?.sender) !== String(req.user.id)) return res.status(401).send("Unauthorized");

		await CommentModel.deleteOne({ _id: req.params.id });
	}
}

export default new PostController();
