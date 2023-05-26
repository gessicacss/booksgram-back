import { Router } from "express";
import authRouter from "./auth.routes.js";
import postsRouter from "./posts.routes.js";
import userRoutes from "./users.routes.js";

const router = Router();
router.use(authRouter);
router.use(postsRouter);
router.use(userRoutes);
export default router;