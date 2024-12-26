import { Request } from "express";
import { Blog } from "./blog.model";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interface";



const insertBlogIntoDB = async (payload: TBlog, files: any) => {

    const imagePath = files?.image ? files.image[0]?.path : null; 
    
    if (imagePath) {
        payload.image = imagePath;
    }

    const result = await Blog.create(payload);
    return result;
};

const getAllBlogsFromDB = async () => {
    const result = await Blog.find();
    return result;
};

const getSingleBlogFromDB = async (id: string) => {
    const result = await Blog.findById(id);
    return result;
};

const updateBlogIntoDB = async (id: string, req: Request) => {

    const updatedData = {
        ...JSON.parse(req.body.data),
        ...(req.file && { image: req.file.path })
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
        new: true,
    });
    if (!updatedBlog) {
        throw new AppError(404, "Blog not found");
    }
    return updatedBlog;
};

const deleteBlogFromDB = async (id: string) => {
    const result = await Blog.findByIdAndDelete(id);
    return result;
};


export const blogServices = {
    insertBlogIntoDB,
    getAllBlogsFromDB,
    getSingleBlogFromDB,
    updateBlogIntoDB,
    deleteBlogFromDB
}