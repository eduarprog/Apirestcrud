// Dependencias 
const express = require('express')
const rutaalumnos = express.Router() 

// Peticion para llamar a los todos los registros ----------------------
rutaalumnos.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send('Ruta no encontrada')

        conn.query('SELECT * FROM alumnos', (err, rows)=>{
            if(err) return res.send('Su peticion no ha sido encontrada')

            res.json(rows)
        })
     })
})

// Peticion para insertar algun registro -------------------------------------
rutaalumnos.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no encontrada')

            conn.query('INSERT INTO alumnos set ?', [req.body], (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.send('El alumno ha sido insertado correctamente')
            })
    })
})

// Peticion para editar algun registro ---------------------------------------------------------------
rutaalumnos.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no encontrada')

            conn.query('UPDATE alumnos set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.send('El alumno ha sido modificado correctamente')
            })
    })
})

// Peticion para borrar algun registro ---------------------------------------------------
rutaalumnos.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no encontrada')

            conn.query('DELETE FROM alumnos WHERE id = ?', [req.params.id], (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.send('El alumno ha sido eliminado correctamente')
            })
    })
})

module.exports = rutaalumnos 