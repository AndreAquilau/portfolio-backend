import multer, { diskStorage, FileFilterCallback, Options } from 'multer';
import { resolve, extname } from 'path';

const roudNumber: () => number = () => Math.floor(Math.random() * 10000 + 10000);

const multerImage: Options = {
    fileFilter: (request, file, callback: FileFilterCallback) => {
        // fazer o teste nos formatos de arquivos de entrada, caso seja diferente sera gerar um error

        if (file.mimetype !== 'image/svg+xml' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            callback(
                new multer.MulterError(
                    'LIMIT_UNEXPECTED_FILE',
                    'Tipo de arquivo inválido para o tipo png e jpeg e svg',
                ),
            );
        }
        callback(null, true);
    },
    storage: diskStorage({
        destination: async (request, file, callback) => {
            callback(null, resolve(__dirname, '..', '..', process.env.FILES_STATICS));
        },
        filename: (request, file, callback) => {
            callback(null, `${Date.now()}${roudNumber()}${extname(file.originalname)}`);
        },
    }),
};

export default multerImage;
