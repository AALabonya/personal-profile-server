import { ZodError, ZodIssue } from "zod";
import { TErrorMessages, TGenericErrorResponse } from "../interfaces/error.interface";


const handleZodError = (err:ZodError):TGenericErrorResponse =>
{
    const errorMessages:TErrorMessages= err.issues.map((issue:ZodIssue)=>{
        return{
            path:issue?.path[issue.path.length - 1],
            message:issue.message,
        };
    });
    const statusCode = 400 ;
    return {
        statusCode,
        message:'Validation Error',
        errorMessages,
        stack:err.stack
    };
};

export default handleZodError;