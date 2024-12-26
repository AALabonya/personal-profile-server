
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.service";


const insertBlog = catchAsync(async (req, res) => {
console.log(req?.body);

    const result = await blogServices.insertBlogIntoDB(req.body, req.files,);
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Blog inserted successfully",
        data: result,
    });
});

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await blogServices.getAllBlogsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blogs retrieved successfully",
        data: result,
    });
});

const getSingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await blogServices.getSingleBlogFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blog retrieved successfully",
        data: result,
    });
});

const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id,"ityyyy");
    
    const result = await blogServices.updateBlogIntoDB(id, req);
    console.log(result,"try");
    
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blog updated successfully",
        data: result,
    });
});

const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await blogServices.deleteBlogFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Blog deleted successfully",
        data: result,
    });
});


export const blogControllers = {
    insertBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
}