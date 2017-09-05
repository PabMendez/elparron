mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5) {

    // Listar
    router.get("/pedidoEspecial", function (req, res) {
        connection.query(
             `SELECT PES.id,
                    TOR.id AS torta_id,
                    MTP.id AS masaTipo_id,
					MTP.nombre AS masaTipo_nombre,
					MSB.id AS masaSabor_id,
					MSB.nombre AS masaSabor_nombre,
					SAB.id AS sabor_id,
					SAB.nombre AS sabor_nombre,
                    PES.solicitante AS solicitante,
                    PES.telefono AS telefono,
                    TAM.id AS tamano_id,
                    TAM.num AS num,
                    TAM.personas AS personas,
                    PES.precio AS precio,
                    DATE_FORMAT(PES.fechaEntrega,'%d/%m/%Y') AS fechaEntrega,
                    SUC.id AS sucursal_id,
                    SUC.nombre AS sucursal_nombre,
                    PES.caracteristicas AS caracteristicas,
                    PES.mensaje AS mensaje,
                    PES.abono AS abono,
                    PES.forma AS forma,
                    PES.diet AS diet
            FROM pedidoEspecial PES INNER JOIN torta TOR ON PES.torta_id = TOR.id
                                    INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
					                INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
					                INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
                                    INNER JOIN tamano TAM ON PES.tamano_id = TAM.id
                                    INNER JOIN sucursal SUC ON PES.sucursal_id = SUC.id
            ORDER BY PES.id`, function (err, rows) {
                if (err) {
                    res.json({ "error": err });
                    //console.log(err);
                } else {
                    res.json(rows);
                }
            });
    });

    // Listar por fecha y sucursal
    	// Buascar pedidoEspecial por dia y sucursal
	router.get("/pedidoEspecial/:fechaEntrega/:sucursal_id", function(req, res){
		connection.query(
			 `SELECT PES.id,
                    TOR.id AS torta_id,
                    MTP.id AS masaTipo_id,
					MTP.nombre AS masaTipo_nombre,
					MSB.id AS masaSabor_id,
					MSB.nombre AS masaSabor_nombre,
					SAB.id AS sabor_id,
					SAB.nombre AS sabor_nombre,
                    PES.solicitante AS solicitante,
                    PES.telefono AS telefono,
                    TAM.id AS tamano_id,
                    TAM.num AS num,
                    TAM.personas AS personas,
                    PES.precio AS precio,
                    DATE_FORMAT(PES.fechaEntrega,'%H:%i') AS fechaEntrega,
                    SUC.id AS sucursal_id,
                    SUC.nombre AS sucursal_nombre,
                    PES.caracteristicas AS caracteristicas,
                    PES.mensaje AS mensaje,
                    PES.abono AS abono,
                    PES.forma AS forma,
                    PES.diet AS diet
            FROM pedidoEspecial PES INNER JOIN torta TOR ON PES.torta_id = TOR.id
                                    INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
					                INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
					                INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
                                    INNER JOIN tamano TAM ON PES.tamano_id = TAM.id
                                    INNER JOIN sucursal SUC ON PES.sucursal_id = SUC.id
			WHERE   DATE_FORMAT(fechaEntrega, "%Y%m%d") = "` + req.params.fechaEntrega + `" AND
                    SUC.id = ` + req.params.sucursal_id + ` AND
                    DATE_FORMAT(PES.fechaEntrega, "%Y%m%d") 
			ORDER	BY
					PES.id`, function (err, rows) {
                if (err) {
                    res.json({ "error": err });
                } else {
                    res.json(rows);
                }
            });
    });
    // Listar por fecha y sucursal
    	// Buascar pedidoEspecial por dia y sucursal
	router.get("/pedidoEspecialStock/:sucursal_id", function(req, res){
		connection.query(
			 `SELECT PES.id,
                    TOR.id AS torta_id,
                    MTP.id AS masaTipo_id,
					MTP.nombre AS masaTipo_nombre,
					MSB.id AS masaSabor_id,
					MSB.nombre AS masaSabor_nombre,
					SAB.id AS sabor_id,
					SAB.nombre AS sabor_nombre,
                    PES.solicitante AS solicitante,
                    PES.telefono AS telefono,
                    TAM.id AS tamano_id,
                    TAM.num AS num,
                    TAM.personas AS personas,
                    PES.precio AS precio,
                    DATE_FORMAT(PES.fechaEntrega,'%H:%i') AS fechaEntrega,
                    SUC.id AS sucursal_id,
                    SUC.nombre AS sucursal_nombre,
                    PES.caracteristicas AS caracteristicas,
                    PES.mensaje AS mensaje,
                    PES.abono AS abono,
                    PES.forma AS forma,
                    PES.diet AS diet
            FROM pedidoEspecial PES INNER JOIN torta TOR ON PES.torta_id = TOR.id
                                    INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
					                INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
					                INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
                                    INNER JOIN tamano TAM ON PES.tamano_id = TAM.id
                                    INNER JOIN sucursal SUC ON PES.sucursal_id = SUC.id
			WHERE   SUC.id = ` + req.params.sucursal_id + ` 
			ORDER	BY
					PES.id`, function (err, rows) {
                if (err) {
                    res.json({ "error": err });
                } else {
                    res.json(rows);
                }
            });
    });

    // Listar
    router.get("/pedidoEspecial/:id", function (req, res) {
        connection.query(`
                SELECT NET.id, 
                TOR.id AS torta_id, 
                NET.solicitante AS solicitante, 
                NET.telefono AS telefono, 
                DATE_FORMAT(NET.fechaEntrega,'%d/%m/%Y') AS fechaEntrega, 
                NET.precio AS precio 
                FROM pedidoEspecial NET 
                INNER JOIN torta TOR ON NET.torta_id = TOR.id 
                WHERE NET.id = ` + req.params.id, function (err, rows) {
                if (err) {
                    res.json({ "error": err });
                } else {
                    res.json(rows);
                }
            });
    });

    // Insertar
    router.post("/pedidoEspecial", function(req, res){
        connection.query(`INSERT INTO pedidoEspecial(
                                      torta_id, 
                                      solicitante, 
                                      telefono, 
                                      tamano_id, 
                                      precio,
                                      fechaEntrega, 
                                      sucursal_id,
                                      caracteristicas,
                                      mensaje,
                                      abono,
                                      forma,
                                      diet,
                                      saldo
                                      ) 
                        VALUES(
                            ` + req.body.torta_id + `,
                            '` + req.body.solicitante + `',
                            '` + req.body.telefono + `',
                            '` + req.body.tamano_id + `',
                            '` + req.body.precio + `',
                            '` + req.body.fechaEntrega + `',
                            '` + req.body.sucursal_id + `',
                            '` + req.body.caracteristicas + `',
                            '` + req.body.mensaje + `',
                            '` + req.body.abono + `',
                            '` + req.body.forma + `',
                            '` + req.body.diet + `',
                            '` + req.body.saldo + `')`,
                            
                            function(err, rows) {
            if(err){
                res.json({"error": err});
                console.log(err);
            }else{
                res.json("pedido especial registrado");
            }
        });
    });

    // Modificar
    router.put("/pedidoEspecial/:id", function(req, res){
        connection.query("UPDATE pedidoEspecial SET torta_id = " + req.body.torta_id + ", solicitante = " + req.body.solicitante + ", telefono = " + req.body.telefono + ", fechaEntrega = " + req.body.fechaEntrega + ", precio = " + req.body.precio + " WHERE id = " + req.params.id, function(err, rows) {
            if(err){
                res.json({"error": err});
                console.log(err);
            }else{
                res.json("pedidoEspecial modificado");
            }
        });
    });

    // Eliminar
    router.delete("/pedidoEspecial/:id", function(req, res){
        connection.query("DELETE FROM pedidoEspecial WHERE id = " + req.params.id, function(err, rows){
            if(err){
                res.json({"error": err});
            }else{
                res.json("pedido especial eliminado");
            }
        });
    });

}
module.exports = REST_ROUTER;