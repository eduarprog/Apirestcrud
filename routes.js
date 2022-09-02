//Dependencias
const express = require('express') 
const routes = express.Router()   


// Peticion para mostrar todos los registros de los profesores -------------
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no encontrada')

            conn.query('SELECT * FROM profesores', (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.json(rows)
            })
    })
})

// Peticion para insertar algun profesor -----------------------------------------
routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no econtrada')

            conn.query('INSERT INTO profesores set ?', [req.body], (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.send('El profesor ha sido insertado')
            })
    })
})

// Peticion para editar algun profesor ----------------------------------------------------------------
routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no encontrada')

            conn.query('UPDATE profesores set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.send('El profesor ha sido editado correctamente')
            })
    })
})


module.exports = routes