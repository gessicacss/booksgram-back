import { addLike, checkIfUserLikedPost, createNewPost, getPost, getPostByUserId, getPosts, removeLike } from "../repositories/posts.repositories.js";

export async function createPost(req, res) {
    const { userId } = res.locals.session;
    console.log(userId);

    try {
        await createNewPost(req.body, userId);
        res.sendStatus(201);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function getPostsByUser(req, res) {
    const { userId } = req.params;

    try {
        const { rows: userPosts } = await getPostByUserId(userId);
        res.send(userPosts);
    } catch(err){
        res.status(500).send(err.message);
    }
}

export async function getPostById(req, res){
    const { id } = req.params;

    try {
        const { rows: post } = await getPost(id);
        res.send(post[0]);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function getAllPosts(req, res){
    try {
        const { rows: posts } = await getPosts();
        res.send(posts);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function toggleLike(req, res) {
    const { id: postId } = req.params;
    const { userId } = res.locals.session;

    try {
        const { rowCount: postLiked} = await checkIfUserLikedPost(postId, userId);
        if (postLiked){
            await removeLike(postId, userId);
            return res.sendStatus(200);
        }
        await addLike(postId, userId);
        res.sendStatus(200);
    } catch(err) {
        res.status(500).send(err.message);
    }
}
