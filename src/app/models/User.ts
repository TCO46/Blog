import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema(
	{
		username: { type: String, required: true },
		fullName: { type: String, required: true },
		password: { type: String, required: true },
		// refreshToken: { type: String, required: true },
		posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("User", User);
