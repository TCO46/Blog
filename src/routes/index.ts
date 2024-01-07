import { Express } from "express";
import authRouter from "./api/auth";
import commentRouter from "./api/comment";
import postRouter from "./api/post";
import userRouter from "./api/user";

import homeRouter from "./pages/home";

import AuthController from "../app/controllers/AuthController";

export function route(app: Express) {
	app.use("/api/*", AuthController.getUser);

	app.use("/api/user", userRouter);

	app.use("/api/auth", authRouter);

	app.use("/api/post", postRouter);

	app.use("/api/comment", commentRouter);

	app.use("/home", homeRouter);
}
