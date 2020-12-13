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

        console.log(authorization);

        const token = authorization;

        const data: any = await jwt.verify(token, process.env.TOKEN_SECRET);

        console.log(data);

        const usuario = await getRepository(Usuario).findOne({
            where: {
                id: data.id,
                nome: data.usuario,
                admin: data.admin,
                updated: data.updated,
            },
        });

        req.id = data.id;

        console.log(req);

        next();
    } catch (err) {
        return res.status(403).json({
            errors: [err.message],
        });
    }
};
