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
    //mostrar un solo usuario por ID
    app.get('/users/:id', (request, response) => {
        pool.query('SELECT * FROM users WHERE id = ?', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //agregar un nuevo usuario
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;
            response.status(201).send('User added with ID: ${result.insertId}');
        });
    });
    //Actualizar un usuario existente
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('UPDATE users sET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
            response.send('User updated successfully.');
        });
    });
    //mostrar todos los usuarios
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM users WHERE id = ?', id,(error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}
// exportar el router
module.exports= router;