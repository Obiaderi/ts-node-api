import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

const validationMiddleware = (schema: Joi.Schema): RequestHandler => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validateOptions = {
            abortEarly: false,
            allowUnknown: true, // this will allow unknown keys that will be ignored
            stripUnknown: true, // this will remove unknown keys from the validated data
        };

        try {
            const value = await schema.validateAsync(req.body, validateOptions);
            req.body = value;
            next();
        } catch (e: any) {
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).json({ errors });
        }
    };
};

export default validationMiddleware;
