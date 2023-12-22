import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";
import PostModel from "../models/Post";
import CommentModel from "../models/Comment";

class CommentController {
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

		const comment = await CommentModel.findById(req.params.commentId);

		if (String(comment?.sender) !== String(req.user.id)) return res.status(401).send("Unauthorized");

		await CommentModel.deleteOne({ _id: req.params.commentId });
		await PostModel.updateOne({ _id: req.params.postId }, { $pull: { comments: req.params.commentId } })
			.then(() => {
				res.send("Comment deleted");
			})
			.catch(next);
	}
}

export default new CommentController();
