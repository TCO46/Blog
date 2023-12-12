import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";
import { UserTyping } from "../../typings/User";

class UserController {
	async getAllUsers(req: Request, res: Response, next: NextFunction) {
		// await User.find({}, (err: any, users: UserTyping)
		await UserModel.find({})
			.select("username fullName _id ")
			.populate("posts")
			.then((users) => {
				res.json(users);
			})
			.catch(next);
	}
}

export default new UserController();
