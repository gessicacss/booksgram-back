import { db } from "../database/database.connection.js";
import { findPostById } from "../repositories/posts.repositories.js";

export default async function validatePost(req, res, next){
    const { id } = req.params;

    try {
        const { rowCount: postExists } = await findPostById(id);
        if (!postExists) return res.status(404).send({ message: "This post doesn't exist!" });
        next ();
    } catch(err){
        res.status(500).send({ message: err.message });
    }
}