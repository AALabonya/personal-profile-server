
import { log } from "node:console";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { projectServices } from "./project.service";

const createProject = catchAsync(async (req, res) => {
    const result = await projectServices.insertProjectIntoDB(req.body, req.files,);



    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Project created successfully",
        data: result,
    });
});

const getAllProjects = catchAsync(async (req, res) => {
    const result = await projectServices.getAllProjectsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Projects retrieved successfully",
        data: result,
    });
});

const getSingleProject = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await projectServices.getSingleProjectFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Project retrieved successfully",
        data: result,
    });
});

const updateProject = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await projectServices.updateProjectIntoDB(id, req);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Project updated successfully",
        data: result,
    });
});

const deleteProject = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await projectServices.deleteProjectFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Project deleted successfully",
        data: result,
    });
});


export const projectControllers = {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
}