import { Response, Request } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import fs from 'fs';
import { resolve } from 'path';
import multerConfigImage from '../config/multerImage';
import multerConfigDocument from '../config/multerDocument';
import Portfolio from '../models/Portfolio';
import Controller from '../interface/Controller';

const uploadPhoto = multer(multerConfigImage).single('photo');
const uploadDocument = multer(multerConfigDocument).single('document');

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
            const repository = getRepository(Portfolio);
            const portfolio = await repository.findOne({ where: { id: request.query.id } });

            return response.status(200).json({
                portfolio,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
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
                errors: [err.message],
            });
        }
    }

    async updatePhoto(request: Request | any, response: Response) {
        return uploadPhoto(request, response, async (error: any) => {
            try {
                if (error) {
                    console.log(`${error.field}`);
                    throw new TypeError(`${error.field}`);
                }
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
                const repository = getRepository(Portfolio);
                const portfolios = await repository.findOne({ where: { id: request.query.id } });

                await fs.unlink(
                    resolve(__dirname, '..', '..', process.env.FILES_STATICS || '', portfolios.photo),
                    (err) => {
                        if (err) {
                            TypeError(`Error remover file ${filename}: ${err}`);
                        }
                    },
                );

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
                console.log(err);
                return response.status(400).json({
                    errors: [err.message],
                });
            }
        });
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

    async updateSubTitulo(request: Request | any, response: Response) {
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
            const repository = getRepository(Portfolio);
            const portfolio = await repository.update(
                { usuario: request.id, id: request.query.id },
                { subtitulo: request.body.subtitulo },
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

    async updateMessageDownload(request: Request | any, response: Response) {
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
            const repository = getRepository(Portfolio);
            const portfolio = await repository.update(
                { usuario: request.id, id: request.query.id },
                { messageDownload: request.body.messageDownload },
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
            const repository = getRepository(Portfolio);
            const portfolio = await repository.update(
                { usuario: request.id, id: request.query.id },
                { sobre: request.body.sobre },
            );

            return response.status(200).json({
                portfolio,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }

    async updateDocument(request: Request | any, response: Response) {
        return uploadDocument(request, response, async (error) => {
            try {
                if (error) {
                    console.log(`${error.field}`);
                    throw new TypeError(`${error.field}`);
                }
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
                const repository = getRepository(Portfolio);
                const portfolios = await repository.findOne({ where: { id: request.query.id } });

                await fs.unlink(
                    resolve(__dirname, '..', '..', process.env.FILES_STATICS || '', portfolios.uploadDocSobre),
                    (err) => {
                        if (err) {
                            TypeError(`Error remover file ${filename}: ${err}`);
                        }
                    },
                );

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
            const repository = getRepository(Portfolio);
            const portfolio = await repository.delete({ usuario: request.id, id: request.query.id });

            return response.status(200).json({
                portfolio,
            });
        } catch (err) {
            return response.status(400).json({
                errors: [err.message],
            });
        }
    }
}

export default new PortfolioController();
