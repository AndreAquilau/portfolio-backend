import { Response, Request } from 'express';
import RedeSocial from 'src/models/RedeSocial';
import { getRepository } from 'typeorm';
import multer from 'multer';
import multerConfig from '@config/multer';
import Controller from '../interface/Controller';

const uploadIconRedeSocial = multer(multerConfig).single('iconRedeSocial');

class RedeSocialController implements Controller<Request, Response> {
    async index(request: Request, response: Response) {
        try {
            const repository = getRepository(RedeSocial);
            const redesociais = await repository.find();

            return response.status(200).json({
                redesociais,
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
            const repository = getRepository(RedeSocial);
            const redesocial = await repository.findOne({ where: { id: request.query.id } });

            return response.status(200).json({
                redesocial,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async stored(request: Request, response: Response) {
        return uploadIconRedeSocial(request, response, async (error) => {
            try {
                if (error) {
                    return response.status(400).json({
                        errors: ['Erro ao fazer upload do arquivo tente novamente'],
                    });
                }
                const { filename, originalname } = request.file;
                const repository = getRepository(RedeSocial);
                const redesocial = await repository.save({
                    link: request.body.link,
                    uploadIconLink: filename,
                });

                return response.status(201).json({
                    redesocial,
                });
            } catch (err) {
                return response.status(400).json({
                    errors: [err.message],
                });
            }
        });
    }

    async updateLink(request: Request | any, response: Response) {
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
            const repository = getRepository(RedeSocial);
            const redesocial = await repository.update(
                { usuario: request.id, id: request.query.id },
                { link: request.body.link },
            );

            return response.status(200).json({
                redesocial,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async updateIconLink(request: Request | any, response: Response) {
        return uploadIconRedeSocial(request, response, async (error) => {
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
            const { filename, originalname } = request.file;
            try {
                const repository = getRepository(RedeSocial);
                const redesocial = await repository.update(
                    { usuario: request.id, id: request.query.id },
                    {
                        uploadIconLink: filename,
                    },
                );

                return response.status(201).json({
                    redesocial,
                });
            } catch (err) {
                return response.status(400).json({
                    errors: [err.message],
                });
            }
        });
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
            const repository = getRepository(RedeSocial);
            const redesocial = await repository.delete({ usuario: request.id, id: request.query.id });

            return response.status(200).json({
                redesocial,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }
}
export default new RedeSocialController();
