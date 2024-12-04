import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [commentsSchema],
});

const Posts = mongoose.model("Posts", schema);
export default Posts;
