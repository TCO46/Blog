import { Express } from "express";
import userRouter from "./user";
import authRouter from "./auth";
import postRouter from "./post";

import AuthController from "../app/controllers/AuthController";

export function route(app: Express) {
	app.use("/api/*", AuthController.getUser);

	app.use("/api/user", userRouter);

	app.use("/api/auth", authRouter);

	app.use("/api/post", postRouter);
}
