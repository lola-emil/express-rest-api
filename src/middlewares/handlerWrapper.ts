import { Handler, NextFunction, Request, Response } from "express";

export default function handlerWrapper(handler: Handler) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}