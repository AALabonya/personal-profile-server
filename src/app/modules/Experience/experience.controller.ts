
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { experienceServices } from "./experience.service";



const addExperience = catchAsync(async (req, res) => {

    const result = await experienceServices.addExperienceIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Experience inserted successfully",
        data: result,
    });
});

const getAllExperience = catchAsync(async (req, res) => {
    const result = await experienceServices.getAllExperienceFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Experiences retrieved successfully",
        data: result,
    });
});

const getSingleExperience = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await experienceServices.getSingleExperienceFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Experience retrieved successfully",
        data: result,
    });
});

const updateExperience = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await experienceServices.updateExperienceIntoDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Experience updated successfully",
        data: result,
    });
});

const deleteExperience = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await experienceServices.deleteExperienceFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Experience deleted successfully",
        data: result,
    });
});


export const experienceControllers = {
    addExperience,
    getAllExperience,
    getSingleExperience,
    updateExperience,
    deleteExperience
}