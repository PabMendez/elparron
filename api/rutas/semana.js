mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function(router, connection, md5) {

	// Buascar semana por dÃ¬a y sucursal
	router.get("/semana/:dia/:sucursal_id", function(req, res){
		connection.query(`
			SELECT	CAB.id,
					CAB.dia AS dia,
					SUC.id AS sucursal_id,
					SUC.nombre AS sucursal_nombre,
					DET.cantidad,
					MTP.id AS masaTipo_id,
					MTP.nombre AS masaTipo_nombre,
					MSB.id AS masaSabor_id,
					MSB.nombre AS masaSabor_nombre,
					SAB.id AS sabor_id,
					SAB.nombre AS sabor_nombre,
					TAM.id AS tamano_id,
					TAM.personas AS personas,
					TOR.id AS torta_id
			FROM 	semanaCab CAB INNER JOIN sucursal SUC ON CAB.sucursal_id = SUC.id
					              INNER JOIN semanaDet DET ON CAB.id = DET.semanaCab_id
					              INNER JOIN tamano TAM ON DET.tamano_id = TAM.id
					              INNER JOIN torta TOR ON DET.torta_id = TOR.id
					              INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
					              INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
					              INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
			WHERE 	CAB.dia = ` + req.params.dia + ` AND
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
							dia: rows[item].dia,
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

	// Buascar semana por sucursal
	router.get("/semana/:sucursal_id", function(req, res){
		connection.query(`
			SELECT	CAB.id,
					CAB.dia AS dia,
					SUC.id AS sucursal_id,
					SUC.nombre AS sucursal_nombre,
					DET.cantidad,
					MTP.id AS masaTipo_id,
					MTP.nombre AS masaTipo_nombre,
					MSB.id AS masaSabor_id,
					MSB.nombre AS masaSabor_nombre,
					SAB.id AS sabor_id,
					SAB.nombre AS sabor_nombre,
					TAM.id AS tamano_id,
					TAM.personas AS personas,
					TOR.id AS torta_id
			FROM 	semanaCab CAB INNER JOIN sucursal SUC ON CAB.sucursal_id = SUC.id
					              INNER JOIN semanaDet DET ON CAB.id = DET.semanaCab_id
					              INNER JOIN tamano TAM ON DET.tamano_id = TAM.id
					              INNER JOIN torta TOR ON DET.torta_id = TOR.id
					              INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
					              INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
					              INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
			WHERE 	SUC.id = ` + req.params.sucursal_id + `
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
							dia: rows[item].dia,
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
	
	// Registrar Semmana
	router.post("/semana", function(req, res) {

		connection.query(`
			SELECT	id
			FROM 	semanaCab
			WHERE 	dia = ` + req.body.dia + ` AND
					sucursal_id = ` + req.body.sucursal_id, function(err, rows) {
			if(err) {
				res.json({"error": err});
			} else {
				var semanaCab_id = 0;
				var continuar = false;
				if(rows.length > 0) {
					query = `
						DELETE	FROM semanaDet
						WHERE 	semanaCab_id = ` + rows[0].id;
					connection.query(query, function(err, result) {
						if(err) {
							res.json({"error": err});
						} else {
							semanaCab_id = rows[0].id;
							registraDetalle(res, semanaCab_id, req.body.detalle);
						}
					});
				} else {
					query = `
						INSERT  INTO semanaCab(
								dia,
								sucursal_id)
						VALUES(` + req.body.dia + `, ` + 
								   req.body.sucursal_id + `)`;
					connection.query(query, function(err, result) {
						if(err) {
							res.json({"error": err});
						} else {
							semanaCab_id = result.insertId;
							registraDetalle(res, semanaCab_id, req.body.detalle);
						}
					});
				}
			}
		});
	});

	function registraDetalle(res, semanaCab_id, detalle) {
		var itemOK = 0;
		for (var index = 0; index < detalle.length; index++) {
			item = detalle[index];
			connection.query(`
				INSERT  INTO semanaDet(
						semanaCab_id,
						torta_id,
						tamano_id,
						cantidad)
				VALUES(` + semanaCab_id + `, ` + 
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
		res.json({ "id": semanaCab_id, "items": itemOK });
	}

}
module.exports = REST_ROUTER;
