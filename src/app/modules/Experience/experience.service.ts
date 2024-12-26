import { TExperience } from "./experience.interface";
import { Experience } from "./experience.model";

const addExperienceIntoDB = async (payload: TExperience) => {
    const result = await Experience.create(payload);
    return result;
};

const getAllExperienceFromDB = async () => {
    const result = await Experience.find();
    return result;
};

const getSingleExperienceFromDB = async (id: string) => {
    const result = await Experience.findById(id);
    return result;
};

const updateExperienceIntoDB = async (id: string, updatedData: Partial<TExperience>) => {
    const result = await Experience.findByIdAndUpdate(id, updatedData);
    return result;
};

const deleteExperienceFromDB = async (id: string) => {
    const result = await Experience.findByIdAndDelete(id);
    return result;
};


export const experienceServices = {
    addExperienceIntoDB,
    getAllExperienceFromDB,
    getSingleExperienceFromDB,
    updateExperienceIntoDB,
    deleteExperienceFromDB,
}