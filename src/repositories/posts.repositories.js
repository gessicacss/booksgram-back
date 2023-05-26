import { db } from "../database/database.connection.js";

export function findPostById(id){
    return db.query(`SELECT * FROM posts WHERE id=$1`, [id]);
}

export function createNewPost(body, userId) {
    const { image, description } = body;
    return db.query(`INSERT INTO posts ("userId", image, description) VALUES ($1, $2, $3)`, [userId, image, description]);
}

export function getPostByUserId(userId){
    return db.query(`
        SELECT posts.id, COUNT(likes) as likes, users."profilePicture", users.name, posts.image, posts.description, posts."postedAt"
        FROM posts
        JOIN users ON users.id=posts."userId" 
        LEFT JOIN likes ON likes."postId"=posts.id
        WHERE users.id=$1
        GROUP BY posts.id, users."profilePicture", users.name
        ORDER BY posts."postedAt" DESC;`, [userId]);
}

export function getPost(id) {
    return db.query(`
    SELECT posts.id, COUNT(likes) as likes, users."profilePicture", users.name, posts.image, posts.description, posts."postedAt"
    FROM posts
    JOIN users ON users.id=posts."userId" 
    LEFT JOIN likes ON likes."postId"=posts.id
    WHERE posts.id=$1
    GROUP BY posts.id, users."profilePicture", users.name;`, [id]);
}

export function getPosts(){
    return db.query(`
    SELECT posts.id, COUNT(likes) as likes, users."profilePicture", users.name, posts.image, posts.description, posts."postedAt"
    FROM posts
    JOIN users ON users.id=posts."userId" 
    LEFT JOIN likes ON likes."postId"=posts.id
    GROUP BY posts.id, users."profilePicture", users.name
    ORDER BY posts."postedAt" DESC;`);
}

export function checkIfUserLikedPost(postId, userId) {
    return db.query(`SELECT * FROM likes WHERE "postId"=$1 AND "userId"=$2`, [postId, userId]);
}

export function removeLike(postId, userId){
    return db.query(`DELETE FROM likes WHERE "postId"=$1 AND "userId"=$2`, [postId, userId]);
}

export function addLike(postId, userId){
    return db.query(`INSERT INTO likes ("postId", "userId") VALUES ($1, $2)`, [postId, userId]);
}