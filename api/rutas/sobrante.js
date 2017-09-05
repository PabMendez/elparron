mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

    // BÃºsqueda por ID
	router.get("/sobrante/:id", function(req, res) {
		connection.query("SELECT SCAB.id, DATE_FORMAT(SCAB.fecha,'%d/%m/%Y') AS fecha, SUC.id AS sucursal_id, SUC.nombre AS sucursal_nombre, SDET.cantidad, MTP.id AS masaTipo_id, MTP.nombre AS masaTipo_nombre, MSB.id AS masaSabor_id, MSB.nombre AS masaSabor_nombre, SAB.id AS sabor_id, SAB.nombre AS sabor_nombre, TAM.id AS tamano_id, TAM.personas AS personas FROM sobranteCab SCAB INNER JOIN sucursal SUC ON SCAB.sucursal_id = SUC.id INNER JOIN sobranteDet SDET ON SCAB.id = SDET.sobranteCab_id INNER JOIN tamano TAM ON SDET.tamano_id = TAM.id INNER JOIN torta TOR ON SDET.torta_id = TOR.id INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id WHERE SCAB.id = " + req.params.id + " ORDER BY SDET.id", function(err, rows) {
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


	// Buascar sobrante por dia y sucursal
	router.get("/sobrante/:fecha/:sucursal_id", function(req, res){
		connection.query(`
			SELECT	SCAB.id,
					DATE_FORMAT(SCAB.fecha,'%d/%m/%Y') AS fecha,
					SUC.id AS sucursal_id,
					SUC.nombre AS sucursal_nombre,
					SDET.cantidad,
					TOR.id as torta_id,
					MTP.id AS masaTipo_id,
					MTP.nombre AS masaTipo_nombre,
					MSB.id AS masaSabor_id,
					MSB.nombre AS masaSabor_nombre,
					SAB.id AS sabor_id,
					SAB.nombre AS sabor_nombre,
					TAM.id AS tamano_id,
					TAM.personas AS personas,
					TOR.id AS torta_id
			FROM 	sobranteCab SCAB INNER JOIN sucursal SUC ON SCAB.sucursal_id = SUC.id
					              INNER JOIN sobranteDet SDET ON SCAB.id = SDET.sobranteCab_id
					              INNER JOIN tamano TAM ON SDET.tamano_id = TAM.id
					              INNER JOIN torta TOR ON SDET.torta_id = TOR.id
					              INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
					              INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
					              INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
			WHERE 	SCAB.fecha = ` + req.params.fecha + ` AND
					SUC.id = ` + req.params.sucursal_id + `
			ORDER	BY
					TOR.id,
					TAM.id`, function(err, rows) {
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
							detalleSob: []
						}
						);
					}
					json[json.length - 1].detalleSob.push(
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

	// Registrar Semmana
	router.post("/sobrante", function(req, res) {

		connection.query(`
			SELECT	id
			FROM 	sobranteCab
			WHERE 	fecha = ` + req.body.fecha + ` AND
					sucursal_id = ` + req.body.sucursal_id, function(err, rows) {
			if(err) {
				res.json({"error": err});
			} else {
				var sobranteCab_id = 0;
				var continuar = false;
				if(rows.length > 0) {
					query = `
						DELETE	FROM sobranteDet
						WHERE 	sobranteCab_id = ` + rows[0].id;
					connection.query(query, function(err, result) {
						if(err) {
							res.json({"error": err});
						} else {
							sobranteCab_id = rows[0].id;
							registraDetalle(res, sobranteCab_id, req.body.detalle);
						}
					});
				} else {
					query = `
						INSERT  INTO sobranteCab(
								fecha,
								sucursal_id)
						VALUES(` + req.body.fecha + `, ` +
								   req.body.sucursal_id + `)`;
					connection.query(query, function(err, result) {
						if(err) {
							res.json({"error": err});
						} else {
							sobranteCab_id = result.insertId;
							registraDetalle(res, sobranteCab_id, req.body.detalle);
						}
					});
				}
			}
		});
	});

	function registraDetalle(res, sobranteCab_id, detalle) {
		var itemOK = 0;
		for (var index = 0; index < detalle.length; index++) {
			item = detalle[index];
			connection.query(`
				INSERT  INTO sobranteDet(
						sobranteCab_id,
						torta_id,
						tamano_id,
						cantidad)
				VALUES(` + sobranteCab_id + `, ` +
						   item.torta_id + `,` +
						   item.tamano_id + `, ` +
						   item.cantidad + `)`, function(err, result) {
				if(err) {
					res.json({"error": err});
				} else {
					itemOK++;
				}
			});
		}
		res.json({ "id": sobranteCab_id, "items": itemOK });
	}

}
module.exports = REST_ROUTER;
