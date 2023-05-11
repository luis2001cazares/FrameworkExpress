const pool = require('../data/config');

//ruta de la app
const router = app => {
    //mostrar mensaje de bienvenida de root
    app.get('/',(request, response) => {
        response.send({
            message: 'Bienvenido Luis David Cazares Morales!'
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
    response.send('user eliminated');
      
    });
  
  
  });

  //AQUI VA LO DE LA TABLA PRODUCTOS
   //Mostrar todos los products
   app.get("/products", (request, response) => {
    pool.query("SELECT * FROM products", (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  //mostrar un solo products por id

  app.get('/products/:id', (request, response) =>{
const id =request.params.id;
pool.query('SELECT * FROM products WHERE id=?', id, (error, result)=>{
if (error) throw error; 
  
response.send(result);

});

  });

  //agregar un nvo products
  app.post('/users/:id', (request, response) =>{
  pool.query('INSERT INTO users SET ?',request.body, (error, result) =>{
    if (error) throw error;
    response.status(201).send(`products added with id:  ${result.insertId}`);

    
  });
});

//actualizar un products existente
app.put('/users/:id', (request, response)=>{
const id = request.params.id;

pool.query('UPDATE products SET ? WHERE id=?',[request.body,id], (error, result) =>{
  if (error) throw error;
  response.send('products updated');
    
  });


});

//eliminar usuario
app.delete('/products/:id', (request, response)=>{
  const id = request.params.id;
  
  pool.query('DELETE FROM products WHERE id=?',id, (error, result) =>{
    if (error) throw error;
    response.send('product eliminated');
      
    });
  
  
  });
}
// exportar el router
module.exports= router;