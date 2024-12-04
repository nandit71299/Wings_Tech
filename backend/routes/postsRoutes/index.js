import express from "express";
import * as postController from "../../controllers/postsController.js";
import { authController } from "../../controllers/authController.js";

const router = express.Router();

router.post("/create", authController, postController.createPost);
router.put("/update/:id", authController, postController.updatePost);
router.get("/", postController.getAll);
router.get("/:id", postController.getPostById);
router.post("/add-comment/:postId/:userId", postController.addComment);

export default router;
