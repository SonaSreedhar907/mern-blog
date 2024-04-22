import Post from '../models/post.model.js'
import { errorHandler } from '../utils/error.js'


export const create=async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create a post'))
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,'Please provide all required fields'))
    }
    const slug = req.body.title
       .split('')
       .join('-')
       .toLowerCase()
       .replace(/[^a-zA-Z0-9-]/g, '')
    const newPost = new Post({
        ...req.body,
        slug,
        userId:req.user.id
    })
    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }
}

export const getposts=async(req,res,next)=>{

}

export const deletepost=async(req,res,next)=>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
     return next(errorHandler(403,'You are not allowed to delete this post'))   
    }
    try {
        await Post.findByIdAndDelete(req.params.postId)
        res.status(200).json('The post has been deleted')
    } catch (error) {
        next(error)
    }
}

export const updatepost = async(req,res,next)=>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowded to update the post'))
    }
    try {
        const updatePost = await Post.findByIdAndUpdate(
            req.params.postId,{
                $set:{
                    title:req.body.title,
                    content:req.body.content,
                    // category:req.body.category,
                    // image:req.body.image
                }
            },
            {new:true}
        )
        res.status(200).json(updatePost)
    } catch (error) {
        next(error)
    }
}