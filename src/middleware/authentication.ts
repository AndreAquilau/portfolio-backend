import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, request } from 'express';
import { getRepository } from 'typeorm';
import Usuario from '../models/Usuario';

export default async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(403).json({
                errors: [`Require token authorization`],
            });
        }

        const token = authorization;

        const data: any = await jwt.verify(token, process.env.TOKEN_SECRET);

        req.id = data.id;

        next();
    } catch (err) {
        return res.status(403).json({
            errors: [err.message],
        });
    }
};
