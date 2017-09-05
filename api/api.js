mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    /************************************rutas de tipoMasa********************************************/

    // LISTAR TODOS
    router.get("/tipoMasa", function(req, res){
        connection.query("SELECT * FROM tipoMasa", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // LISTAR POR ID
    router.get("/tipoMasa/:id", function(req, res){
        connection.query("SELECT * FROM tipoMasa WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // LISTAR ID DE SABOR
    router.get("/tipoMasa/saborMasa/:id", function(req, res){
        connection.query("SELECT ms.id, ms.nombre FROM masaSabor AS ms INNER JOIN torta AS tor ON ms.id = tor.masaSabor_id WHERE tor.masaTipo_id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });

    });

    // INSERTAR 
    router.post("/tipoMasa", function(req, res){
        connection.query("INSERT INTO tipoMasa(nombre) VALUES('" + req.body.nombre + "')", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("tipoMasa registrada");
            }
        });
    });

    // ACTUALIZAR POR ID
    router.put("/tipoMasa/:id", function(req, res){
        connection.query("UPDATE tipoMasa SET nombre = '" + req.body.nombre + "' WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("tipoMasa modificada");
            }
        });
    });

    // BORRAR
    router.delete("/tipoMasa/:id", function(req, res){
        connection.query("DELETE FROM tipoMasa WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("tipoMasa Eliminada");
            }
        });
    });

    /***********************************************rutas para SABOR*********************************************/

    // LISTAR TODOS
    router.get("/sabor", function(req, res){
        connection.query("SELECT SAB.id, SAB.nombre AS nombre, TIP.id AS tipoMasa_id, TIP.nombre AS tipoMasa_nombre FROM sabor SAB INNER JOIN tipoMasa TIP ON TIP.id = SAB.tipoMasa_id", 
            function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // LISTAR POR ID
    router.get("/sabor/:id", function(req, res){
        connection.query("SELECT SAB.id, SAB.nombre AS nombre, TIP.id AS tipoMasa_id, TIP.nombre AS tipoMasa_nombre FROM sabor SAB INNER JOIN tipoMasa TIP ON TIP.id = SAB.tipoMasa_id WHERE SAB.id = " + req.params.id, 
            function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });
    // INSERTAR A LA BD
    router.post("/sabor", function(req, res){
        connection.query("INSERT INTO sabor(nombre, tipoMasa_id) VALUES('" + req.body.nombre + "','" + req.body.tipoMasa_id + "')", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("sabor registrada");
            }
        });
    });

    // ACTUALIZAR POR ID
    router.put("/sabor/:id", function(req, res){
        connection.query("UPDATE sabor SET nombre = '" + req.body.nombre + "', tipoMasa_id = '" + req.body.tipoMasa_id + "' WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("sabor modificada");
            }
        });
    });

    // BORRAR
    router.delete("/sabor/:id", function(req, res){
        connection.query("DELETE FROM sabor WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("sabor Eliminada");
            }
        });
    });

    /**********************************************Rutas para Historico**********************************************************/

    // LISTAR POR FECHA
    router.get("/historico/:fecha", function(req, res){
        connection.query("SELECT hc.id, hc.fecha, hc.sucursal_id, suc.nombre AS sucursal_nombre, hd.sabor_id, sab.nombre AS sabor_nombre, hd.personas, hd.cantidad FROM historicoCab AS hc INNER JOIN sucursal AS suc ON suc.id = hc.sucursal_id INNER JOIN historicodet AS hd ON hc.id = hd.historicoCab_id  INNER JOIN sabor AS sab ON hd.sabor_id = sab.id WHERE  fecha = " + req.params.fecha, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // INSERTAR A LA BD
    router.post("/historico", function(req, res){
        connection.query("INSERT INTO historicoCab (fecha,sucursal_id) VALUES('" + req.body.fecha + "','" + req.body.sucursal_id + "')", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("registrada");
            }
        });
    });

    // ACTUALIZAR POR ID
    router.put("/historico/:id", function(req, res){
        connection.query("UPDATE sabor SET nombre = '" + req.body.nombre + "' WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("sabor modificada");
            }
        });
    });

    // BORRAR
    router.delete("/historico/:id", function(req, res){
        connection.query("DELETE FROM sabor WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("sabor Eliminada");
            }
        });
    });

}
module.exports = REST_ROUTER;