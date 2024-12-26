
// import { catchAsync } from "../../utils/catchAsync";
// import sendResponse from "../../utils/sendResponse";
// import { skillServices } from "./skill.service";



// const addSkill = catchAsync(async (req, res) => {

//     const result = await skillServices.AddSkillIntoDB(req.body, req.files,);
//     sendResponse(res, {
//         success: true,
//         statusCode: 201,
//         message: "Skill added successfully",
//         data: result,
//     });
// });

// const getAllSkills = catchAsync(async (req, res) => {
//     const result = await skillServices.getAllSkillsFromDB();
//     sendResponse(res, {
//         success: true,
//         statusCode: 200,
//         message: "Skills retrieved successfully",
//         data: result,
//     });
// });

// const getSingleSkill = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const result = await skillServices.getSingleSkillFromDB(id);
//     sendResponse(res, {
//         success: true,
//         statusCode: 200,
//         message: "Skill retrieved successfully",
//         data: result,
//     });
// });

// const updateSkill = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     console.log(req.body);
    
//     const result = await skillServices.updateSkillIntoDB(id, req);
//     console.log(result);
    
//     sendResponse(res, {
//         success: true,
//         statusCode: 200,
//         message: "Skill updated successfully",
//         data: result,
//     });
// });

// const deleteSkill = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const result = await skillServices.deleteSkillFromDB(id);
//     sendResponse(res, {
//         success: true,
//         statusCode: 200,
//         message: "Skill deleted successfully",
//         data: result,
//     });
// });


// export const skillControllers = {
//     addSkill,
//     getAllSkills,
//     getSingleSkill,
//     updateSkill,
//     deleteSkill,
// }

import AppError from "../../errors/AppError";
import { catchAsync } from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";
import Skill from "./skill.model";


const createSkill = catchAsync(async (req, res) => {
    try {
      const body = req.body;
      const files = req.files as any;
  
      // Validate the required fields
      if (!body.label || body.label.length < 2) {
        res.status(400).json({
          success: false,
          message: "Label must be at least 2 characters long",
        });
        return;
      }
  
      if (!body.expertise) {
        res.status(400).json({
          success: false,
          message: "Expertise is required",
        });
        return;
      }
  
      if (!files || !files.logo) {
        res.status(400).json({
          success: false,
          message: "Logo file is required",
        });
        return;
      }
  
      // Assign the logo path
      const logoPath = files.logo[0]?.path;
      if (!logoPath) {
        res.status(400).json({
          success: false,
          message: "Invalid logo file",
        });
        return;
      }
  
      // Create the skill object
      const skillData = {
        ...body,
        logo: logoPath,
      };
  
      // Save the skill to the database
      const result = await Skill.create(skillData);
  
      // Send the response
      res.status(200).json({
        success: true,
        data: result,
        message: "Skill created successfully",
      });
    } catch (error) {
      // Handle unexpected errors
      console.error("Error creating skill:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the skill",
      });
    }
  });
  

const getSkills = catchAsync(async (req, res) => {
  const result = await Skill.find();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Skills retrieved successfully",
  });
});

const updateSkillBySkillId = catchAsync(async (req, res) => {
    const { id } = req.params;
    const body = req.body;
  
    // Handle file uploads
    const files = req.files as any;
    if (files && files.logo && files.logo[0]) {
      const logoPath = files.logo[0].path; // Use the logo path
      body.logo = logoPath; // Update the logo in the body
    }
  
    // Update the skill
    const updatedSkill = await Skill.findByIdAndUpdate(id, body, {
      new: true, // Ensure the updated document is returned
    });
  
    // Handle not found case
    if (!updatedSkill) {
      res.status(404).json({ success: false, message: "Skill not found" });
      return; // Ensure no further execution
    }
  
    // Send response
    sendResponse(res, {
      success: true,
      statusCode: 200,
      data: updatedSkill, // Return the updated skill data
      message: "Skill updated successfully",
    });
  
    // No return statement here ensures compliance with `Promise<void>`
  });
  
const deleteSkillBySkillId = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  
  const isExist = await Skill.findById(id);

  if (!isExist) {
    throw new AppError(404, "Skill not found");
  }
  const result = await Skill.findByIdAndDelete(isExist._id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: result,
    message: "Skill deleted successfully",
  });
});

const skillController = {
  createSkill,
  getSkills,
  updateSkillBySkillId,
  deleteSkillBySkillId,
};

export default skillController;