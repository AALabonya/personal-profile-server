import { Schema, model } from "mongoose";
import { TExperience } from "./experience.interface";

const experienceSchema = new Schema<TExperience>(
    {
        title: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        employmentType: {
            type: String,
            enum: ["Full-time", "Part-time", "Contract", "Internship"],
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            default: "Present",
        },
        duration: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        responsibilities: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Experience = model<TExperience>("Experience", experienceSchema);
