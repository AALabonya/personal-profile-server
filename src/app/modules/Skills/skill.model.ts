// import { Schema, model } from "mongoose";
// import { TSkill } from "./skill.interface";


// const skillSchema = new Schema<TSkill>(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         logo:{
//             type: String,
//             required: true,
//         },
//     },
//     {
//         timestamps: true,
//     }
// );


// export const Skill = model<TSkill>('Skill', skillSchema);

import mongoose from "mongoose";


const SkillSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    logo: { type: String,
            default: ''},
    expertise: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", SkillSchema);
export default Skill;