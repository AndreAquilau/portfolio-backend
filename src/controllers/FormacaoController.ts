import { Response, Request } from 'express';
import Formacao from 'src/models/Formacao';
import { getRepository } from 'typeorm';
import Controller from '../interface/Controller';

class FormacaoController implements Controller<Request, Response> {
    async index(request: Request, response: Response) {
        try {
            const repository = getRepository(Formacao);
            const formacaos = await repository.find();

            return response.status(200).json({
                formacaos,
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
            const repository = getRepository(Formacao);
            const formacao = await repository.findOne({ where: { id: request.query.id } });

            return response.status(200).json({
                formacao,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async stored(request: any, response: Response) {
        try {
            const repository = getRepository(Formacao);
            const formacao = await repository.save({
                descFormacao: request.body.descFormacao,
                instituicao: request.body.instituicao,
                usuario: request.id,
            });

            return response.status(201).json({
                formacao,
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
            const repository = getRepository(Formacao);
            const formacao = await repository.update(
                { usuario: request.id, id: request.query.id },
                { descFormacao: request.body.descFormacao },
            );

            return response.status(200).json({
                formacao,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async updateInstituicao(request: Request | any, response: Response) {
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
            const repository = getRepository(Formacao);
            const formacao = await repository.update(
                { usuario: request.id, id: request.query.id },
                { instituicao: request.body.instituicao },
            );

            return response.status(200).json({
                formacao,
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
            const repository = getRepository(Formacao);
            const formacao = await repository.delete({ usuario: request.id, id: request.query.id });

            return response.status(200).json({
                formacao,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }
}

export default new FormacaoController();
