import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/customError";
import { CustomResponse } from "../utils/customResponse";

export default function errorHandler(error: Error, req: Request, res: Response, _next: NextFunction) {
    const customError = error as CustomError;
    const customResponse = new CustomResponse();

    customResponse.statusCode = customError.status;
    customResponse.message = customError.message;

    res.status(customResponse.statusCode).json(customResponse);
}