import { Schema, model } from "mongoose";
import { TProject } from "./project.interface";



const projectSchema = new Schema<TProject>(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: ''
        },

    },
    {
        timestamps: true,

    }
);


export const Project = model<TProject>('Project', projectSchema);