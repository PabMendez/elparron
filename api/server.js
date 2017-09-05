var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var md5 = require('MD5');
var app = express();

var semana = require("./rutas/semana.js");
var masaTipo  = require("./rutas/masaTipo.js");
var masaSabor = require("./rutas/masaSabor.js");
var sabor     = require("./rutas/sabor.js");
var sucursal  = require("./rutas/sucursal.js");
var tamano    = require("./rutas/tamano.js");
var torta     = require("./rutas/torta.js");
var pedido     = require("./rutas/pedido.js");
var precio     = require("./rutas/precio.js");
var tortaPrecio     = require("./rutas/tortaPrecio.js");
var sobrante     = require("./rutas/sobrante.js");
var programacionDiaria     = require("./rutas/programacionDiaria.js");
var pedidoEspecial     = require("./rutas/pedidoEspecial.js");

function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'elparron',
        debug    :  false
    });

    pool.getConnection(function(err, connection){
		if(err) {
			self.stop(err);
		} else {
			self.configureExpress(connection);
		}
    });

}

REST.prototype.configureExpress = function(connection) {
	
	var self = this;
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
	var router = express.Router();
	app.use('/api', router);
	
	var rest_semana = new semana(router, connection, md5);
	var rest_masaTipo  = new masaTipo(router, connection, md5);
	var rest_masaSabor = new masaSabor(router, connection, md5);
	var rest_sabor     = new sabor(router, connection, md5);
	var rest_sucursal  = new sucursal(router, connection, md5);
	var rest_tamano    = new tamano(router, connection, md5);
	var rest_torta     = new torta(router, connection, md5);
	var rest_pedido     = new pedido(router, connection, md5);
	var rest_precio     = new precio(router, connection, md5);
	var rest_tortaPrecio     = new tortaPrecio(router, connection, md5);
	var rest_sobrante     = new sobrante(router, connection, md5);
	var rest_programacionDiaria     = new programacionDiaria(router, connection, md5);
	var rest_pedidoEspecial     = new pedidoEspecial(router, connection, md5);

	self.startServer();
	
}

REST.prototype.startServer = function() {
	app.listen(3000, function(){
		console.log("Corriendo por el puerto 3000");
	});
}

REST.prototype.stop = function(err) {
    console.log(err);
    process.exit(1);
}

new REST();
