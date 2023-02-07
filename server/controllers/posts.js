import Post from "../models/Post.js"
import User from  "../models/User.js"

/* CREATE POST */
export const createPost = async (req, res) => {
    try{
        const { userId, description, picturePath } = req.body
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes:{},
            comments: []
        })
        await newPost.save()

        const posts = await Post.find()
        res.status(201).json(posts)
    } catch (err) {
        res.status(409).json({ message: err.message })

    }
}

/* READ */
export  const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export  const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params
        const posts = await Post.find({ userId })
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* UPDATE */
export  const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const post = await Post.findById( id )
        const isliked = post.likes.get(userId)

        if (isliked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { likes: post.likes },
            { new: true }
            )
            
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export  const commentPost = async (req, res) => {
    try {
        const { id } = req.params
        const { comment } = req.body
        const post = await Post.findById( id )


        post.comments.unshift(comment)
        

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { comments: post.comments },
            { new: true }
            )
            
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* DELETE */
export  const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findByIdAndDelete( id )

        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (err) {
        res.status(405).json({ message: err.message })
    }
}
