var sucursal = {
	nombre: "sucursal",
	paginaInicial: "sucursal.html",
	listar: function() {

	}
}

function sucursalSerializar() {
	var datos = {
		"id": $("#txtID").val(),
		"nombre": $("#txtNombre").val(),
		"direccion": $("#txtDireccion").val(),
		"comuna": $("#txtComuna").val()
	}
	return datos;
}

function sucursalLlenaTabla(oData) {
	$("#tabSucursal tbody").remove();
	$(oData).each(function() {
		$("#tabSucursal").append("<tbody><tr style='cursor:pointer' onclick='sucursalEditar(this);'><td>" + this.id + "</td><td>" + this.nombre + "</td><td>" + this.direccion + "</td><td>" + this.comuna + "</td></tr></tbody>");
	});
}

function sucursalLimpiar(sucursalTipo) {
	$("#txtDireccion").val("");
	$("#txtComuna").val("");
	$("#txtPersonas").val("");
	$("#txtID").val("");
	if(sucursalTipo) {
		$("#txtNombre").val("");
		$("#txtNombre").focus();
	}
}

function sucursalAgregar() {
	sucursalLimpiar(true);
}

function sucursalListar() {
	ajaxGet(rutaURL + "/sucursal", sucursalLlenaTabla);
}

function sucursalEditar(oFila) {
	$("#txtID").val($(oFila).find("td")[0].innerHTML);
	$("#txtNombre").val($(oFila).find("td")[1].innerHTML);
	$("#txtDireccion").val($(oFila).find("td")[2].innerHTML);
	$("#txtComuna").val($(oFila).find("td")[3].innerHTML);
}

function sucursalRegistrar() {
	var datos = sucursalSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxPut(rutaURL + "/sucursal/" + datos.id, datos, sucursalListar);
	} else {
		ajaxPost(rutaURL + "/sucursal", datos, sucursalListar);
	}
	sucursalAgregar();
}

function sucursalEliminar() {
	var datos = sucursalSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxDelete(rutaURL + "/sucursal/" + datos.id, sucursalListar);
		sucursalAgregar();
	}
}

function sucursalCargar() {
	$("#cma-layout").load("sucursal.html", function() {
		sucursalListar();
		sucursalLimpiar(true);
		$("#btnNuevaSucursal").click(function() { sucursalAgregar(); });
		$("#btnRegistrarSucursal").click(function() { 
			validaCampos(); 
		});
		$("#btnEliminarSucursal").click(function() { 
			sucursalEliminar(); 
		});
	});
}

/* VALIDACIONES */
function validaCampos() {
	var msg = "";
	if ($('#txtNombre').val().trim() === "" || $('#txtDireccion').val().trim() === "" || $('#txtComuna').val().trim() === "") {
		msg = msg + "\n* No deben haber campos vacios";
	}
	if (msg != "") {
		var message = 'El siguiente error ocurrio debido a que:' + msg;
		$('#alertModal').find('.modal-body p').text(message);
		$('#alertModal').modal('show')
		return false;
	} else {
		sucursalRegistrar(); 
	}
}