import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middlewares.js";
import { getAllFollowers, getAllFollowing, searchName, toggleFollow } from "../controllers/users.controllers.js";

const userRoutes = Router();

userRoutes.use(authValidation);
userRoutes.post("/toggleFollow/:id", toggleFollow);
userRoutes.get("/user", searchName);
userRoutes.get("/user/followers", getAllFollowers);
userRoutes.get("/user/following", getAllFollowing);

export default userRoutes;