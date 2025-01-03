/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import AppError from "../errors/AppError";
import { TErrorMessages } from "../interfaces/error.interface";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorMessages: TErrorMessages = [
        {
            path: "",
            message: "Something went wrong!",
        },
    ];
    let stack = err.stack || "No stack trace available";

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
        stack = simplifiedError?.stack;
    } else if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
        stack = simplifiedError?.stack;
    } else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
        stack = simplifiedError?.stack || stack;
    } else if (err?.code === 11000) {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
        stack = simplifiedError?.stack;
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorMessages = [
            {
                path: "",
                message: err?.message,
            },
        ];
        stack = err?.stack || stack;
    } else if (err instanceof Error) {
        message = err?.message;
        errorMessages = [
            {
                path: "",
                message: err?.message,
            },
        ];
        stack = err?.stack || stack;
    }

    // Final error response
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack,
    });

    return next(); // Ensure the next middleware can proceed if necessary
};

export default globalErrorHandler;
