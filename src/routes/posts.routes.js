import { Router } from "express";
import { createPost, getAllPosts, getPostById, getPostsByUser, toggleLike } from "../controllers/posts.controllers.js";
import { authValidation } from "../middlewares/authValidation.middlewares.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import postSchemas from "../schemas/posts.schemas.js";
import validatePost from "../middlewares/posts.middleware.js";

const postsRouter = Router();

postsRouter.use(authValidation);
postsRouter.post("/new-post", validateSchema(postSchemas), createPost);
postsRouter.get("/posts", getAllPosts);
postsRouter.get("/users/:userId/posts", getPostsByUser);
postsRouter.get("/posts/:id", validatePost, getPostById);
postsRouter.post("/posts/:id", validatePost, toggleLike);

export default postsRouter;