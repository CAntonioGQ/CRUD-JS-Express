const express = require('express')
const mysql =  require('mysql')
const cors = require('cors');

const app = express()

app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use(express.json())

const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'articulosdb'
})

//Probar Conexion
conexion.connect(function(error){
    if(error){
        throw error
    }else{
        console.log("La Conexion es Exitosa!")
    }
})

app.get('/', function(req,res){
    res.send('Ruta Inicio')
})

//Mostrar Todos los Articulos
app.get('/api/articulos',(req,res)=>{
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})

//Mostrar Un Solo Articulo
app.get('/api/articulos/:id',(req,res)=>{
    conexion.query('SELECT * FROM articulos WHERE id = ?',[req.params.id], (error,fila)=>{
        if(error){
            throw error
        }else{
            res.send(fila)
            //Para un solo campo en particular: (Para ver la descripcion)
            //res.send(fila[0].descripcion)
        }
    })
})

//Crear un articulo
app.post('/api/articulos',(req,res)=>{
    let data = {descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock}
    let sql = "INSERT INTO articulos SET ?"
    conexion.query(sql, data, function(error, results){
        if(error){
            throw error
        }else{
            res.send(results)
        }
    })
})

//Editar Archivos
app.put('/api/articulos/:id',(req,res)=>{
    
    let id = req.params.id
    let descripcion = req.body.descripcion
    let precio = req.body.precio
    let stock = req.body.stock
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?"
    conexion.query(sql, [descripcion,precio,stock, id], function(error, filas){
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
})

//eliminar articulo
// Eliminar articulo
app.delete('/api/articulos/:id', (req, res) => {
    conexion.query('DELETE FROM articulos WHERE id = ?', [req.params.id], function(error, result) {
        if (error) {
            throw error;
        } else {
            console.log("Articulo eliminado correctamente");
            res.status(204).end(); // Devolver una respuesta sin contenido
        }
    });
});


const puerto = process.env.PUERTO || 5500


app.listen(puerto, function(){
    console.log("Server OK en puerto:"+puerto)
})

