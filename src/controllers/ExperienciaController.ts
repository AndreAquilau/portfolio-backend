import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import Experiencia from '../models/Experiencia';
import Controller from '../interface/Controller';

class ExperienciaController implements Controller<Request, Response> {
    async index(request: Request, response: Response) {
        try {
            const repository = getRepository(Experiencia);
            const experiencias = await repository.find();

            return response.status(200).json({
                experiencias,
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
            const repository = getRepository(Experiencia);
            const experiencia = await repository.findOne({ where: { id: request.query.id } });

            return response.status(200).json({
                experiencia,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async stored(request: Request, response: Response) {
        try {
            const repository = getRepository(Experiencia);
            const experiencia = await repository.save(request.body);

            return response.status(201).json({
                experiencia,
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
            const repository = getRepository(Experiencia);
            const experiencia = await repository.update(
                { usuario: request.id, id: request.query.id },
                {
                    descExperiencia: request.body.desExperiencia,
                },
            );

            return response.status(200).json({
                experiencia,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async updateTitulo(request: Request | any, response: Response) {
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
            const repository = getRepository(Experiencia);
            const experiencia = await repository.update(
                { usuario: request.id, id: request.query.id },
                {
                    titulo: request.body.titulo,
                },
            );

            return response.status(200).json({
                experiencia,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async updateSubtitulo(request: Request | any, response: Response) {
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
            const repository = getRepository(Experiencia);
            const experiencia = await repository.update(
                { usuario: request.id, id: request.query.id },
                {
                    subtitulo: request.body.subtitulo,
                },
            );

            return response.status(200).json({
                experiencia,
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
            const repository = getRepository(Experiencia);
            const experiencia = await repository.delete({ usuario: request.id, id: request.query.id });

            return response.status(200).json({
                experiencia,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }
}

export default new ExperienciaController();
