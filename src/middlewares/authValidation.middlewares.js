import { findUserSession } from "../repositories/auth.repositories.js";

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const session = await findUserSession(token);
        if (!session.rowCount) return res.sendStatus(401);

        res.locals.session = session.rows[0];
        next()
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
}