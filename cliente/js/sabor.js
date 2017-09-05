var sabor = {
	nombre: "sabor",
	paginaInicial: "saborListado.html",
	listar: function() {
		cma_ajaxGet(rutaURL + "/" + this.nombre, this.desplegar);
	},
	desplegar: function(oData) {
		var tabla = cma_creaTabla(sabor.nombre);
		var oInfo = [];
		$(oData).each(function() {
			var oItem = [this.id, this.nombre, this.tipoMasa_id, cma_CreaBotonesEdicion(sabor.nombre, this.id)];
			tabla.row.add(oItem);
		});
		tabla.draw();
	},
	agregar: function() {
		cma_cargaOpcion("saborDetalle.html", this.inicializaPaneles());
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
