import { Response, Request } from 'express';
import Contato from 'src/models/Contato';
import { getRepository } from 'typeorm';
import Controller from '../interface/Controller';

class ContatoController implements Controller<Request, Response> {
    async index(request: Request, response: Response) {
        try {
            const repository = getRepository(Contato);
            const contatos = await repository.find();

            return response.status(200).json({
                contatos,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async show(request: Request, response: Response) {
        try {
            const repository = getRepository(Contato);
            const contato = await repository.findOne({ where: { id: request.query.id } });

            return response.status(200).json({
                contato,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async stored(request: Request | any, response: Response) {
        try {
            const { conteudo, tipo } = request.body;
            const repository = getRepository(Contato);
            const contato = await repository.save({
                conteudo,
                tipo,
                usuario: request.id,
            });

            return response.status(201).json({
                contato,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async update(request: Request | any, response: Response) {
        try {
            const repository = getRepository(Contato);
            const contato = await repository.update({ usuario: request.id, id: request.query.id }, request.body);

            return response.status(200).json({
                contato,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async delete(request: Request | any, response: Response) {
        try {
            const repository = getRepository(Contato);
            const contato = await repository.delete({ usuario: request.id, id: request.query.id });

            return response.status(200).json({
                contato,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }
}
export default new ContatoController();
