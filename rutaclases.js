// Dependencias 
const express = require('express')
const rutaclases = express.Router()


// Peticion para llamar a todos los registros -----------------------------
rutaclases.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send('Ruta no encontrada')

        conn.query('SELECT * FROM politecnico', (err, rows)=>{
            if(err) return res.send('Su peticion no ha sido encontrada')

            res.json(rows)
        })
})
})

// Peticion para insertar registros -------------------------------------------------
rutaclases.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no encontrada')

            conn.query('INSERT INTO politecnico set ?', [req.body], (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.send('Las clases y horarios han sido insertados correctamente')
            })
    })
})

// Peticion para borrar algun registro --------------------------------------------------------
rutaclases.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no encontrada')

            conn.query('DELETE FROM politecnico WHERE id = ?', [req.params.id], (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.send('El horario y plan de estudio ha sido eliminado correctamente')
            })
    })
})


// Peticion para editar algun registro -------------------------------------------------------------------
rutaclases.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
            if(err) return res.send('Ruta no encontrada')

            conn.query('UPDATE politecnico set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
                if(err) return res.send('Su peticion no ha sido encontrada')

                res.send('Ha sido editado correctamente')
            })
    })
})

module.exports = rutaclases