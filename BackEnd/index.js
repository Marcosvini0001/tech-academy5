import express from 'express';
import routes from './routes.js';

const app = express(); //inicializa o servidor
const port = 3000;

app.use(routes);

app.listen(port, () => {
    console.log('server runni on port', port)
});