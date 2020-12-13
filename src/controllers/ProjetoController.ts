import { Response, Request } from 'express';
import Projeto from 'src/models/Projeto';
import { getRepository } from 'typeorm';
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
                errors: [err],
            });
        }
    }

    async show(request: Request, response: Response) {
        try {
            const repository = getRepository(Projeto);
            const projeto = await repository.findOne({ where: { id: request.query.id } });

            return response.status(200).json({
                projeto,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async stored(request: Request, response: Response) {
        try {
            const repository = getRepository(Projeto);
            const projeto = await repository.save(request.body);

            return response.status(201).json({
                projeto,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async updateTitulo(request: Request | any, response: Response) {
        try {
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
                errors: [err],
            });
        }
    }

    async updateDescProjeto(request: Request | any, response: Response) {
        try {
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
                errors: [err],
            });
        }
    }

    async updateLinkGithub(request: Request | any, response: Response) {
        try {
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
                errors: [err],
            });
        }
    }

    async updateLinkProjeto(request: Request | any, response: Response) {
        try {
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
                errors: [err],
            });
        }
    }

    async delete(request: Request | any, response: Response) {
        try {
            const repository = getRepository(Projeto);
            const projeto = await repository.delete({ usuario: request.id, id: request.query.id });

            return response.status(200).json({
                projeto,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }
}

export default new ProjetoController();
