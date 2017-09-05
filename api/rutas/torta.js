mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5) {

    // Listar
    router.get("/torta", function (req, res) {
        connection.query(`
            SELECT  TOR.id,
                    MTP.id AS masaTipo_id,
                    MTP.nombre AS masaTipo_nombre,
                    MSB.id AS masaSabor_id,
                    MSB.nombre AS masaSabor_nombre,
                    SAB.id AS sabor_id,
                    SAB.nombre AS sabor_nombre
            FROM    torta TOR INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
                              INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
                              INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
            ORDER   BY
                    TOR.id`, function (err, rows) {
                if (err) {
                    res.json({ "error": err });
                } else {
                    res.json(rows);
                }
            });
    });

    // Buscar
    router.get("/torta/:id", function (req, res) {
        connection.query(`
            SELECT  TOR.id,
                    MTP.id AS masaTipo_id,
                    MTP.nombre AS masaTipo_nombre,
                    MSB.id AS masaSabor_id,
                    MSB.nombre AS masaSabor_nombre,
                    SAB.id AS sabor_id,
                    SAB.nombre AS sabor_nombre
            FROM    torta TOR INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
                              INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
                              INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
            WHERE   TOR.id = ` + req.params.id, function (err, rows) {
                if (err) {
                    res.json({ "error": err });
                } else {
                    res.json(rows);
                }
            });
    });

    // Buscar por precio de torta y tamaño
    router.get("/torta/precio/:masaTipo_id/:masaSabor_id/:sabor_id/:tamano_id", function (req, res) {
        connection.query("SELECT pre.id, pre.precio FROM precio AS pre INNER JOIN tortaPrecio AS pretor ON pre.id = pretor.precio_id INNER JOIN torta AS tor ON tor.id = pretor.torta_id INNER JOIN tamano AS tam ON tam.id = pretor.tamano_id WHERE tor.masaTipo_id = " + req.params.masaTipo_id + " AND tor.masaSabor_id = " + req.params.masaSabor_id + " AND tor.sabor_id = " + req.params.sabor_id + " AND tam.id = " + req.params.tamano_id, function (err, rows) {
            if (err) {
                res.json({ "error": err });
            } else {
                res.json(rows);
            }
        });
    });

    // Buscar por id de masa y sabor
    router.get("/torta/:masaTipo_id/:masaSabor_id/:sabor_id", function (req, res) {
        connection.query(`
            SELECT  id FROM torta
            WHERE   masaTipo_id = ` + req.params.masaTipo_id + ` AND 
                    masaSabor_id = ` + req.params.masaSabor_id + ` AND
                    sabor_id = ` + req.params.sabor_id, function (err, rows) {
                if (err) {
                    res.json({ "error": err });
                } else {
                    res.json(rows);
                }
            });
    });

    // Insertar
    router.post("/torta", function (req, res) {
        connection.query(`
            INSERT  INTO torta(
                    masaTipo_id,
                    masaSabor_id,
                    sabor_id)
            VALUES(` + 
            req.body.masaTipo_id + `, ` +
            req.body.masaSabor_id + `, ` +
            req.body.sabor_id + `)`, function (err, rows) {
                if (err) {
                    res.json({ "error": err });
                } else {
                    res.json("Torta registrada");
                }
            });
    });

    // Modificar
    router.put("/torta/:id", function (req, res) {
        connection.query(`
            UPDATE  torta
            SET     masaTipo_id = ` + req.body.masaTipo_id + `, 
                    masaSabor_id = ` + req.body.masaSabor_id + `,
                    sabor_id = ` + req.body.sabor_id + `
            WHERE   id = ` + req.params.id, function (err, rows) {
                if (err) {
                    res.json({ "error": err });
                    console.log(err);
                } else {
                    res.json("Torta modificada");
                }
            });
    });

    // Eliminar
    router.delete("/torta/:id", function (req, res) {
        connection.query(`
            DELETE  FROM torta
            WHERE   id = ` + req.params.id, function (err, rows) {
                if (err) {
                    res.json({ "error": err });
                } else {
                    res.json("Torta eliminada");
                }
            });
    });

}
module.exports = REST_ROUTER;