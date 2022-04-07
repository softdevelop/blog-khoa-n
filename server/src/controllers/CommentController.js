const CommentRepository = require("../repository/CommentRepository");
const CommentController ={};

CommentController.create = async (req,res)=>{

    const newComment = await CommentRepository.save(req.body);

    res.status(201).send(JSON.stringify({
        data:newComment,
        notice:"Create Success!"
    }));
}

CommentController.getCommentById= async (req,res)=>{
    const Comments = await CommentRepository.getCommentById(req.params.id);
    res.status(200).send(Comments);
}

CommentController.deleteComment = async (req,res)=>{
   await CommentRepository.delete(req.params.id);

    res.status(201).send(JSON.stringify({
        notice:"Delete Success!"
    }));
}

CommentController.getAllComments = async(req,res)=>{
    const Comments = await CommentRepository.getAllComments();
    res.status(200).send(Comments);
}

CommentController.updateComment = async(req,res)=>{
    const newComment = await CommentRepository.updateComment(req.params.id,req.body);
    res.status(201).send(JSON.stringify({
        data:newComment,
        notice:"Update Success!"
    }));
}

CommentController.commentPost = async (req,res)=>{

    const newComment = await CommentRepository.commentPost(req.params.id,req.body);

    res.status(201).send(JSON.stringify({
        data:newComment,
        notice:"Create Success!"
    }));
}

CommentController.commentToComment = async (req,res)=>{

    const newComment = await CommentRepository.commentToComment(req.params.id,req.body);

    res.status(201).send(JSON.stringify({
        data:newComment,
        notice:"Create Success!"
    }));
}

CommentController.like = async (req,res)=>{
    const status = await CommentRepository.likeComment(req.params.id,req.body.userId);

    res.status(201).send(JSON.stringify({
        notice:status
    }));
}

module.exports =CommentController;
