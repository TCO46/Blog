import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";
import { UserTyping } from "../../typings/User";

class UserController {
	getAllUsers(req: Request, res: Response, next: NextFunction) {
		if (!req.user) return res.status(401).send("Unauthorized");
		// await User.find({}, (err: any, users: UserTyping)
		UserModel.find({})
			.select("username fullName _id ")
			.populate("posts")
			.then((users) => {
				res.json(users);
			})
			.catch(next);
	}
}

export default new UserController();
