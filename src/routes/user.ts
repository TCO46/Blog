import express from "express";
const router = express.Router();

import userController from "../app/controllers/UserController";

// router.get('/', async (req, res) => {
//     await User.find({})
// 			.then((users) => {
// 				res.json(users);
// 			})
// });

router.get("/all", userController.getAllUsers);

export default router;
