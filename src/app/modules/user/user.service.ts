import { Request } from "express";
import { User } from "./user.model";
import AppError from "../../errors/AppError";

const getProfileFromDB = async (req: Request) => {
    //getting the extracted data from decoded token
    const user = req.user;
    //searching by id which can be achieved from decoded token
    const findUser = await User.findById(user?.userId);
    // console.log('service' ,findUser);
    if (!findUser) {
        throw new AppError(404, 'User not found');
    }
    return findUser;
};


const updateProfileIntoDB = async (req: Request) => {
    //getting the data from token
    const user = req.user;
    const updatedData = {
        ...JSON.parse(req.body.data),
        ...(req.file && { image: req.file.path })  // If an image file is uploaded, add the image path
    };
    const findUser = await User.findById(user?.userId);
    // console.log('service', findUser)

    //checking if the user exist
    if (!findUser) {
        throw new AppError(404, 'User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(user?.userId, updatedData, { new: true }).select('-createdAt -updatedAt -__v');
    if (!updatedUser) {
        throw new AppError(404, 'Error updating user')
    }

    return updatedUser;
};

const getAllUsersFromDB = async () => {
    const result = await User.find();
    return result;
};

const promoteUserToAdminInDB = async (id: string) => {
    const user = await User.findById(id);
    //checking if the user exist in the database
    if (!user) {
        throw new AppError(404, 'User not found');
    };

    //setting user role to admin
    user.role = 'admin';
    await user.save();
    return user;
};

const deleteUserFromDB = async (id: string) => {
    const user = await User.findById(id);
    //checking if the user exist in the database
    if (!user) {
        throw new AppError(404, 'User not found');
    };

    const result = await User.findByIdAndDelete(id);
    return result;
}






const getFollowedUsers = async (req: Request) => {
    const user = req.user;
    // console.log(user, 'from service')
    if (!user) {
        throw new Error("User not found");
    }
    const result = await User.find({ _id: user.userId }).select("-password").populate('followers').populate('following').lean().exec();
    // console.log(result, 'from service')
    return result;

};

const getPaidUsersFromDB = async () => {
    const result = await User.find({ isPaid: true });
    return result;
}



export const UserServices = {
    getProfileFromDB,
    updateProfileIntoDB,
    getAllUsersFromDB,
    promoteUserToAdminInDB,
    deleteUserFromDB,

    getFollowedUsers,
    getPaidUsersFromDB,
}