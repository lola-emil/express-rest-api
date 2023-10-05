

export default class CustomError extends Error {
    status: number;

    constructor(status: number, message?: string) {
        super();
        this.status = status;

        if (this.status >= 500) 
            this.message = "Internal Server Error";
        else 
            this.message = String(message);
    }
}