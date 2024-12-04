import express from "express";
import User from "../models/userModel.js";
import Posts from "../models/postsModel.js";

export const createPost = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(401).json({
        success: false,
        message: "Please provide post title and content.",
      });
    }

    const findUser = await User.findOne({ email: user.email });

    if (!findUser) {
      return res
        .status(401)
        .json({ success: false, message: "User not found." });
    }
    console.log(findUser._id);
    const newPost = new Posts({ title, content, userId: findUser._id });
    await newPost.save();
    res.status(201).json({ success: true, newPost });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const user = req.user;

    if (!user.email) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }
    const id = req.params;
    if (!id) {
      return res
        .status(401)
        .json({ success: false, message: "Post not found." });
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(401).json({
        success: false,
        message: "Please provide post title and content.",
      });
    }

    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.status(200).json({ success: true, message: "Post updated.", post });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

export const getPostById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide post id." });
    }
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    console.log(postId, userId);
    if (!postId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide required data." });
    }

    const post = await Posts.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const { comment } = req.body;
    if (!comment) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide comment." });
    }
    post.comments.push({ postId, userId, comment });

    await post.save();
    res.status(201).json({ success: true, message: "Comment added.", post });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};
