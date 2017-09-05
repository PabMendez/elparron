mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    // Listar
    router.get("/masaSabor", function(req, res){
        connection.query("SELECT id, nombre FROM masaSabor ORDER BY id", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Buscar
    router.get("/masaSabor/:id", function(req, res){
        connection.query("SELECT id, nombre FROM masaSabor WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });
    
    // Búsqueda  SABOR por MASA TIPO Y MASA SABOR
    router.get("/masaSabor/sabor/:masaTipo_id/:masaSabor_id", function(req, res){
        connection.query("SELECT s.id, s.nombre FROM sabor AS s INNER JOIN torta AS tor ON s.id = tor.sabor_id WHERE tor.masaTipo_id = " + req.params.masaTipo_id + " AND tor.masaSabor_id = " + req.params.masaSabor_id, function(err, rows){
            if(err) {
                res.json({"error": err});
            } else {
                var json = [];
                var anterior_id = 0;
                for (var item in rows) {
                    if(rows[item].id != anterior_id) {
                        json.push(
                            {
                                id: rows[item].id,
                                nombre: rows[item].nombre
                            }
                        );
                    }
                    anterior_id = rows[item].id;
                }
                res.json(json);
            }
        });
    });

    // Insertar
    router.post("/masaSabor", function(req, res){
        connection.query("INSERT INTO masaSabor(nombre) VALUES('" + req.body.nombre + "')", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Sabor de masa registrada");
            }
        });
    });

    // Modificar
    router.put("/masaSabor/:id", function(req, res){
        connection.query("UPDATE masaSabor SET nombre = '" + req.body.nombre + "' WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Sabor de masa modificada");
            }
        });
    });

    // Eliminar
    router.delete("/masaSabor/:id", function(req, res){
        connection.query("DELETE FROM masaSabor WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Sabor de masa eliminada");
            }
        });
    });

}
module.exports = REST_ROUTER;