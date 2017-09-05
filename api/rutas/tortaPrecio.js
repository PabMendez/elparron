mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    // Listar
    /* router.get("/tortaPrecio", function(req, res){
        connection.query("SELECT * FROM tortaPrecio ORDER BY id", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    }); */

    // Buscar
    router.get("/tortaPrecio/:id", function(req, res){
        connection.query("SELECT * FROM tortaPrecio WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json(rows);
            }
        });
    });

    // Buascar tortaPrecio con detalle
	router.get("/tortaPrecio", function(req, res){
		connection.query(
			 `SELECT TP.id,
                    TOR.id AS torta_id,
                    MTP.id AS masaTipo_id,
					MTP.nombre AS masaTipo_nombre,
					MSB.id AS masaSabor_id,
					MSB.nombre AS masaSabor_nombre,
					SAB.id AS sabor_id,
					SAB.nombre AS sabor_nombre,
                    TAM.id AS tamano_id,
                    TAM.num AS num,
                    TAM.personas AS personas,
                    PRE.id AS precio_id,
                    PRE.precio AS torta_precio
            FROM tortaPrecio TP INNER JOIN torta TOR ON TP.torta_id = TOR.id
                                    INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
					                INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
					                INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
                                    INNER JOIN tamano TAM ON TP.tamano_id = TAM.id
                                    INNER JOIN precio PRE ON TP.precio_id = PRE.id
			ORDER	BY
					TP.id`, function (err, rows) {
                if (err) {
                    res.json({ "error": err });
                } else {
                    res.json(rows);
                }
            });
    });


    // Insertar
    router.post("/tortaPrecio", function(req, res){
        connection.query("INSERT INTO tortaPrecio(torta_id, tamano_id, precio_id) VALUES('" + req.body.torta_id + "', '" + req.body.tamano_id + "', '" + req.body.precio_id + "')", function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Precio-Torta registrado");
            }
        });
    });

    // Modificar
    router.put("/tortaPrecio/:id", function(req, res){
        connection.query("UPDATE tortaPrecio SET torta_id = " + req.body.torta_id + ", tamano_id = " + req.body.tamano_id + ", precio_id = " + req.body.precio_id + "  WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Precio-Torta modificado");
            }
        });
    });

    // Eliminar
    router.delete("/tortaPrecio/:id", function(req, res){
        connection.query("DELETE FROM tortaPrecio WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("Precio-Torta eliminado");
            }
        });
    });

}
module.exports = REST_ROUTER;