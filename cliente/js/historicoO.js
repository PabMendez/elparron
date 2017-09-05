var historico = {
	nombre: "historico",
	paginaInicial: "historico.html",
	listar: function() {
		
	}
}
function historicoSerializar() {
	var datos = {
		"fecha": $("#dateHistorico").val(),
		"sucursal_id": $("#cmbSucursal").val()
	}
	return datos;
}
/*function historicoLlenaTabla(oData) {
		$("#tabHistorico tbody").remove();
		var anterior = 0;
		$($(oData)[0].detalle).each(function() {
			if(anterior != this.sabor_id){
				$("#tabHistorico").append("<tbody><tr style='cursor:pointer'><td>" + this.masaTipo_nombre + " " + this.masaSabor_nombre + "</td><td>" + this.sabor_nombre + "</td><td>" + this.personas + "</td><td>" + this.personas + "</td><td>" + this.personas + "</td><td>" + this.personas + "</td><td>" + this.cantidad + "</td></tr></tbody>");
			}
			anterior = this.sabor_id;
		});
	}
*/
function historicoLlenaTabla(oData) {

	$("#tabHistorico tbody").remove();
	var anterior = 0;
	var htmlFila = "";
	var total = 0;
	var granTotal = 0;

	$($(oData)[0].detalle).each(function(){
		if(anterior != this.torta_id) {
			if(anterior > 0) {
				htmlFila = htmlFila + "<td>" + total + "</td></tr>";
				$("#tabHistorico").append(htmlFila);
			}
			htmlFila = "<tr class='item'><td>" + this.masaTipo_nombre + " " + this.masaSabor_nombre + "</td><td>" + this.sabor_nombre + "</td>";
			granTotal = granTotal + total;
			total = 0;
		}
		htmlFila = htmlFila + "<td><input type='text' value='" + this.cantidad + "'></td>";
		total = total + this.cantidad;
		anterior = this.torta_id;
	});

	granTotal = granTotal + total;
	htmlFila = htmlFila + "<td>" + total + "</td></tr>";

	$("#tabHistorico").append(htmlFila);
	$("#tabHistorico").append("<tr><th colspan=6>Total</th><th>" + granTotal + "</th></tr>");

}

function desplegarSucursal(oData) {
	$("#cmbSucursal option").remove();
	$("#cmbSucursal").append("<option value=''>:: Seleccione Sucursal ::</option>");
	$(oData).each(function() {
			$("#cmbSucursal").append("<option value='" + this.id + "'>" + this.nombre + "</option>");

	});
}

function historicoLimpiar(historicoTipo) {
	$("#cmbSucursal").val("");
	ajaxGet(rutaURL + "/sucursal", this.desplegarSucursal);
	if(historicoTipo) {
		/*$("#dateHistorico").val("");
		$("#dateHistorico").focus();*/
		$("#cmbSucursal").focus();
	}
}

function historicoLimpiarOtro(historicoTipo) {
	$("#cmbSucursal").val("");
	ajaxGet(rutaURL + "/sucursal", this.desplegarSucursal);
	if(historicoTipo) {
		$("#dateHistorico").val("");
		$("#dateHistorico").focus();
	}
}

function historicoAgregar() {
	historicoLimpiarOtro(true);
}

function historicoListar() {
	// La fecha en el texto dice dd/mm/yyy --> La convertiremos a formato yyymmdd
	var fecha = $("#dateHistorico").val().split("/")[2] + $("#dateHistorico").val().split("/")[1] + $("#dateHistorico").val().split("/")[0];
	ajaxGet(rutaURL + "/historico/" + fecha + "/" + $("#cmbSucursal").val(), historicoLlenaTabla);
		
}

function historicoCargarFecha(){
	  $('#dateHistorico').datepicker({
		    autoclose: true,
			todayHighlight: true,
			locale: 'es-ES',
			format: 'dd/mm/yyyy',
			weekStart: 1,
			languaje: 'es-ES'
		});
	$('#dateHistorico').datepicker('setDate', 'now');
}

function historicoCargar() {
	$("#cma-layout").load("historico.html", function() {
		$("#btnBuscarHistorico").click(function() { historicoListar(); });
		$("#btnNuevoHistorico").click(function() { historicoAgregar(); });

		historicoLimpiar(true);		
	});
}