

export class CustomResponse<T> {
    statusCode: number;
    message: string;
    data: T | undefined;

    constructor(statusCode = 200, message?: string, data?: T) {
        this.statusCode = statusCode;
        this.message = message ?? "ok";
        this.data = data;
    }
}