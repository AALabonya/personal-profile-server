
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";



const getProfile = catchAsync(async (req, res) => {
    const result = await UserServices.getProfileFromDB(req);        //only sending req will extract the data and give to client

    // console.log('controller',result);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'User profile retrieved successfully',
        data: result,
    });
});

const updateProfile = catchAsync(async (req, res) => {
    // console.log(req.body.data);
    // console.log(req.file);

    const result = await UserServices.updateProfileIntoDB(req);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Profile updated successfully',
        data: result
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUsersFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'User profiles retrieved successfully',
        data: result,
    });
});

const promoteUserToAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
    // console.log(id, 'from controller')
    const result = await UserServices.promoteUserToAdminInDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Profile updated successfully',
        data: result
    });

});

const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserServices.deleteUserFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User deleted successfully",
        data: result,
    })
})



const getFollowedUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getFollowedUsers(req);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Fetched followers successfully!',
        data: result,
    });
});

const getPaidUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getPaidUsersFromDB();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Fetched users successfully!',
        data: result,
    });
})




export const UserControllers = {
    getProfile,
    updateProfile,
    getAllUsers,
    promoteUserToAdmin,
    deleteUser,
    getFollowedUsers,
    getPaidUsers,
}