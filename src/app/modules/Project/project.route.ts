/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../../config/multer.config";
import { projectControllers } from "./project.controller";
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
    projectControllers.createProject);


router.get("/", projectControllers.getAllProjects);

router.get("/:id", projectControllers.getSingleProject)

router.patch(
    "/:id",

    multerUpload.single('image'),
    projectControllers.updateProject);
router.delete(
    "/:id",
    projectControllers.deleteProject);





export const projectRoutes = router;
