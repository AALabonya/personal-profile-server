import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";


const blogSchema = new Schema<TBlog>(
    {
        name: {
            type: String,
            default: ''
        },
        blog: {
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


export const Blog = model<TBlog>('Blog', blogSchema);