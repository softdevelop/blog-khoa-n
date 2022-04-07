const PostModel = require("../models/PostModel");
const CommentService = require("../service/CommentService");

const PostRepository ={};

PostRepository.save = async (payload)=>{
    const Post = new PostModel(payload);
    return await Post.save();
}

PostRepository.updatePost = async (id,payload)=>{
    return await PostModel.findByIdAndUpdate(id,payload);
}

PostRepository.updateCommentPost = async (commentId,PostId)=>{
    const post = await PostModel.findById(PostId);
    await post.updateOne({$push: {comments:commentId}}); 
}

PostRepository.delete = async (id)=>{
    const post =await PostModel.findById(id);

    await post.comments.forEach(comment=>{
        CommentService.delete(comment);
    })

    return await PostModel.findByIdAndDelete(id);
}
PostRepository.getPostByID= async(id)=>{
    const post=await PostModel.findById(id);
    return post;
}
PostRepository.getPostPage = async (perPage,page,res,req)=>{
    const cateName= req.query.cateName;
    const userId= req.query.userId;
    if(userId){
    await PostModel
      .find({userId}) 
      .skip((perPage * page) - perPage) 
      .limit(perPage)
      .exec((err, posts) => {
        
            res.send({
                posts,
                current:page,
                pages: Math.ceil(posts.length / perPage)
            });
              
      });
    }
    if(cateName){
        await PostModel
      .find({ category: {
          $in: [cateName],
        },}) 
      .skip((perPage * page) - perPage) 
      .limit(perPage)
      .exec((err, posts) => {
        PostModel.countDocuments((err, count) => { 
        if (err) return next(err);
            res.send({
                posts,
                current:page,
                pages: Math.ceil(posts.length / perPage)

            });
        });        
      });
    }
    else{
        await PostModel
          .find() 
          .skip((perPage * page) - perPage) 
          .limit(perPage)
          .exec((err, posts) => {
            PostModel.countDocuments((err, count) => { 
            if (err) return next(err);
                res.send({
                    posts,
                    current:page,
                    pages: Math.ceil(count / perPage)
                });
            });        
          });
    }
}

PostRepository.likePost = async (id,userId)=>{
    const post = await PostModel.findById(id);

    if (!post.likes.includes(userId)){
        await post.updateOne({$push: {likes:userId}});
        return {
            like:post.likes.length+1,
            message: "Like success"
        }
    } 
    else {
        await post.updateOne({$pull: {likes:userId}});
        return {
            like:post.likes.length-1,

            message: "Dislike success"
        }
    }
}


module.exports = PostRepository;

