import { Handler, NextFunction, Request, Response } from "express";

type AsyncHandler = (req: Request, res: Response) => Promise<void>

export default function handlerWrapper(handler: AsyncHandler) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
}