const pool = require('../data/config');

//ruta de la app
const router = app => {
    //mostrar mensaje de bienvenida de rrot
    app.get('/',(request, response) => {
        response.send({
            message: 'Bienvenido a Node.js Express REST API!'
        });
    });
     //Mostrar todos los usuarios
  app.get("/users", (request, response) => {
    pool.query("SELECT * FROM users", (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  //mostrar un solo usuario por id

  app.get('/users/:id', (request, response) =>{
const id =request.params.id;
pool.query('SELECT * FROM users WHERE id=?', id, (error, result)=>{
if (error) throw error; 
  
response.send(result);

});

  });

  //agregar un nvo usuario
  app.post('/users/:id', (request, response) =>{
  pool.query('INSERT INTO users SET ?',request.body, (error, result) =>{
    if (error) throw error;
    response.status(201).send(`User added with id:  ${result.insertId}`);

    
  });
});

//actualizar un usuario existente
app.put('/users/:id', (request, response)=>{
const id = request.params.id;

pool.query('UPDATE users SET ? WHERE id=?',[request.body,id], (error, result) =>{
  if (error) throw error;
  response.send('user updated');
    
  });


});

//eliminar usuario
app.delete('/users/:id', (request, response)=>{
  const id = request.params.id;
  
  pool.query('DELETE FROM users WHERE id=?',id, (error, result) =>{
    if (error) throw error;
    response.send('user updated');
      
    });
  
  
  });
}
// exportar el router
module.exports= router;