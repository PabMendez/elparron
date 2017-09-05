mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    // Listar
    router.get("/precio", function(req, res){
        connection.query("SELECT * FROM precio ORDER BY id", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Buscar
    router.get("/precio/:id", function(req, res){
        connection.query("SELECT * FROM precio WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Insertar
    router.post("/precio", function(req, res){
        connection.query("INSERT INTO precio(precio) VALUES('" + req.body.precio + "')", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Precio registrado");
            }
        });
    });

    // Modificar
    router.put("/precio/:id", function(req, res){
        connection.query("UPDATE precio SET precio = " + req.body.precio + " WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Precio modificado");
            }
        });
    });

    // Eliminar
    router.delete("/precio/:id", function(req, res){
        connection.query("DELETE FROM precio WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Precio eliminado");
            }
        });
    });

}
module.exports = REST_ROUTER;