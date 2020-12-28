import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import fs from 'fs';
import { resolve } from 'path';
import multerConfig from '../config/multer';
import RedeSocial from '../models/RedeSocial';
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

    async stored(request: any, response: Response) {
        return uploadIconRedeSocial(request, response, async (error) => {
            try {
                console.log(request.body.link);

                if (error) {
                    console.log('Erro ao fazer upload do arquivo tente novamente');
                    return response.status(400).json({
                        errors: ['Erro ao fazer upload do arquivo tente novamente'],
                    });
                }
                const { filename, originalname } = request.file;
                const repository = getRepository(RedeSocial);
                const redesocial = await repository.save({
                    link: request.body.link,
                    uploadIconLink: filename,
                    usuario: request.id,
                });
                console.log(redesocial);
                return response.status(201).json({
                    redesocial,
                });
            } catch (err) {
                console.log(err);
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
                const redesocialOne = await repository.findOne({ where: { id: request.query.id } });
                resolve;
                await fs.unlink(
                    resolve(__dirname, '..', '..', process.env.FILES_STATICS || '', redesocialOne.uploadIconLink),
                    (err) => {
                        if (err) {
                            TypeError(`Error remover file ${filename}: ${err}`);
                        }
                    },
                );

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
            console.log({ usuario: request.id, id: request.query.id });
            const repository = getRepository(RedeSocial);
            const redesocial = await repository.delete({ usuario: request.id, id: request.query.id });
            console.log(redesocial);
            return response.status(200).json({
                redesocial,
            });
        } catch (err) {
            console.log(err);
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }
}
export default new RedeSocialController();
