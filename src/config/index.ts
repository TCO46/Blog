import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export default class Database {
	public async connect() {
		try {
			await mongoose.connect(String(process.env.MONGO_URI));
			console.log("connected to the mongoDB");
		} catch (err) {
			console.log("Connect failure");
		}
	}
}
