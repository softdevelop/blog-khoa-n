const CommentModel = require("../models/CommentModel");
const PostRepository = require("./PostRepository");

const CommentRepository ={};

CommentRepository.save = async (payload)=>{
    const comment = new CommentModel(payload);
    return await comment.save();
}

CommentRepository.getAllComments = async ()=>{
    return await CommentModel.find();
}

CommentRepository.getCommentById =async (id)=>{
    return await CommentModel.findById(id);
}

CommentRepository.updateComment = async (id,payload)=>{
    return await CommentModel.findByIdAndUpdate(id,payload);
}

CommentRepository.commentPost = async (id,payload)=>{
    const comment = new CommentModel(payload);
    await comment.save();
    await PostRepository.updateCommentPost(comment._id.toString(),id);
}

CommentRepository.delete= async (id)=>{
    const commentParent = await CommentModel.findById(id);

    await commentParent.comments.forEach(async(comment)=>{
            console.log(comment);
        const commentChild = await CommentModel.findById(comment);
            if( commentChild.comments.length>0 ){
                console.log("test");
                await CommentRepository.delete(comment);
            }
            await CommentModel.findByIdAndDelete(comment);
        })
    await CommentModel.findByIdAndDelete(id);
}

CommentRepository.commentToComment = async (id,payload)=>{
    const comment = new CommentModel(payload);
    await comment.save();
    const commentParent = await CommentModel.findById(id);
 if (!commentParent.comments.includes(comment._id.toString())){
        await commentParent.updateOne({$push: {comments:comment._id.toString()}});
        return {
            message: "Comment success"
        }
    } 
}

CommentRepository.likeComment = async (id,userId)=>{
    const comment = await CommentModel.findById(id);

    if (!comment.likes.includes(userId)){
        await comment.updateOne({$push: {likes:userId}});
        return {
            like:comment.likes.length+1,
            message: "Like success"
        }
    } 
    else {
        await comment.updateOne({$pull: {likes:userId}});
        return {
            like:comment.likes.length-1,
            message: "Dislike success"
        }
    }
}

module.exports = CommentRepository;
