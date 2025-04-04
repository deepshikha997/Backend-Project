import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params
    const {content} = req.body
    const video = await Video.findByIf(videoId)

    if(!video){
        throw new ApiError(400,"Video not found")
    }

    const comment = await Comment.create({
        content: content,
        video:videoId,
        owner:req.user?._id
    })
    if(!comment){
        throw new ApiError(404,"Could not comment")

    }
    return res.status(200).json(new Apisuccess(200,"Commented Successfully",comment))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params
    const {content} = req.body
    if(!content || content.trim().length===0){
        throw new ApiError(400,"Content cannot be empty")
    }
    const verifycomment = await Comment.findById(commentId)
    if(!verifycomment){
        throw new ApiError(400, "Could not find the comment")
    }
    if(!verifycomment?.owner.toString()!==req.user?._id.toString()){
        throw new ApiError(400,"Only valid user can update comment")
    }
    const comment= await Comment.findByIdAndUpdate(
        commentId,{
            $set:{
                content:content
            }
        },{new:true}
    )
    if(!comment){
        throw new ApiError(404,"Couldnot update the comment")
    }
    return res.status(200)
    .json(new Apisuccess(200,"Comment updated successfully",comment))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params
    const comment= await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(402,"Could not find the comment")
    }
    if(comment.owner?.toString()!== req.user?._id.toString()){
        throw new ApiError(400,"only the owner can delete comment")
    }
    const newComment=await Comment.findByIdAndDelete(commentId)
    if(!newComment){
        throw new ApiError(500,"Could deltethe comment")
    }
    return res.status(200).json(new Apisuccess(200,"Comment deleted successfully",newComment))
})
const getallvideocomments=asyncHandler(async(req,res)=>{
    const {videoId}=req.params
    const {page=1,limit=10}=req.query
    if(!isValidObjectId(videoId)){
        throw new Apierror(400,"Invalid video id")
    }
    const allcommentsinvideo=await Comment.aggregate([
        {
          $match:{
            video:new mongoose.Types.ObjectId(videoId)
          }
        },
        {
            $lookup:{
                from:""
            }
        }
    ])
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }