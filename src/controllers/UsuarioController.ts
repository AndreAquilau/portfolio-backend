import { Response, Request } from 'express';
import Usuario from 'src/models/Usuario';
import { getRepository } from 'typeorm';
import Controller from '../interface/Controller';

class UsuarioController implements Controller<Request, Response> {
    async index(request: Request, response: Response) {
        try {
            const repository = getRepository(Usuario);
            const usuarios = await repository.find({
                select: ['id', 'nome', 'updated', 'admin', 'created'],
            });

            return response.status(200).json({
                usuarios,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async show(request: Request, response: Response) {
        try {
            if (!Number(request.query.id)) {
                return response.status(400).json({
                    errors: ['Param id is not type integer'],
                });
            }
            if (!request.query.id) {
                return response.status(400).json({
                    errors: ['Param id is required for filter data'],
                });
            }
            const repository = getRepository(Usuario);
            const usuario = await repository.findOne({
                where: { id: request.query.id },
                select: ['id', 'nome', 'updated', 'admin', 'created'],
            });

            return response.status(200).json({
                usuario,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
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
                errors: [err.message],
            });
        }
    }

    async update(request: Request | any, response: Response) {
        try {
            if (!Number(request.query.id)) {
                return response.status(400).json({
                    errors: ['Param id is not type integer'],
                });
            }
            if (!request.query.id) {
                return response.status(400).json({
                    errors: ['Param id is required for update data'],
                });
            }
            const repository = getRepository(Usuario);
            const usuario = await repository.update({ id: request.id }, request.body);

            return response.status(200).json({
                usuario,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async delete(request: Request | any, response: Response) {
        try {
            if (!Number(request.query.id)) {
                return response.status(400).json({
                    errors: ['Param id is not type integer'],
                });
            }
            if (!request.query.id) {
                return response.status(400).json({
                    errors: ['Param id is required for delete data'],
                });
            }
            const repository = getRepository(Usuario);
            const usuario = await repository.delete({ id: request.id });

            return response.status(200).json({
                usuario,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }
}

export default new UsuarioController();
