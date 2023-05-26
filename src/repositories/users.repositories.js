import { db } from "../database/database.connection.js";

export function checkIfUserIsFollowing(userId, followedUser){
    return db.query(`SELECT * FROM followers WHERE "userId"=$1 AND "followedUser"=$2`, [userId, followedUser])
}

export function followUser(userId, followedUser){
    return db.query(`INSERT INTO followers ("userId", "followedUser") VALUES ($1, $2)`, [userId, followedUser])
}

export function unfollowUser(userId, followedUser){
    return db.query(`DELETE FROM followers WHERE "userId"=$1 AND "followedUser"=$2`, [userId, followedUser]);
}

export function searchUser(name){
    return db.query(`
    SELECT id, name, "profilePicture" 
    FROM users WHERE name ILIKE $1`, [`${name}%`]);
}

export function getFollowers(userId){
    return db.query(`SELECT users.name, users.id, users."profilePicture" 
    FROM followers
    JOIN users ON users.id=followers."userId"
    WHERE "followedUser"=$1`, [userId]);
}

export function getFollowing(userId){
    return db.query(`SELECT users.name, users.id, users."profilePicture" 
    FROM followers
    JOIN users ON users.id=followers."userId"
    WHERE "userId"=$1`, [userId]);
}