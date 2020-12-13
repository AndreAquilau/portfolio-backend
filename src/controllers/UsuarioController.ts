import { Response, Request } from 'express';
import Usuario from 'src/models/Usuario';
import { getRepository } from 'typeorm';
import Controller from '../interface/Controller';

class UsuarioController implements Controller<Request, Response> {
    async index(request: Request, response: Response) {
        try {
            const repository = getRepository(Usuario);
            const usuarios = await repository.find();

            return response.status(200).json({
                usuarios,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async show(request: Request, response: Response) {
        try {
            const repository = getRepository(Usuario);
            const usuario = await repository.findOne({ where: { id: request.query.id } });

            return response.status(200).json({
                usuario,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async stored(request: Request, response: Response) {
        try {
            const repository = getRepository(Usuario);
            const usuario = await repository.save(request.body);

            return response.status(201).json({
                usuario,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async update(request: Request | any, response: Response) {
        try {
            const repository = getRepository(Usuario);
            const usuario = await repository.update({ id: request.id }, request.body);

            return response.status(200).json({
                usuario,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async delete(request: Request | any, response: Response) {
        try {
            const repository = getRepository(Usuario);
            const usuario = await repository.delete({ id: request.id });

            return response.status(200).json({
                usuario,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }
}

export default new UsuarioController();
