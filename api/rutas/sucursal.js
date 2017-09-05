mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    // Listar
    router.get("/sucursal", function(req, res){
    	connection.query("SELECT id, nombre, direccion, comuna FROM sucursal ORDER BY id", function(err, rows){
    		if(err){
    			res.json({"error": err});
    		}else{
    			res.json(rows);
    		}
    	});
    });

    // Buscar
    router.get("/sucursal/:id", function(req, res){
    	connection.query("SELECT id, nombre, direccion, comuna FROM sucursal WHERE id = " + req.params.id, function(err, rows){
    		if(err){
    			res.json({"error": err});
    		}else{
    			res.json(rows);
    		}
    	});
    });

    // Insertar
    router.post("/sucursal", function(req, res){
        connection.query("INSERT INTO sucursal(nombre, direccion, comuna) VALUES('" + req.body.nombre + "', '" + req.body.direccion + "', '" + req.body.comuna + "')", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Sucursal registrada");
            }
        });
    });
    
    // Modificar
	router.put("/sucursal/:id", function(req, res){
    	connection.query("UPDATE sucursal SET nombre = '" + req.body.nombre + "', direccion = '" + req.body.direccion + "', comuna = '" + req.body.comuna + "' WHERE id = " + req.params.id, function(err, rows){
    		if(err){
    			res.json({"error": err});
    		}else{
    			res.json("Sucursal modificada");
    		}
    	});
    });

    // Eliminar
	router.delete("/sucursal/:id", function(req, res){
    	connection.query("DELETE FROM sucursal WHERE id = " + req.params.id, function(err, rows){
    		if(err){
    			res.json({"error": err});
    		}else{
    			res.json("Sucursal Eliminada");
    		}
    	});
    });

}
module.exports = REST_ROUTER;