import { checkIfUserIsFollowing, followUser, getFollowers, getFollowing, searchUser, unfollowUser } from "../repositories/users.repositories.js";

export async function toggleFollow(req, res) {
    const { id: followedUser } = req.params;
    const { userId } = res.locals.session;
    try {
        const { rowCount: isFollowed } = await checkIfUserIsFollowing(userId, followedUser);
        if (isFollowed) {
            await unfollowUser(userId, followedUser);
            return res.sendStatus(200);
        }

        await followUser(userId, followedUser);
        res.sendStatus(200);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function searchName(req, res){
    const { name } = req.query;
    try {
        const { rows: result } = await searchUser(name);
        res.send(result);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

export async function getAllFollowers(req, res){
    const { userId } = res.locals.session;
    try {
        const { rows: followersList } = await getFollowers(userId);
        res.send(followersList);
    } catch(err) {
        res.status(500).send(err.message)
    }
}

export async function getAllFollowing(req, res){
    const { userId } = res.locals.session;
    try {
        const { rows: followingList } = await getFollowing(userId);
        res.send(followingList);
    } catch(err) {
        res.status(500).send(err.message)
    }
}