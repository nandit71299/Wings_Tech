import userRoutes from "./userRoutes/index.js";
import postsRoutes from "./postsRoutes/index.js";
import express from "express";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/posts", postsRoutes);

export default router;
