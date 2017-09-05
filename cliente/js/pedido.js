var pedido = {
	nombre: "pedido",
	paginaInicial: "pedido.html",
	listar: function() {
		
	}
}

function pedidoSerializar(){
	var datetime= $("#datePedido").val();
	var date=datetime.split('/')[2].split(' ')[0] + "-" + datetime.split('/')[1] + "-" + datetime.split('/')[0] + " " + datetime.split('/')[2].split(' ')[1] + ":00";
	var datos = {
		"torta_id": $("#txtTorta").val(),
		"solicitante": $("#txtSolicitante").val(),
		"telefono": $("#txtTelefono").val(),
		"tamano_id": [],
		"fechaEntrega": date,
		"precio": $("#txtPrecios").val(),
		"sucursalRetiro": $("#cmbSucursalRetiro").val()
	} 
	$("#ulTamano").find("input[name=personas]:checked").each(function () {
		datos.tamano_id.push($(this).attr("id"));
	});
	return datos;
}

function desplegarTipoMasa(oData){
	$("#cmbTipoMasa option").remove();
	$("#cmbTipoMasa").append("<option value=''>:: Seleccione ::</option>");
	$(oData).each(function(){
		$("#cmbTipoMasa").append("<option value='" + this.id + "'>" + this.nombre + "</option>")
	});
}

function desplegarTamaño(oData){
	$("#raTamano option").remove();
	$("#raTamano").append("<option value=''>:: Seleccione Sabor Torta ::</option>");
	$(oData).each(function(){
		$("#raTamano").append("<option value='" + this.id + "'>" + this.nombre + "</option>")
	});
}

function desplegarSucursalRetiro(oData){
	$("#cmbSucursalRetiro option").remove();
	$("#cmbSucursalRetiro").append("<option value=''>:: Seleccione ::</option>");
	$(oData).each(function(){
		$("#cmbSucursalRetiro").append("<option value='" + this.id + "'>" + this.nombre + "</option>")
	});
}

function pedidoLimpiar(pedidoTipo){
	$("#cmbSucursalRetiro").val("");
	$("#cmbSaborMasa").val("");
	$("#cmbSabor").val("");
	$("#cmbTipoMasa").val("");
	$("#ulTamano").val("");
	$("#txtPrecios").val("");
	$("#txtTelefono").val("");
	$("#datePedido").val("");
	ajaxGet(rutaURL + "/masaTipo", this.desplegarTipoMasa);
	ajaxGet(rutaURL + "/sucursal", this.desplegarSucursalRetiro);
	if(pedidoTipo){
		$("#txtSolicitante").val("");
		$("#txtSolicitante").focus();
	}

}

function pedidoAgregar() {
	pedidoLimpiar(true);

}

function pedidoEditar(oFila) {
	$("#txtID").val($(oFila).find("td")[0].innerHTML);
	$("#cmbTipoMasa").val($($(oFila).find("td")[1]).find("input")[0].value);
	$("#cmbSaborMasa").val($($(oFila).find("td")[2]).find("input")[0].value);
	$("#cmbSabor").val($($(oFila).find("td")[3]).find("input")[0].value);
}

function pedidoRegistrar() {
	var datos = pedidoSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxPut(rutaURL + "/pedido/" + datos.id, datos);
	} else {
		alert(JSON.stringify(datos));
		ajaxPost(rutaURL + "/pedido", datos);
	}
	pedidoAgregar();
}

function pedidoCargarFechaYHora(){
	$('#datePedido').datetimepicker({
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

function pedidoCargar(){
	$("#cma-layout").load("pedido.html", function(){
		$("#btnNuevoPedido").click(function() { 
			pedidoAgregar();
		});
		$("#btnRegistrarPedido").click(function() { 
			validaCamposPedido();
			// validaCmbTorta();
			// validaFecha();
			// validaCmbSucursal();
			// validaRadio();
			
		});
		$("#cmbSabor").click(function(){ 
			obtenerTortaId(); 
		}).blur(function(){ 
			obtenerTortaId(); 
		}).focus(function(){ 
			obtenerTortaId();	
		});
		$("#cmbTipoMasa").click(function(){ masaTipoMasaSaborMostrar(); }).blur(function(){ masaTipoMasaSaborMostrar(); });
		$("#cmbSaborMasa").click(function(){ masaTipoMasaSaborSaborMostrar(); }).blur(function(){ masaTipoMasaSaborSaborMostrar(); });
		$("#ulTamano").click(function(){ obtenerPrecioTorta(); }).blur(function(){ obtenerPrecioTorta(); }).focus(function(){ obtenerPrecioTorta();	});
		$("#ulPrecio").append("<li><input class='form-control' type='text' value='' readonly></li>");
		pedidoTamanoMostrar();
		pedidoLimpiar(true);
	});
}

/* Cargar Tamaños */

function pedidoTamanoMostrar() { // Solicita a la API los tamañoss (todas)
	ajaxGet(rutaURL + "/tamano", pedidoTamanoDesplegar);
}

function pedidoTamanoDesplegar(oData) { // Despliega los tamaños solicitadas a la API
	$("#ulTamano li").remove();
	$(oData).each(function() {
		if(this.personas <= 24){
			$("#ulTamano").append("<label class='radio-inlinePedido'><li class='listado-li'><input type='radio' name='personas' id='" + this.id + "' value='" + this.id + "'>&nbsp;" + this.personas + " Personas</li></label>");
			// ACA EN VEZ DE ID ERA VALUE CORRECION: tuve que agregar el atributo value para que sirviera
		}
	});	
}

/* obtener torta id*/

function obtenerTortaId() { // Solicita a la API la id de la torta
	ajaxGet(rutaURL + "/torta/" + $("#cmbTipoMasa").val() + "/" + $("#cmbSaborMasa").val() + "/" + $("#cmbSabor").val(), desplegarTortaId);
	// obtenerPrecioTorta();
}

function desplegarTortaId(oData) { // Despliega la id de la torta
$("#ulTorta li").remove();
	$(oData).each(function() {
			$("#ulTorta").append("<li ><input id='txtTorta' type='text' value='" + this.id + "'></li>");
	});
	
}

/* Masa sabor por masa tipo */

function masaTipoMasaSaborMostrar() { // Solicita a la API los sabores de masa (todas)
	ajaxGet(rutaURL + "/masaTipo/masaSabor/" + $("#cmbTipoMasa").val(), masaSaborDesplegar);
}

function masaSaborDesplegar(oData) { // Despliega el sabor de la masa solicitadas a la API
	$("#cmbSaborMasa option").remove();
	$("#cmbSaborMasa").append("<option value=''>:: Seleccione ::</option>");
	$(oData).each(function() {
		$("#cmbSaborMasa").append("<option value='" + this.id + "'>" + this.nombre + "</option>")
	});
}

/* Conseguir SABOR por Masa Sabor y Masa Tipo */

function masaTipoMasaSaborSaborMostrar() { // Solicita a la API los sabores de masa (todas)
	ajaxGet(rutaURL + "/masaSabor/sabor/" + $("#cmbTipoMasa").val() + "/" + $("#cmbSaborMasa").val(), saborDesplegar);
}

function saborDesplegar(oData) { // Despliega el sabor de la masa solicitadas a la API
	$("#cmbSabor option").remove();
	$("#cmbSabor").append("<option value=''>:: Seleccione ::</option>");
	$(oData).each(function() {
		$("#cmbSabor").append("<option value='" + this.id + "'>" + this.nombre + "</option>")
	});
}

/* desplegar Precio */

function obtenerPrecioTorta() { // Solicita a la API la id de la torta
	var tamano = $("#ulTamano input[name=personas]:checked").val();
	ajaxGet(rutaURL + "/torta/precio/" + $("#cmbTipoMasa").val() + "/" + $("#cmbSaborMasa").val() + "/" + $("#cmbSabor").val() + "/" + tamano, desplegarPrecioTorta);
}

function desplegarPrecioTorta(oData) { // Despliega la id de la torta
$("#ulPrecio li").remove();
	$(oData).each(function() {
			$("#ulPrecio").append("<li><input id='txtPrecios' class='form-control' type='text' value='" + this.precio + "' readonly></li>");
	});
}



/* VALIDACIONES */
function validaCamposPedido() {
	var msg = "";
	if ($('#txtSolicitante').val().trim() === "" || $('#txtTelefono').val().trim() === "") {
		msg = msg + "\n* Debe colocar su nombre y telefono";
	}
	if ($('#datePedido').val().trim() === "") {
		msg = msg + "\n* Debe seleccionar una fecha de retiro";
	}
	if ($('#cmbTipoMasa').val().trim() === '' || $('#cmbSaborMasa').val().trim() === '' || $('#cmbSabor').val().trim() === '') {
		msg = msg + "\n* Debe seleccionar los ingredientes de la torta";
	}
	if ($('#cmbSucursalRetiro').val().trim() === '') {
		msg = msg + "\n* Debe seleccionar una Sucursal de retiro";
	}
	if (!($("#ulTamano input[name=personas]").is(':checked'))) {
		msg = msg + "\n* Debe seleccionar el tamaño de la torta";
	}
	if (msg != "") {
		var message = 'El siguiente error ocurrio debido a que:' + msg;
		$('#alertModal').find('.modal-body p').text(message);
		$('#alertModal').modal('show')
		return false;
	} else {
		pedidoRegistrar(); 
	}
}
function validaTelefono(e) {
	tecla = (document.all) ? e.keyCode : e.which;

	//Tecla de retroceso para borrar, siempre la permite
	if (tecla == 8) {
		return true;
	}

	// Patron de entrada, en este caso solo acepta numeros
	patron = /[0-9]/;
	tecla_final = String.fromCharCode(tecla);
	return patron.test(tecla_final);
}
