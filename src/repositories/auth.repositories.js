import { db } from "../database/database.connection.js";

export function handleSignIn(user, token) {
    return db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [
    user[0].id,
    token
]);
}

export function createUser(body, hashPassword) {
    const { name, profilePicture, email, biography } = body;

    return db.query(`INSERT INTO users (name, "profilePicture", email, biography, password) VALUES ($1, $2, $3, $4, $5)`,
    [
        name, profilePicture, email, biography, hashPassword
    ]);
}

export function findUserEmail(email){
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

export function findUserSession(token) {
    return db.query(`SELECT * FROM sessions WHERE token=$1`, [token]);
}

export function logOutUser(token) {
    return db.query(`DELETE FROM sessions WHERE token=$1`, [token]);
}