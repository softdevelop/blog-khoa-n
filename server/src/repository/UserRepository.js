const UserModel = require("../models/UserModel");
const bcrypt =require("bcrypt");

const UserRepository ={};

UserRepository.newUser = async (payload) => {
    const user = new UserModel(payload);
    return await user.save();
};


UserRepository.getUserByUsername = async (username) => {
    return await UserModel.findOne({username: username});
}

UserRepository.getUserByID = async (id) => {
    return await UserModel.findById(id);
}

UserRepository.updateUser = async (id,payload) => {
    const hashPassword = await bcrypt.hash(payload.password,12);
    return await UserModel.findByIdAndUpdate(id,{...payload,password:hashPassword});
}

UserRepository.deleteUserByID = async (id)=>{
    return await UserModel.findByIdAndDelete(id);
}

UserRepository.getAllUsers = async ()=>{
    return await UserModel.find();
}

module.exports = UserRepository;
