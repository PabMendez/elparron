var tipoMasa = {
	nombre: "tipoMasa",
	paginaInicial: "tipoMasaListado.html",
	listar: function() {
		cma_ajaxGet(rutaURL + "/" + this.nombre, this.desplegar);
	},
	desplegar: function(oData) {
		var tabla = cma_creaTabla(tipoMasa.nombre);
		var oInfo = [];
		$(oData).each(function() {
			var oItem = [this.id, this.nombre, cma_CreaBotonesEdicion(tipoMasa.nombre, this.id)];
			tabla.row.add(oItem);
		});
		tabla.draw();
	},
	agregar: function() {
		cma_cargaOpcion("tipoMasaDetalle.html", this.inicializaPaneles());
	},
	editar: function(id) {
		alert("Editar ID " + id);
	},
	eliminar: function(id) {
		alert("Eliminar ID " + id);
	},
	inicializaPaneles: function() {

	}
}
