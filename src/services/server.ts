import 'dotenv/config';
import db from '../database';
import app from './App';

db()
    .then(() => {
        console.log(`Connection DataBase Success`);
        app.emit('DataBase Online');
    })
    .catch((err) => {
        console.log(err);
    });

app.on('DataBase Online', () => {
    app.listen(process.env.PORT, () => {
        console.log(`${process.env.BASE_URL}:${process.env.PORT}`);
    });
});
