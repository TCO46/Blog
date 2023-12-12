import * as dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserTyping } from "../../typings/User";

class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		if (req.user) return res.status(400).json({ message: "User already logged in" });

		let User: UserTyping | null = await UserModel.findOne({ username: req.body.username }).lean();

		if (!User) return res.status(400).json({ message: "User not found" });

		try {
			if (await bcrypt.compare(req.body.password, User.password)) {
				const token = jwt.sign({ username: User.username, id: User._id }, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: "1h" });
				const refreshToken = jwt.sign({ username: User.username, id: User._id }, String(process.env.REFRESH_TOKEN_SECRET), { expiresIn: "7d" });

				// User.refreshToken = refreshToken;
				// await UserModel.updateOne({ _id: User._id }, User);

				return res.status(200).json({ status: "Logged in", token: token, refreshToken: refreshToken, user: User });
			}
		} catch (err) {
			next(err);
		}
	}

	async register(req: Request, res: Response, next: NextFunction) {
		if (req.user) return res.status(400).json({ message: "User already logged in" });

		let User: UserTyping | null = await UserModel.findOne({ username: req.body.username }).lean();

		if (User) return res.status(400).json({ message: "User already exists" });

		try {
			const user = new UserModel({
				username: req.body.username,
				fullName: req.body.fullName,
				password: req.body.password,
			});
			await user.save();
			res.send("User registered");
		} catch (err) {
			next(err);
		}
	}

	getUser(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];

		if (!authHeader || !token) return next();

		jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err: any, user: any) => {
			if (err) return next(err);

			req.user = user;
			next();
		});
	}
}

export default new AuthController();
