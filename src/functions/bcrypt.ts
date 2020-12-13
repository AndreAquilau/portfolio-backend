import bcrypt from 'bcrypt';

export const genHash = async (pass) => {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS));
        const hash = await bcrypt.hash(pass, salt);
        return hash;
    } catch (err) {
        return err;
    }
};

export const compare = async (pass, hash) => {
    try {
        const response = await bcrypt.compare(pass, hash);
        return response;
    } catch (err) {
        return err;
    }
};
