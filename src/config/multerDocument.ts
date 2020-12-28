import multer, { diskStorage, Options } from 'multer';
import { resolve, extname } from 'path';

const roudNumber: () => number = () => Math.floor(Math.random() * 10000 + 10000);

const multerConfing: Options = {
    fileFilter: (request, file, callback) => {
        // fazer o teste nos formatos de arquivos de entrada, caso seja diferente sera gerar um error
        if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Tipo de arquivo inválido para o tipo docx'));
        }
        // Caso passe no erro acima não sera passado nenhum erro no callback e true pra ir para o proximo middeware
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

export default multerConfing;
