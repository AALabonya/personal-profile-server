// /* eslint-disable @typescript-eslint/no-unused-vars */
// import express, { NextFunction, Request, Response } from "express";
// import { multerUpload } from "../../config/multer.config";
// import { skillControllers } from "./skill.controller";
// import { upload } from "../../utils/sendImageToCloudinary";



// const router = express.Router();

// router.post(
//     "/",upload.fields([{ name: "logo", maxCount: 1 }]),
//     (req: Request, res: Response, next: NextFunction) => {
//       if (req.body.data) {
//           req.body = JSON.parse(req.body.data);
//       }
//       next();
//   },
//     skillControllers.addSkill);


// router.get("/", skillControllers.getAllSkills);

// router.get("/:id", skillControllers.getSingleSkill)

// router.patch("/:id", skillControllers.updateSkill);


// router.delete("/:id", skillControllers.deleteSkill);


// export const skillRoutes = router;
import { Router } from "express";
import skillController from "./skill.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();

router.get("/", skillController.getSkills);

router.post("/",upload.fields([{ name: "logo", maxCount: 1 }]), skillController.createSkill);
router.patch("/:id",upload.fields([{ name: "logo", maxCount: 1 }]), skillController.updateSkillBySkillId);
router.delete("/:id", skillController.deleteSkillBySkillId);
const skillRoute = router;

export default skillRoute;