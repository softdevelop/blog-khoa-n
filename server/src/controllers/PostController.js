const PostRepository = require("../repository/PostRepository");

const PostController= {};

PostController.create = async (req,res)=>{

    const newPost = await PostRepository.save(req.body);

    res.status(201).send(JSON.stringify({
        data:newPost,
        notice:"Create Success!"
    }));
}

PostController.getPostById = async (req,res)=>{
    const post = await PostRepository.getPostByID(req.params.id);
    res.status(201).send(JSON.stringify({
        data:post
    }));
}

PostController.update = async (req,res)=>{

    const newPost = await PostRepository.updatePost(req.params.id,req.body);

    res.status(201).send(JSON.stringify({
        data:newPost,
        notice:"Update Success!"
    }));
}

PostController.delete = async (req,res)=>{

    await PostRepository.delete(req.params.id);

    res.status(201).send(JSON.stringify({
        notice:"Delete Success!"
    }));
}

PostController.getPostPage = async (req,res)=>{
    let perPage = 3; 
    let page = req.params.page? req.params.page: 1;
    await PostRepository.getPostPage(perPage,page,res,req);
}

PostController.like = async (req,res)=>{
    const status = await PostRepository.likePost(req.params.id,req.body.userId);

    res.status(201).send(JSON.stringify({
        status
    }));
}

module.exports = PostController;
