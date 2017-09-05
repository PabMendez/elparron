var torta = {
	nombre: "torta",
	paginaInicial: "torta.html",	
	listar: function() {
		//ajaxGet(rutaURL + "/torta");
	}
}

function tortaSerializar() {
	var datos = {
		"id": $("#txtID").val(),
		"masaTipo_id": $("#cmbMasaTipo").val(),
		"masaSabor_id": $("#cmbSaborMasa").val(),
		"sabor_id": $("#cmbSaborTorta").val()
	}
	return datos;
}
function tortaLlenaTabla(oData) {
	$("#tabTorta tbody").remove();
	$(oData).each(function() {
		$("#tabTorta").append("<tbody><tr style='cursor:pointer' onclick='tortaEditar(this);'><td>" + this.id + "</td><td><input type='hidden' value='" + this.masaTipo_id + "'>" + this.masaTipo_nombre + "</td><td><input type='hidden' value='" + this.masaSabor_id + "'>" + this.masaSabor_nombre + "</td><td><input type='hidden' value='" + this.sabor_id + "'>" + this.sabor_nombre + "</td></tr></tbody>");
	});
}

function desplegarMasaTipo(oData) {
	$("#cmbMasaTipo option").remove();
	$("#cmbMasaTipo").append("<option value=''>:: Seleccione Tipo de Masa ::</option>");
	$(oData).each(function() {
		$("#cmbMasaTipo").append("<option value='" + this.id + "'>" + this.nombre + "</option>");
	});
}

function desplegarMasaSabor(oData) {
	$("#cmbSaborMasa option").remove();
	$("#cmbSaborMasa").append("<option value=''>:: Seleccione Sabor de Masa ::</option>");
	$(oData).each(function() {
		$("#cmbSaborMasa").append("<option value='" + this.id + "'>" + this.nombre + "</option>");
	});
}

function desplegarSaborTorta(oData) {
	$("#cmbSaborTorta option").remove();
	$("#cmbSaborTorta").append("<option value=''>:: Seleccione Sabor de la Torta ::</option>");
	$(oData).each(function() {
		$("#cmbSaborTorta").append("<option value='" + this.id + "'>" + this.nombre + "</option>");
	});
}

function tortaLimpiar(tortaTipo) {
	$("#cmbSaborMasa").val("");
	$("#cmbSaborTorta").val("");
	$("#txtID").val("");
	ajaxGet(rutaURL + "/masaTipo", desplegarMasaTipo);
	ajaxGet(rutaURL + "/masaSabor", desplegarMasaSabor);
	ajaxGet(rutaURL + "/sabor", desplegarSaborTorta);
	if(tortaTipo) {
		$("#cmbMasaTipo").val("");
		$("#cmbMasaTipo").focus();
	}
}

function tortaAgregar() {
	tortaLimpiar(true);
}

function tortaListar() {
	ajaxGet(rutaURL + "/torta", tortaLlenaTabla);
}

function tortaEditar(oFila) {
	$("#txtID").val($(oFila).find("td")[0].innerHTML);
	$("#cmbMasaTipo").val($($(oFila).find("td")[1]).find("input")[0].value);
	$("#cmbSaborMasa").val($($(oFila).find("td")[2]).find("input")[0].value);
	$("#cmbSaborTorta").val($($(oFila).find("td")[3]).find("input")[0].value);
}

function tortaRegistrar() {
	var datos = tortaSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxPut(rutaURL + "/torta/" + datos.id, datos, tortaListar);
	} else {
		ajaxPost(rutaURL + "/torta", datos, tortaListar);
	}
	tortaAgregar();
}

function tortaEliminar() {
	var datos = tortaSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxDelete(rutaURL + "/torta/" + datos.id, tortaListar);
		tortaAgregar();
	}
}

function tortaCargar() {
	$("#cma-layout").load("torta.html", function() {
		$("#btnNuevaTorta").click(function() { tortaAgregar(); });
		$("#btnRegistrarTorta").click(function() { tortaValidaTextos(); });
		$("#btnEliminarTorta").click(function() {  
				tortaEliminar();
				$('#modalEliminarTorta').modal('toggle'); 
		});
		tortaListar();
		tortaLimpiar(true);		
	});
}
/* VALIDACIONES */
function tortaValidaTextos() {
	var msg = "";
	if ($('#cmbMataTipo').val() === '' || $('#cmbSaborMasa').val() === '' || $('#cmbSaborTorta').val() === '') {
		msg = msg + "\n* Debe seleccionar los ingredientes de la torta";
	}
	if (msg != "") {
		var message = 'El siguiente error ocurrio debido a que:' + msg;
		$('#alertModal').find('.modal-body p').text(message);
		$('#alertModal').modal('show')
		return false;
	} else {
		tortaRegistrar();
	}
}