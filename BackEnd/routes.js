import express from "express";

const routes = express.Router(); 


routes.get('/', (req, res) => {
    res.send('Hello World');
});

routes.get('/rota2', (req, res) => {
    res.send('Nova Rota');
});

export { routes as default };