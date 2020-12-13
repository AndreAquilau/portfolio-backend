import { Response, Request } from 'express';
import Endereco from 'src/models/Endereco';
import { getRepository } from 'typeorm';
import Controller from '../interface/Controller';

class EnderecoController implements Controller<Request, Response> {
    async index(request: Request, response: Response) {
        try {
            const repository = getRepository(Endereco);
            const enderecos = await repository.find();

            return response.status(200).json({
                enderecos,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async show(request: Request, response: Response) {
        try {
            const repository = getRepository(Endereco);
            const endereco = await repository.findOne({ where: { id: request.query.id } });

            return response.status(200).json({
                endereco,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async stored(request: Request, response: Response) {
        try {
            const repository = getRepository(Endereco);
            const endereco = await repository.save(request.body);

            return response.status(201).json({
                endereco,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async update(request: Request | any, response: Response) {
        try {
            const repository = getRepository(Endereco);
            const endereco = await repository.update({ usuario: request.id, id: request.query.id }, request.body);

            return response.status(200).json({
                endereco,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async delete(request: Request | any, response: Response) {
        try {
            const repository = getRepository(Endereco);
            const endereco = await repository.delete({ usuario: request.id, id: request.query.id });

            return response.status(200).json({
                endereco,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }
}

export default new EnderecoController();
