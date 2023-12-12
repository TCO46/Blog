import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema(
	{
		content: { type: String, required: true },
		sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Comment", Comment);
