mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5) {

	// Búsqueda por ID
	router.get("/programacionDiaria/:id", function (req, res) {
		connection.query("SELECT SCAB.id, DATE_FORMAT(SCAB.fecha,'%d/%m/%Y') AS fecha, SUC.id AS sucursal_id, SUC.nombre AS sucursal_nombre, SDET.cantidad, MTP.id AS masaTipo_id, MTP.nombre AS masaTipo_nombre, MSB.id AS masaSabor_id, MSB.nombre AS masaSabor_nombre, SAB.id AS sabor_id, SAB.nombre AS sabor_nombre, TAM.id AS tamano_id, TAM.personas AS personas FROM programacionDiariaCab SCAB INNER JOIN sucursal SUC ON SCAB.sucursal_id = SUC.id INNER JOIN programacionDiariaDet SDET ON SCAB.id = SDET.programacionDiariaCab_id INNER JOIN tamano TAM ON SDET.tamano_id = TAM.id INNER JOIN torta TOR ON SDET.torta_id = TOR.id INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id WHERE SCAB.id = " + req.params.id + " ORDER BY SDET.id", function (err, rows) {
			if (err) {
				res.json({ "error": err });
			} else {
				var json = [];
				var anterior_id = 0;
				for (var item in rows) {
					if (rows[item].id != anterior_id) {
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


	// Buascar programacionDiaria por dia y sucursal
	router.get("/programacionDiaria/:fecha/:sucursal_id", function (req, res) {
		connection.query(`
			SELECT	SCAB.id,
					DATE_FORMAT(SCAB.fecha,'%d/%m/%Y') AS fecha,
					SUC.id AS sucursal_id,
					SUC.nombre AS sucursal_nombre,
					SDET.cantidad,
					MTP.id AS masaTipo_id,
					MTP.nombre AS masaTipo_nombre,
					MSB.id AS masaSabor_id,
					MSB.nombre AS masaSabor_nombre,
					SAB.id AS sabor_id,
					SAB.nombre AS sabor_nombre,
					TAM.id AS tamano_id,
					TAM.num AS num,
					TAM.personas AS personas,
					TOR.id AS torta_id
			FROM 	programacionDiariaCab SCAB INNER JOIN sucursal SUC ON SCAB.sucursal_id = SUC.id
					              INNER JOIN programacionDiariaDet SDET ON SCAB.id = SDET.programacionDiariaCab_id
					              INNER JOIN tamano TAM ON SDET.tamano_id = TAM.id
					              INNER JOIN torta TOR ON SDET.torta_id = TOR.id
					              INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
					              INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
					              INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
			WHERE 	SCAB.fecha = ` + req.params.fecha + ` AND
					SUC.id = ` + req.params.sucursal_id + `
			ORDER	BY
					TOR.id,
					TAM.id`, function (err, rows) {
				if (err) {
					res.json({ "error": err });
				} else {
					var json = [];
					var anterior_id = 0;
					for (var item in rows) {
						if (rows[item].id != anterior_id) {
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
								id_diaria: rows[item].id,
								torta_id: rows[item].torta_id,
								cantidad: rows[item].cantidad,
								masaTipo_id: rows[item].masaTipo_id,
								masaTipo_nombre: rows[item].masaTipo_nombre,
								masaSabor_id: rows[item].masaSabor_id,
								masaSabor_nombre: rows[item].masaSabor_nombre,
								sabor_id: rows[item].sabor_id,
								sabor_nombre: rows[item].sabor_nombre,
								tamano_id: rows[item].tamano_id,
								num: rows[item].num,
								personas: rows[item].personas,
								fecha: rows[item].fecha
							}
						);
						anterior_id = rows[item].id;
					}
					res.json(json);
				}
			});
	});

	// Registrar programacion Diaria normal
	router.post("/programacionDiaria/normal", function (req, res) {

		connection.query(`
			SELECT	id
			FROM 	programacionDiariaCab
			WHERE 	fecha = ` + req.body.fecha + ` AND
					sucursal_id = ` + req.body.sucursal_id, function (err, rows) {
				if (err) {
					res.json({ "error": err });
				} else {
					var programacionDiariaCab_id = 0;
					var continuar = false;
					if (rows.length > 0) {
						query = `
						DELETE   
						FROM  programacionDiariaNor
						WHERE programacionDiariaCab_id  =` + rows[0].id;
						connection.query(query, function (err, result) {
							if (err) {
								res.json({ "error": err });
							} else {
								programacionDiariaCab_id = rows[0].id;
								registrarDetalleNormal(res, programacionDiariaCab_id, req.body.detalleNormal);
								// registrarDetalleSobrante(res, programacionDiariaCab_id, req.body.detalleSobrante);
								// registrarDetallePedido(res, programacionDiariaCab_id, req.body.detallePedido);
								// registrarDetalleEspecial(res, programacionDiariaCab_id, req.body.detalleEspecial);
							}
						});
					} else {
						query = `
						INSERT  INTO programacionDiariaCab(
								fecha,
								sucursal_id)
						VALUES(` + req.body.fecha + `, ` +
							req.body.sucursal_id + `)`;
						connection.query(query, function (err, result) {
							if (err) {
								res.json({ "error": err });
							} else {
								programacionDiariaCab_id = result.insertId;
								registrarDetalleNormal(res, programacionDiariaCab_id, req.body.detalleNormal);
								// registrarDetalleSobrante(res, programacionDiariaCab_id, req.body.detalleSobrante);
								// registrarDetallePedido(res, programacionDiariaCab_id, req.body.detallePedido);
								// registrarDetalleEspecial(res, programacionDiariaCab_id, req.body.detalleEspecial);
							}
						});
					}
				}
			});
	});

	// Registrar programacion Diaria Sobrante
	router.post("/programacionDiaria/sobrante", function (req, res) {

		connection.query(`
			SELECT	id
			FROM 	programacionDiariaCab
			WHERE 	fecha = ` + req.body.fecha + ` AND
					sucursal_id = ` + req.body.sucursal_id, function (err, rows) {
				if (err) {
					res.json({ "error": err });
				} else {
					var programacionDiariaCab_id = 0;
					var continuar = false;
					if (rows.length > 0) {
						query = `
						DELETE   
						FROM  programacionDiariaSob
						WHERE programacionDiariaCab_id  =` + rows[0].id;
						connection.query(query, function (err, result) {
							if (err) {
								res.json({ "error": err });
							} else {
								programacionDiariaCab_id = rows[0].id;
								registrarDetalleSobrante(res, programacionDiariaCab_id, req.body.detalleSobrante);
							}
						});
					} else {
						query = `
						INSERT  INTO programacionDiariaCab(
								fecha,
								sucursal_id)
						VALUES(` + req.body.fecha + `, ` +
							req.body.sucursal_id + `)`;
						connection.query(query, function (err, result) {
							if (err) {
								res.json({ "error": err });
							} else {
								programacionDiariaCab_id = result.insertId;
								registrarDetalleSobrante(res, programacionDiariaCab_id, req.body.detalleSobrante);
							}
						});
					}
				}
			});
	});

	// Registrar programacion Diaria Pedido
	router.post("/programacionDiaria/pedido", function (req, res) {

		connection.query(`
			SELECT	id
			FROM 	programacionDiariaCab
			WHERE 	fecha = ` + req.body.fecha + ` AND
					sucursal_id = ` + req.body.sucursal_id, function (err, rows) {
				if (err) {
					res.json({ "error": err });
				} else {
					var programacionDiariaCab_id = 0;
					var continuar = false;
					if (rows.length > 0) {
						query = `
						DELETE   
						FROM  programacionDiariaPed
						WHERE programacionDiariaCab_id  =` + rows[0].id;
						connection.query(query, function (err, result) {
							if (err) {
								res.json({ "error": err });
							} else {
								programacionDiariaCab_id = rows[0].id;
								registrarDetallePedido(res, programacionDiariaCab_id, req.body.detallePedido);
							}
						});
					} else {
						query = `
						INSERT  INTO programacionDiariaCab(
								fecha,
								sucursal_id)
						VALUES(` + req.body.fecha + `, ` +
							req.body.sucursal_id + `)`;
						connection.query(query, function (err, result) {
							if (err) {
								res.json({ "error": err });
							} else {
								programacionDiariaCab_id = result.insertId;
								registrarDetallePedido(res, programacionDiariaCab_id, req.body.detallePedido);
							}
						});
					}
				}
			});
	});

	// Registrar programacion Diaria Pedido Especial
	router.post("/programacionDiaria/especial", function (req, res) {

		connection.query(`
			SELECT	id
			FROM 	programacionDiariaCab
			WHERE 	fecha = ` + req.body.fecha + ` AND
					sucursal_id = ` + req.body.sucursal_id, function (err, rows) {
				if (err) {
					res.json({ "error": err });
				} else {
					var programacionDiariaCab_id = 0;
					var continuar = false;
					if (rows.length > 0) {
						query = `
						DELETE   
						FROM  programacionDiariaEsp
						WHERE programacionDiariaCab_id  =` + rows[0].id;
						connection.query(query, function (err, result) {
							if (err) {
								res.json({ "error": err });
							} else {
								programacionDiariaCab_id = rows[0].id;
								registrarDetalleEspecial(res, programacionDiariaCab_id, req.body.detalleEspecial);
							}
						});
					} else {
						query = `
						INSERT  INTO programacionDiariaCab(
								fecha,
								sucursal_id)
						VALUES(` + req.body.fecha + `, ` +
							req.body.sucursal_id + `)`;
						connection.query(query, function (err, result) {
							if (err) {
								res.json({ "error": err });
							} else {
								programacionDiariaCab_id = result.insertId;
								registrarDetalleEspecial(res, programacionDiariaCab_id, req.body.detalleEspecial);
							}
						});
					}
				}
			});
	});

	function registrarDetalleNormal(res, programacionDiariaCab_id, detalleNormal) {
		var itemOK = 0;
		for (var index = 0; index < detalleNormal.length; index++) {
			item = detalleNormal[index];
			connection.query(`
				INSERT  INTO programacionDiariaNor(
						programacionDiariaCab_id,
						torta_id,
						tamano_id,
						impreso,
						fabricado,
						camioneta,
						guiaDespacho,
						recepcionado,
						vendido)
				VALUES(` + programacionDiariaCab_id + `, ` +
				item.torta_id + `,` +
				item.tamano_id + `, ` +
				item.impreso + `, ` +
				item.fabricado + `, ` +
				item.camioneta + `, ` +
				item.guiaDespacho + `, ` +
				item.recepcionado + `, ` +
				item.vendido + `)`, function (err, result) {
					if (err) {
						res.json({ "error": err });
					} else {
						itemOK++;
					}
				});
		}
		res.json({ "id": programacionDiariaCab_id, "items": itemOK });
	}
	function registrarDetalleSobrante(res, programacionDiariaCab_id, detalleSobrante) {
		var itemOK = 0;
		for (var index = 0; index < detalleSobrante.length; index++) {
			item = detalleSobrante[index];
			connection.query(`
				INSERT  INTO programacionDiariaSob(
						programacionDiariaCab_id,
						torta_id,
						tamano_id,
						cantidad)
				VALUES(` + programacionDiariaCab_id + `, ` +
				item.torta_id + `,` +
				item.tamano_id + `, ` +
				item.cantidad + `)`, function (err, result) {
					if (err) {
						res.json({ "error": err });
					} else {
						itemOK++;
					}
				});
		}
		res.json({ "id": programacionDiariaCab_id, "items": itemOK });
	}
	function registrarDetallePedido(res, programacionDiariaCab_id, detallePedido) {
		var itemOK = 0;
		for (var index = 0; index < detallePedido.length; index++) {
			item = detallePedido[index];
			connection.query(`
				INSERT  INTO programacionDiariaPed(
						programacionDiariaCab_id,
						torta_id,
						tamano_id,
						impreso,
						fabricado,
						camioneta,
						guiaDespacho,
						recepcionado,
						vendido)
				VALUES(` + programacionDiariaCab_id + `, ` +
				item.torta_id + `,` +
				item.tamano_id + `, ` +
				item.impreso + `, ` +
				item.fabricado + `, ` +
				item.camioneta + `, ` +
				item.guiaDespacho + `, ` +
				item.recepcionado + `, ` +
				item.vendido + `)`, function (err, result) {
					if (err) {
						res.json({ "error": err });
					} else {
						itemOK++;
					}
				});
		}
		res.json({ "id": programacionDiariaCab_id, "items": itemOK });
	}
	function registrarDetalleEspecial(res, programacionDiariaCab_id, detalleEspecial) {
		var itemOK = 0;
		for (var index = 0; index < detalleEspecial.length; index++) {
			itemEspecial = detalleEspecial[index];
			connection.query(`
				INSERT  INTO programacionDiariaEsp(
						programacionDiariaCab_id,
						pedidoEspecial_id,
						impreso,
						fabricado,
						camioneta,
						guiaDespacho,
						recepcionado,
						vendido)
				VALUES(` + programacionDiariaCab_id + `, ` +
				itemEspecial.pedidoEspecial_id + `,` +
				itemEspecial.impreso + `, ` +
				itemEspecial.fabricado + `, ` +
				itemEspecial.camioneta + `, ` +
				itemEspecial.guiaDespacho + `, ` +
				itemEspecial.recepcionado + `, ` +
				itemEspecial.vendido + `)`, function (err, result) {
					if (err) {
						res.json({ "error": err });
					} else {
						itemOK++;
					}
				});
		}
		res.json({ "id": programacionDiariaCab_id, "items": itemOK });
	}


}
module.exports = REST_ROUTER;
