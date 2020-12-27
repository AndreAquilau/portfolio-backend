import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import Projeto from '../models/Projeto';
import Controller from '../interface/Controller';

class ProjetoController implements Controller<Request, Response> {
    async index(request: Request, response: Response) {
        try {
            const repository = getRepository(Projeto);
            const projetos = await repository.find();

            return response.status(200).json({
                projetos,
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
            const repository = getRepository(Projeto);
            const projeto = await repository.findOne({ where: { id: request.query.id } });

            return response.status(200).json({
                projeto,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async stored(request: any, response: Response) {
        try {
            const repository = getRepository(Projeto);
            const projeto = await repository.save({
                descProjeto: request.body.descProjeto,
                titulo: request.body.titulo,
                linkGithub: request.body.linkGithub,
                linkProjeto: request.body.linkProjeto,
                usuario: request.id,
            });

            return response.status(201).json({
                projeto,
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
            const repository = getRepository(Projeto);
            const projeto = await repository.update(
                { usuario: request.id, id: request.query.id },
                { titulo: request.body.titulo },
            );

            return response.status(200).json({
                projeto,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async updateDescProjeto(request: Request | any, response: Response) {
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
            const repository = getRepository(Projeto);
            const projeto = await repository.update(
                { usuario: request.id, id: request.query.id },
                { descProjeto: request.body.descProjeto },
            );

            return response.status(200).json({
                projeto,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async updateLinkGithub(request: Request | any, response: Response) {
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
            const repository = getRepository(Projeto);
            const projeto = await repository.update(
                { usuario: request.id, id: request.query.id },
                { linkGithub: request.body.linkGithub },
            );

            return response.status(200).json({
                projeto,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async updateLinkProjeto(request: Request | any, response: Response) {
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
            const repository = getRepository(Projeto);
            const projeto = await repository.update(
                { usuario: request.id, id: request.query.id },
                { linkProjeto: request.body.linkProjeto },
            );

            return response.status(200).json({
                projeto,
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
            const repository = getRepository(Projeto);
            const projeto = await repository.delete({ usuario: request.id, id: request.query.id });

            return response.status(200).json({
                projeto,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }
}

export default new ProjetoController();
