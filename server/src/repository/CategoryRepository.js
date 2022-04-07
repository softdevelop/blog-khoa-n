const CategoryModel = require("../models/CategoryModel");
const CategoryRepository ={};

CategoryRepository.getAllCategory = async ()=>{
    return await CategoryModel.find();
}
CategoryRepository.save = async (payload)=>{
    const category = new CategoryModel(payload);

    return await category.save();
}

CategoryRepository.delete =async(id)=>{
    await CategoryModel.findByIdAndDelete(id);
}
module.exports = CategoryRepository;
