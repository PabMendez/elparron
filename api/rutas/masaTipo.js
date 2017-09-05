mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    // Listar
    router.get("/masaTipo", function(req, res){
        connection.query("SELECT id, nombre FROM masaTipo ORDER BY id", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Buscar
    router.get("/masaTipo/:id", function(req, res){
        connection.query("SELECT id, nombre FROM masaTipo WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Búsqueda por ID
    router.get("/masaTipo/masaSabor/:id", function(req, res){
        connection.query("SELECT ms.id, ms.nombre FROM masaSabor AS ms INNER JOIN torta AS tor ON ms.id = tor.masaSabor_id WHERE tor.masaTipo_id = " + req.params.id, function(err, rows){
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
    router.post("/masaTipo", function(req, res){
        connection.query("INSERT INTO masaTipo(nombre) VALUES('" + req.body.nombre + "')", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Tipo de masa registrada");
            }
        });
    });

    // Modificar
    router.put("/masaTipo/:id", function(req, res){
        connection.query("UPDATE masaTipo SET nombre = '" + req.body.nombre + "' WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Tipo de masa modificada");
            }
        });
    });

    // Eliminar
    router.delete("/masaTipo/:id", function(req, res){
        connection.query("DELETE FROM masaTipo WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Tipo de masa eliminada");
            }
        });
    });

}
module.exports = REST_ROUTER;