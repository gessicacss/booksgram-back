import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";
import { validateSignInUser, validateSignUpUser } from "../middlewares/auth.middlewares.js";
import { logOut, signIn, signUp } from "../controllers/auth.controllers.js";
import { authValidation } from "../middlewares/authValidation.middlewares.js";

const authRouter = Router();

authRouter.post("/signin", validateSchema(signInSchema), validateSignInUser, signIn);
authRouter.post("/signup", validateSchema(signUpSchema), validateSignUpUser, signUp);
authRouter.post("/logout", authValidation, logOut);

export default authRouter;