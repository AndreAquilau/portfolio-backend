import { diskStorage } from 'multer';
import { resolve, extname } from 'path';

const roudNumber: () => number = () => Math.floor(Math.random() * 10000 + 10000);

export default {
    storage: diskStorage({
        destination: async (request, file, callback) => {
            callback(null, resolve(__dirname, '..', '..', process.env.FILES_STATICS));
        },
        filename: (request, file, callback) => {
            callback(null, `${Date.now()}${roudNumber()}${extname(file.originalname)}`);
        },
    }),
};
