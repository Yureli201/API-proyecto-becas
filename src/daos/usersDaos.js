import User from "../models/userModel.js";

const usersDAOs = {};

usersDAOs.insertOne = async(user) => {
    const userInsert = await User.create(user);
    return userInsert;
}

usersDAOs.getOne = async (email) => {
    const user = await User.findOne(({email:email}));
    return user;
}

usersDAOs.getAll = async () => {
    const users = await User.find();
    return users;
}

userDAOs.getRole = async (role) => {
    const users = await User.find({role:role});
    return users;
}

userDAOs.update = async (email, user) => {
    const userUpdate = await User.updateOne({email:email}, user);
    return userUpdate;
}

userDAOs.delete = async (email) => {
    const userDelete = await User.deleteOne({email:email});
    return userDelete;
}

export default usersDAOs;
