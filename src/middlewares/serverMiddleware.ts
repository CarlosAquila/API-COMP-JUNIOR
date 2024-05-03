import express from 'express';

export function errorHandler(err: Error, request: express.Request, response: express.Response, next: express.NextFunction) {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
}