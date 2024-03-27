import { z } from "zod";
import express from 'express';

const verification = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const user = request.body;

    const schema = z.object({
        email: z.string().email({
            message: 'Informe um email válido'
        }).min(1, {
            message: 'O email é necessário'
        }),
        name: z.string()
    });

    const validationResult = schema.safeParse(user);

    if (!validationResult.success) {
        const res = JSON.stringify(validationResult, null, 2);
        return response.status(401).end(res);
    }
}