mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    // Listar
    router.get("/tamano", function(req, res){
        connection.query("SELECT id, num, personas FROM tamano ORDER BY id", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Buscar
    router.get("/tamano/:id", function(req, res){
        connection.query("SELECT id, num, personas FROM tamano WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Insertar
    router.post("/tamano", function(req, res){
        connection.query("INSERT INTO tamano(num, personas) VALUES('" + req.body.num + "', '" + req.body.personas + "')", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Tamaño registrado");
            }
        });
    });

    // Modificar
    router.put("/tamano/:id", function(req, res){
        connection.query("UPDATE tamano SET num = " + req.body.num + ", personas = " + req.body.personas + "  WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Tamaño modificado");
            }
        });
    });

    // Eliminar
    router.delete("/tamano/:id", function(req, res){
        connection.query("DELETE FROM tamano WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Tamaño eliminado");
            }
        });
    });

}
module.exports = REST_ROUTER;