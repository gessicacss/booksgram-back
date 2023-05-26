import joi from 'joi';

export const signInSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().required().min(3),
});

export const signUpSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
    profilePicture: joi.string().uri().required(),
    biography: joi.string().required(),
    password: joi.string().required().min(3),
    confirmPassword: joi.ref('password')
});