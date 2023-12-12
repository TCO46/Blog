import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
		isPublished: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Post", Post);
