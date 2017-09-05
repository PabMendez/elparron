mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5) {

    // Listar
    router.get("/pedido", function (req, res) {
        connection.query(`
            SELECT  PED.id, 
                    TOR.id AS torta_id, 
                    MTP.id AS masaTipo_id,
					MTP.nombre AS masaTipo_nombre,
					MSB.id AS masaSabor_id,
					MSB.nombre AS masaSabor_nombre,
					SAB.id AS sabor_id,
					SAB.nombre AS sabor_nombre,
                    PED.solicitante AS solicitante, 
                    PED.telefono AS telefono, 
                    TAM.id AS tamano_id,
                    TAM.personas AS personas, 
                    DATE_FORMAT(PED.fechaEntrega,'%d/%m/%Y') AS fechaEntrega, 
                    PED.precio AS precio, 
                    SUC.id AS sucursal_id,
                    SUC.nombre AS sucursal_nombre 
            FROM    pedido PED INNER JOIN tamano TAM ON PED.tamano_id = TAM.id 
                               INNER JOIN sucursal SUC ON PED.sucursalRetiro = SUC.id 
                               INNER JOIN torta TOR ON PED.torta_id = TOR.id
                               INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
					           INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
					           INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
            ORDER BY PED.id`, function (err, rows) {
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
                                    fechaEntrega: rows[item].fechaEntrega,
                                    sucursal_id: rows[item].sucursal_id,
                                    sucursal_nombre: rows[item].sucursal_nombre,
                                    detalle: []
                                }
                            );
                        }
                        var cantidad = 0;
                        if (rows[item].masaTipo_id == rows[item].masaTipo_id && rows[item].masaSabor_id == rows[item].masaSabor_id && rows[item].sabor_id == rows[item].sabor_id && rows[item].tamano_id == rows[item].tamano_id) {
                            cantidad = 123;
                            json[json.length - 1].detalle.push(

                                {
                                    torta_id: rows[item].torta_id,
                                    cantidad: cantidad,
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
                    }
                    res.json(json);
                }
            });
    });

    // Listar de prueba (no borrar)
    router.get("/pedidoOtro/:fechaEntrega/:sucursal_id", function (req, res) {
        var cSQL = `
            SELECT  MAX(PED.id) AS id,
                    MAX(DATE_FORMAT(PED.fechaEntrega,'%d/%m/%Y %H:%i:%s')) AS fechaEntrega,
                    MAX(SUC.id) AS sucursal_id,
                    MAX(SUC.nombre) AS sucursal_nombre,
                    COUNT(1) AS cantidad,
                    TOR.id AS torta_id,
                    MAX(MTP.id) AS masaTipo_id,
                    MAX(MTP.nombre) AS masaTipo_nombre,
                    MAX(MSB.id) AS masaSabor_id,
                    MAX(MSB.nombre) AS masaSabor_nombre,
                    MAX(SAB.id) AS sabor_id,
                    MAX(SAB.nombre) AS sabor_nombre,
                    TAM.id AS tamano_id,
                    MAX(TAM.personas) AS personas,
                    MAX(PED.solicitante) AS solicitante,
                    MAX(PED.telefono) AS telefono,
                    MAX(PED.precio) AS precio
            FROM    pedido PED INNER JOIN tamano TAM ON PED.tamano_id = TAM.id
                               INNER JOIN sucursal SUC ON PED.sucursalRetiro = SUC.id
                               INNER JOIN torta TOR ON PED.torta_id = TOR.id
                               INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
                               INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
                               INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
            WHERE   DATE_FORMAT(fechaEntrega, "%Y%m%d") = "` + req.params.fechaEntrega + `" AND
                    SUC.id = ` + req.params.sucursal_id + `
            GROUP   BY
                    TOR.id
            ORDER	  BY
                    TAM.id`;
        connection.query(cSQL, function (err, rows) {
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
                                dia: rows[item].fechaEntrega,
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

    // Listar
    router.get("/pedido/:fechaEntrega/:sucursal_id", function (req, res) {
        var cSQL = `
            SELECT  MAX(PED.id) AS id,
                    MAX(DATE_FORMAT(PED.fechaEntrega,'%d/%m/%Y %H:%i')) AS fechaEntrega,
                    MAX(SUC.id) AS sucursal_id,
                    MAX(SUC.nombre) AS sucursal_nombre,
                    COUNT(1) AS cantidad,
                    TOR.id AS torta_id,
                    MAX(MTP.id) AS masaTipo_id,
                    MAX(MTP.nombre) AS masaTipo_nombre,
                    MAX(MSB.id) AS masaSabor_id,
                    MAX(MSB.nombre) AS masaSabor_nombre,
                    MAX(SAB.id) AS sabor_id,
                    MAX(SAB.nombre) AS sabor_nombre,
                    TAM.id AS tamano_id,
                    MAX(TAM.personas) AS personas,
                    MAX(PED.solicitante) AS solicitante,
                    MAX(PED.telefono) AS telefono,
                    MAX(PED.precio) AS precio
            FROM    pedido PED INNER JOIN tamano TAM ON PED.tamano_id = TAM.id
                               INNER JOIN sucursal SUC ON PED.sucursalRetiro = SUC.id
                               INNER JOIN torta TOR ON PED.torta_id = TOR.id
                               INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
                               INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
                               INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
            WHERE   DATE_FORMAT(fechaEntrega, "%Y%m%d") = "` + req.params.fechaEntrega + `" AND
                    SUC.id = ` + req.params.sucursal_id + `
            GROUP   BY
                    TOR.id
            ORDER	  BY
                    TOR.id,
                    TAM.id`;
        connection.query(cSQL, function (err, rows) {
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
                                dia: rows[item].fechaEntrega,
                                sucursal_id: rows[item].sucursal_id,
                                sucursal_nombre: rows[item].sucursal_nombre,
                                detalle: []
                            }
                        );
                    }
                    json[json.length - 1].detalle.push(
                        {
                            id: rows[item].id,
                            torta_id: rows[item].torta_id,
                            cantidad: rows[item].cantidad,
                            masaTipo_id: rows[item].masaTipo_id,
                            masaTipo_nombre: rows[item].masaTipo_nombre,
                            masaSabor_id: rows[item].masaSabor_id,
                            masaSabor_nombre: rows[item].masaSabor_nombre,
                            sabor_id: rows[item].sabor_id,
                            sabor_nombre: rows[item].sabor_nombre,
                            tamano_id: rows[item].tamano_id,
                            personas: rows[item].personas,
                            fechaEntrega: rows[item].fechaEntrega,
                            telefono: rows[item].telefono,
                            solicitante: rows[item].solicitante,
                            precio: rows[item].precio
                        }
                    );
                    anterior_id = rows[item].id;
                }
                res.json(json);
            }
        });
    });
    // Listar
    router.get("/pedidoStock/:sucursal_id", function (req, res) {
        var cSQL = `
            SELECT  MAX(PED.id) AS id,
                    MAX(DATE_FORMAT(PED.fechaEntrega,'%d/%m/%Y %H:%i')) AS fechaEntrega,
                    MAX(SUC.id) AS sucursal_id,
                    MAX(SUC.nombre) AS sucursal_nombre,
                    COUNT(1) AS cantidad,
                    TOR.id AS torta_id,
                    MAX(MTP.id) AS masaTipo_id,
                    MAX(MTP.nombre) AS masaTipo_nombre,
                    MAX(MSB.id) AS masaSabor_id,
                    MAX(MSB.nombre) AS masaSabor_nombre,
                    MAX(SAB.id) AS sabor_id,
                    MAX(SAB.nombre) AS sabor_nombre,
                    TAM.id AS tamano_id,
                    MAX(TAM.personas) AS personas,
                    MAX(PED.solicitante) AS solicitante,
                    MAX(PED.telefono) AS telefono,
                    MAX(PED.precio) AS precio
            FROM    pedido PED INNER JOIN tamano TAM ON PED.tamano_id = TAM.id
                               INNER JOIN sucursal SUC ON PED.sucursalRetiro = SUC.id
                               INNER JOIN torta TOR ON PED.torta_id = TOR.id
                               INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
                               INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
                               INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
            WHERE   SUC.id = ` + req.params.sucursal_id + `
            GROUP   BY
                    TOR.id
            ORDER	  BY
                    TOR.id,
                    TAM.id`;
        connection.query(cSQL, function (err, rows) {
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
                                dia: rows[item].fechaEntrega,
                                sucursal_id: rows[item].sucursal_id,
                                sucursal_nombre: rows[item].sucursal_nombre,
                                detalle: []
                            }
                        );
                    }
                    json[json.length - 1].detalle.push(
                        {
                            id: rows[item].id,
                            torta_id: rows[item].torta_id,
                            cantidad: rows[item].cantidad,
                            masaTipo_id: rows[item].masaTipo_id,
                            masaTipo_nombre: rows[item].masaTipo_nombre,
                            masaSabor_id: rows[item].masaSabor_id,
                            masaSabor_nombre: rows[item].masaSabor_nombre,
                            sabor_id: rows[item].sabor_id,
                            sabor_nombre: rows[item].sabor_nombre,
                            tamano_id: rows[item].tamano_id,
                            personas: rows[item].personas,
                            fechaEntrega: rows[item].fechaEntrega,
                            telefono: rows[item].telefono,
                            solicitante: rows[item].solicitante,
                            precio: rows[item].precio
                        }
                    );
                    anterior_id = rows[item].id;
                }
                res.json(json);
            }
        });
    });

    // Insertar
    router.post("/pedido", function (req, res) {
        connection.query("INSERT INTO pedido(torta_id, solicitante, telefono, tamano_id, fechaEntrega, precio, sucursalRetiro) VALUES(" + req.body.torta_id + ", '" + req.body.solicitante + "', '" + req.body.telefono + "', '" + req.body.tamano_id + "', '" + req.body.fechaEntrega + "', " + req.body.precio + ", " + req.body.sucursalRetiro + ")", function (err, rows) {
            if (err) {
                res.json({ "error": err });
                //console.log(err);
            } else {
                res.json("pedido registrado");
            }
        });
    });

    // Modificar
    router.put("/pedido/:id", function (req, res) {
        connection.query("UPDATE pedido SET torta_id = " + req.body.torta_id + ", solicitante = " + req.body.solicitante + ", telefono = " + req.body.telefono + ", fechaEntrega = " + req.body.fechaEntrega + ", precio = " + req.body.precio + " WHERE id = " + req.params.id, function (err, rows) {
            if (err) {
                res.json({ "error": err });
                console.log(err);
            } else {
                res.json("pedido modificado");
            }
        });
    });

    // Eliminar
    router.delete("/pedido/:id", function (req, res) {
        connection.query("DELETE FROM pedido WHERE id = " + req.params.id, function (err, rows) {
            if (err) {
                res.json({ "error": err });
            } else {
                res.json("pedido eliminado");
            }
        });
    });

}
module.exports = REST_ROUTER;