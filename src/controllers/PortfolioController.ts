import { Response, Request } from 'express';
import Portfolio from 'src/models/Portfolio';
import { getRepository } from 'typeorm';
import multer from 'multer';
import multerConfig from '@config/multer';
import Controller from '../interface/Controller';

const uploadPhoto = multer(multerConfig).single('photo');
const uploadDocument = multer(multerConfig).single('document');

class PortfolioController implements Controller<Request, Response> {
    async index(request: Request, response: Response) {
        try {
            const repository = getRepository(Portfolio);
            const portfolios = await repository.find();

            return response.status(200).json({
                portfolios,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async show(request: Request, response: Response) {
        try {
            const repository = getRepository(Portfolio);
            const portfolio = await repository.findOne({ where: { id: request.query.id } });

            return response.status(200).json({
                portfolio,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async stored(request: Request, response: Response) {
        try {
            const repository = getRepository(Portfolio);

            const portfolio = await repository.save(request.body);

            return response.status(201).json({
                portfolio,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async updatePhoto(request: Request | any, response: Response) {
        return uploadPhoto(request, response, async (error) => {
            try {
                const { filename, originalname } = request.file;
                const repository = getRepository(Portfolio);
                const portfolio = await repository.update(
                    { usuario: request.id, id: request.query.id },
                    {
                        fileNamePhoto: originalname,
                        photo: filename,
                    },
                );

                return response.status(200).json({
                    portfolio,
                });
            } catch (err) {
                return response.status(400).json({
                    errors: [err],
                });
            }
        });
    }

    async updateTitulo(request: Request | any, response: Response) {
        try {
            const repository = getRepository(Portfolio);
            const portfolio = await repository.update(
                { usuario: request.id, id: request.query.id },
                { titulo: request.body.titulo },
            );

            return response.status(200).json({
                portfolio,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async updateSobre(request: Request | any, response: Response) {
        try {
            const repository = getRepository(Portfolio);
            const portfolio = await repository.update(
                { usuario: request.id, id: request.query.id },
                { titulo: request.body.sobre },
            );

            return response.status(200).json({
                portfolio,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }

    async updateDocument(request: Request | any, response: Response) {
        return uploadDocument(request, response, async (error) => {
            try {
                const { filename, originalname } = request.file;
                const repository = getRepository(Portfolio);
                const portfolio = await repository.update(
                    { usuario: request.id, id: request.query.id },
                    {
                        nameDocSobre: originalname,
                        uploadDocSobre: filename,
                    },
                );

                return response.status(200).json({
                    portfolio,
                });
            } catch (err) {
                return response.status(400).json({
                    errors: [err],
                });
            }
        });
    }

    async delete(request: Request | any, response: Response) {
        try {
            const repository = getRepository(Portfolio);
            const portfolio = await repository.delete({ usuario: request.id, id: request.query.id });

            return response.status(200).json({
                portfolio,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err],
            });
        }
    }
}

export default new PortfolioController();
