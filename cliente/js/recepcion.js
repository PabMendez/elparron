var recepcion = {
	nombre: "recepcion",
	paginaInicial: "recepcion.html",
	listar: function() {
		cma_ajaxGet(rutaURL + "/" + this.nombre, this.desplegar);
	},
	desplegar: function(oData) {
		var tabla = cma_creaTabla(recepcion.nombre);
		var oInfo = [];
		$(oData).each(function() {
			var oItem = [this.id, this.tipo, this.sabor, this.personas, this.total, cma_CreaBotonesEdicion(recepcion.nombre, this.id)];
			tabla.row.add(oItem);
		});
		tabla.draw();
	},
	inicializaPaneles: function() {

	}
}
function recepcionCargarFechaYHora(){
	$('#dateRecepcion').datetimepicker({
		locale: 'es',
		sideBySide: true,
		showClose: true,
		showClear: true,
		showTodayButton: true,
		toolbarPlacement: 'bottom',
		tooltips: {
			today: 'Ir al día de hoy',
			clear: 'Limpiar fecha y hora seleccionada',
			close: 'Cerrar calendario',
			selectMonth: 'Seleccionar Mes',
			prevMonth: 'Mes anterior',
			nextMonth: 'Mes siguiente',
			selectYear: 'Seleccionar año',
			prevYear: 'Año Anterior',
			nextYear: 'Año siguiente',
			selectDecade: 'Seleccionar decada',
			prevDecade: 'Decada anterior',
			nextDecade: 'Decada siguiente',
			prevCentury: 'Siglo anterior',
			nextCentury: 'Siglo siguiente'
		}
	});
}