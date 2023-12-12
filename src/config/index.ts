import mongoose from "mongoose";

export default class Database {
	public async connect() {
		try {
			await mongoose.connect("mongodb://localhost:27017/blog");
			console.log("connected to the mongoDB");
		} catch (err) {
			console.log("Connect failure");
		}
	}
}
