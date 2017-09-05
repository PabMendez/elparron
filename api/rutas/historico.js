mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {
	
	// Búsqueda por ID
	router.get("/historico/:id", function(req, res) {
		connection.query("SELECT CAB.id, DATE_FORMAT(CAB.fecha,'%d/%m/%Y') AS fecha, SUC.id AS sucursal_id, SUC.nombre AS sucursal_nombre, DET.cantidad, MTP.id AS masaTipo_id, MTP.nombre AS masaTipo_nombre, MSB.id AS masaSabor_id, MSB.nombre AS masaSabor_nombre, SAB.id AS sabor_id, SAB.nombre AS sabor_nombre, TAM.id AS tamano_id, TAM.personas AS personas FROM historicoCab CAB INNER JOIN sucursal SUC ON CAB.sucursal_id = SUC.id INNER JOIN historicoDet DET ON CAB.id = DET.historicoCab_id INNER JOIN tamano TAM ON DET.tamano_id = TAM.id INNER JOIN torta TOR ON DET.torta_id = TOR.id INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id WHERE CAB.id = " + req.params.id + " ORDER BY DET.id", function(err, rows) {
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
							fecha: rows[item].fecha,
							sucursal_id: rows[item].sucursal_id,
							sucursal_nombre: rows[item].sucursal_nombre,
							detalle: []
						}
						);
					}
					json[json.length - 1].detalle.push(
					{	
						cantidad: rows[item].cantidad,
						masaTipo_id: rows[item].masaTipo_id,
						masaTipo_nombre: rows[item].masaTipo_nombre,
						masaSabor_id: rows[item].masaSabor_id,
						masaSabor_nombre: rows[item].masaSabor_nombre,
						sabor_id: rows[item].sabor_id,
						sabor_nombre: rows[item].sabor_nombre,
						tamano_id: rows[item].tamano_id,
						personas: rows[item].personas
					}
					);
					anterior_id = rows[item].id;
				}
				res.json(json);
			}
		});
	});
	
	// Búsqueda por fecha (yyyymmdd) y sucursal
	router.get("/historico/:fecha/:sucursal_id", function(req, res){
		connection.query("SELECT CAB.id, DATE_FORMAT(CAB.fecha,'%d/%m/%Y') AS fecha, SUC.id AS sucursal_id, SUC.nombre AS sucursal_nombre, DET.cantidad, MTP.id AS masaTipo_id, MTP.nombre AS masaTipo_nombre, MSB.id AS masaSabor_id, MSB.nombre AS masaSabor_nombre, SAB.id AS sabor_id, SAB.nombre AS sabor_nombre, TAM.id AS tamano_id, TAM.personas AS personas, TOR.id AS torta_id FROM historicoCab CAB INNER JOIN sucursal SUC ON CAB.sucursal_id = SUC.id INNER JOIN historicoDet DET ON CAB.id = DET.historicoCab_id INNER JOIN tamano TAM ON DET.tamano_id = TAM.id INNER JOIN torta TOR ON DET.torta_id = TOR.id INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id WHERE CAB.fecha = '" + req.params.fecha + "' AND SUC.id = " + req.params.sucursal_id + " ORDER BY TOR.id, TAM.id", function(err, rows) {
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
							fecha: rows[item].fecha,
							sucursal_id: rows[item].sucursal_id,
							sucursal_nombre: rows[item].sucursal_nombre,
							detalle: []
						}
						);
					}
					json[json.length - 1].detalle.push(
					{	
						torta_id: rows[item].torta_id,
						cantidad: rows[item].cantidad,
						masaTipo_id: rows[item].masaTipo_id,
						masaTipo_nombre: rows[item].masaTipo_nombre,
						masaSabor_id: rows[item].masaSabor_id,
						masaSabor_nombre: rows[item].masaSabor_nombre,
						sabor_id: rows[item].sabor_id,
						sabor_nombre: rows[item].sabor_nombre,
						tamano_id: rows[item].tamano_id,
						personas: rows[item].personas
					}
					);
					anterior_id = rows[item].id;
				}
				res.json(json);
			}
		});
	});

    // Insertar historico
    router.post("/historico", function(req, res){
    	var detalle = req.body.detalle;
    	for(var item in detalle) {
    		connection.query("INSERT INTO historicoDet(historicoCab_id, torta_id, tamano_id, cantidad) VALUES(" + req.params.id + ", " + detalle[item].torta_id + ", " + detalle[item].tamano_id + ", " + detalle[item].cantidad + ")", function(err, rows) {
    			if(err){
    				res.json({"error": err});
    			}else{
    				res.json("Histórico registrado");
    			}
    		});
    	}
    });

    
    // Modificar histórico
    router.put("/historico/:id", function(req, res){
    	connection.query("UPDATE historicoCab SET fecha = '" + req.body.fecha + "', sucursal_id = " + req.body.sucursal_id + " WHERE id = " + req.params.id, function(err, rows) {
    		if(err) {
    			res.json({"error": err});
    		} else {
    			connection.query("DELETE FROM historicoDet WHERE historicoCab_id = " + req.params.id, function(err, rows) {
    				if(err) {
    					res.json({"error": err});
    				} else {
    					var detalle = req.body.detalle;
    					for(var item in detalle) {
    						connection.query("INSERT INTO historicoDet(historicoCab_id, torta_id, tamano_id, cantidad) VALUES(" + req.params.id + ", " + detalle[item].torta_id + ", " + detalle[item].tamano_id + ", " + detalle[item].cantidad + ")", function(err, rows) {
    							if(err) {
    								res.json({"error": err});
    							}
    						});
    					}
    					res.json("Histórico modificado");
    				}
    			});
    		}
    	});
    });
    
    // Eliminar histórico
    router.delete("/historico/:id", function(req, res){
    	connection.query("DELETE FROM historicoDet WHERE historicoCab_id = " + req.params.id, function(err, rows){
    		if(err){
    			res.json({"error": err});
    		} else {
    			connection.query("DELETE FROM historicoCab WHERE id = " + req.params.id, function(err, rows) {
    				if(err){
    					res.json({"error": err});
    				} else {
    					res.json("Histórico eliminado");
    				}
    			});
    		}
    	});
    });

}
module.exports = REST_ROUTER;
