import { Request } from "express";
import { TProject } from "./project.interface";
import { Project } from "./project.model";
import AppError from "../../errors/AppError";

const insertProjectIntoDB = async (payload: TProject, files: any) => {

    const imagePath = files?.image ? files.image[0]?.path : null; 
    
    if (imagePath) {
        payload.image = imagePath;
    }

    
    const result = await Project.create(payload);

    
    return result;
};

const getAllProjectsFromDB = async () => {
    const result = await Project.find();
    return result;
};

const getSingleProjectFromDB = async (id: string) => {
    const result = await Project.findById(id);
    return result;
};

const updateProjectIntoDB = async (id: string, req: Request) => {

    const updatedData = {
        ...JSON.parse(req.body.data),
        ...(req.file && { image: req.file.path })
    };

    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
        new: true,
    });
    if (!updatedProject) {
        throw new AppError(404, "Project not found");
    }
    return updatedProject;
};

const deleteProjectFromDB = async (id: string) => {
    const result = await Project.findByIdAndDelete(id);
    return result;
};


export const projectServices = {
    insertProjectIntoDB,
    getAllProjectsFromDB,
    getSingleProjectFromDB,
    updateProjectIntoDB,
    deleteProjectFromDB,
}