mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    // Listar
    router.get("/sabor", function(req, res){
        connection.query("SELECT id, nombre FROM sabor ORDER BY id", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Buscar
    router.get("/sabor/:id", function(req, res){
        connection.query("SELECT id, nombre FROM sabor WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Insertar
    router.post("/sabor", function(req, res){
        connection.query("INSERT INTO sabor(nombre) VALUES('" + req.body.nombre + "')", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Sabor registrado");
            }
        });
    });

    // Modificar
    router.put("/sabor/:id", function(req, res){
        connection.query("UPDATE sabor SET nombre = '" + req.body.nombre + "' WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Sabor modificado");
            }
        });
    });

    // Eliminar
    router.delete("/sabor/:id", function(req, res){
        connection.query("DELETE FROM sabor WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Sabor eliminado");
            }
        });
    });

}
module.exports = REST_ROUTER;