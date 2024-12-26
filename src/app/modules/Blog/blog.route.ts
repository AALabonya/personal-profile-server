/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";

import { blogControllers } from "./blog.controller";
import { upload } from "../../utils/sendImageToCloudinary";


const router = express.Router();

router.post(
    "/",upload.fields([{ name: "image", maxCount: 1 }]),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
          req.body = JSON.parse(req.body.data);
      }
      next();
  },
    blogControllers.insertBlog);


router.get("/", blogControllers.getAllBlogs);

router.get("/:id", blogControllers.getSingleBlog)

router.patch(
    "/:id",

    upload.single('image'),
    blogControllers.updateBlog);
    
router.delete(
    "/:id",
    blogControllers.deleteBlog);



export const blogRoutes = router;
