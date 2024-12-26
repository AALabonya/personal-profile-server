/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import { experienceControllers } from "./experience.controller";


const router = express.Router();

router.post("/", experienceControllers.addExperience);


router.get("/", experienceControllers.getAllExperience);

router.get("/:id", experienceControllers.getSingleExperience)

router.patch("/:id", experienceControllers.updateExperience);


router.delete("/:id", experienceControllers.deleteExperience);



export const experienceRoutes = router;
