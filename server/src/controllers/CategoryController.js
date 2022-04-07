const CategoryRepository = require("../repository/CategoryRepository");
const CategoryController ={};

CategoryController.getAllCategory = async (req,res)=>{
    const categories = await CategoryRepository.getAllCategory();
    res.status(200).send(categories);
}

CategoryController.save = async (req,res)=>{
    const category = await CategoryRepository.save(req.body);
     res.status(201).send(JSON.stringify({
        data:category,
        notice:"Create Success!"
    }));
}

CategoryController.delete = async (req,res)=>{
    await CategoryRepository.delete(req.params.id);

    res.status(201).send(JSON.stringify({
        notice:"Delete Success!"
    }));
}

module.exports =CategoryController;
