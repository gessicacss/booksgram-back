import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { createUser, handleSignIn, logOutUser } from "../repositories/auth.repositories.js";

export async function signIn(req, res) {
    const { user } = res.locals;
    try {
        const token = uuid();
        const id = user.id;
        await handleSignIn(user, token);
        res.status(200).send({ token, id });
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

export async function signUp(req, res) {
    const { password } = req.body;
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds);

    try {
        await createUser(req.body, hashPassword);
        res.sendStatus(201);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}

export async function logOut(req, res) {
    const { token } = res.locals.session;
    
    try {
        await logOutUser(token);
        res.sendStatus(200);
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}