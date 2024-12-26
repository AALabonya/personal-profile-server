import { Request } from "express";
import { TSkill } from "./skill.interface";

import AppError from "../../errors/AppError";
import Skill from "./skill.model";




const AddSkillIntoDB = async (payload: TSkill,files: any) => {

    const imagePath = files?.logo ? files.logo[0]?.path : null; 
    
    if (imagePath) {
        payload.logo = imagePath;
    }

    const result = await Skill.create(payload);
    return result;
};

const getAllSkillsFromDB = async () => {
    const result = await Skill.find();
    return result;
};

const getSingleSkillFromDB = async (id: string) => {
    const result = await Skill.findById(id);
    return result;
};

const updateSkillIntoDB = async (id: string, req: Request) => {

    const updatedData = {
        ...JSON.parse(req.body.data),
        ...(req.file && { logo: req.file.path })
    };

    const updatedSkill = await Skill.findByIdAndUpdate(id, updatedData, {
        new: true,
    });
    if (!updatedSkill) {
        throw new AppError(404, "Blog not found");
    }
    return updatedSkill;
};

const deleteSkillFromDB = async (id: string) => {
    const result = await Skill.findByIdAndDelete(id);
    return result;
};


export const skillServices = {
    AddSkillIntoDB,
    getAllSkillsFromDB,
    getSingleSkillFromDB,
    updateSkillIntoDB,
    deleteSkillFromDB,
}