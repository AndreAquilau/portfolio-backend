import { Response, Request } from 'express';
import Usuario from 'src/models/Usuario';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import Controller from '../interface/Controller';
import { compare } from '../functions/bcrypt';

class LoginController implements Controller<Request, Response> {
    async stored(request: Request, response: Response) {
        try {
            console.log(request.body);
            const { senha, usuario } = request.body;
            const repository = getRepository(Usuario);
            const res = await repository.findOne({ where: { nome: usuario } });

            const verify = await compare(senha, res.senha);

            if (!verify) {
                return response.status(403).json({
                    errors: ['User Is Not Authorization!!!'],
                });
            }
            const token = jwt.sign(
                { id: res.id, usuario, admin: res.admin, updated: res.updated },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: '1h',
                },
            );

            return response.status(200).json({
                token,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }
}

export default new LoginController();
