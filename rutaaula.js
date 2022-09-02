// Dependencias
const express = require('express')
const rutaaula = express.Router()

// Peticion para llamar a los todos registros ------------
rutaaula.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send('Ruta no econtrada')

        conn.query('SELECT * FROM aula', (err, rows)=>{
            if(err) return res.send("Ruta no encontrada")

            res.json(rows)
        })
})
})


// Peticion para insertar registros ----------------------------------------
rutaaula.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no encontrada')

            conn.query('INSERT INTO aula set ?', [req.body], (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.send('El aula ha sido insertada correctamente')
            })
    })
})

// Peticion para borrar algun registro -------------------------------------------------
rutaaula.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no encontrada')
            conn.query('DELETE FROM aula WHERE id = ?', [req.params.id], (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.send('El aula ha sido eliminada correctamente')
            })
    })
})


// Peticion para editar algun registro ---------------------------------------------------------------
rutaaula.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no encontrada')

            conn.query('UPDATE aula set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.send('El aula ha sido editada correctamente')
            })
    })
})


module.exports = rutaaula