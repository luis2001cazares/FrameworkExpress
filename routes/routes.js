const pool = require('../data/config');

//ruta de la app
const router = app => {
    //mostrar mensaje de bienvenida de rrot
    app.get('/',(request, response) => {
        response.send({
            message: 'Bienvenido a Node.js Express REST API!'
        });
    });
    //mostrar todos los usuarios
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });
}
// exportar el router
module.exports= router;