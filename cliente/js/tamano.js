var tamano = {
	nombre: "tamano",
	paginaInicial: "tamano.html",	
	listar: function() {
		//ajaxGet(rutaURL + "/tamano");
	}
}

function tamanoSerializar() {
	var datos = {
		"id": $("#txtID").val(),
		"num": $("#txtNum").val(),
		"personas": $("#txtPersonas").val()
	}
	return datos;
}

function tamanoLlenaTabla(oData) {
	$("#tabTamano tbody").remove();
	$(oData).each(function() {
		$("#tabTamano").append("<tbody><tr style='cursor:pointer' onclick='tamanoEditar(this);'><td>" + this.id + "</td><td>" + this.num + "</td><td>" + this.personas + "</td></tr></tbody>");
	});
}

function tamanoLimpiar(tamanoTipo) {
	$("#txtPersonas").val("");
	$("#txtID").val("");
	if(tamanoTipo) {
		$("#txtNum").val("");
		$("#txtNum").focus();
	}
}

function tamanoAgregar() {
	tamanoLimpiar(true);
}

function tamanoListar() {
	ajaxGet(rutaURL + "/tamano", tamanoLlenaTabla);
}

function tamanoEditar(oFila) {
	$("#txtID").val($(oFila).find("td")[0].innerHTML);
	$("#txtNum").val($(oFila).find("td")[1].innerHTML);
	$("#txtPersonas").val($(oFila).find("td")[2].innerHTML);
}

function tamanoRegistrar() {
	var datos = tamanoSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxPut(rutaURL + "/tamano/" + datos.id, datos, tamanoListar);
	} else {
		ajaxPost(rutaURL + "/tamano", datos, tamanoListar);
	}
	tamanoAgregar();
}

function tamanoEliminar() {
	var datos = tamanoSerializar();
	if(parseInt(datos.id) > 0) {
		ajaxDelete(rutaURL + "/tamano/" + datos.id, tamanoListar);
		tamanoAgregar();
	}
}

function tamanoCargar() {
	$("#cma-layout").load("tamano.html", function() {
		tamanoListar();
		tamanoLimpiar(true);
		$("#btnNuevoTamano").click(function() { tamanoAgregar(); });
		$("#btnRegistrarTamano").click(function() { 
			tamanoValidaTextos();	
		});
		$("#btnEliminarTamano").click(function() {  
			tamanoEliminar(); 
		});	
	});
}

/* VALIDACIONES */
function tamanoValidaTextos() {
	var msg = "";
	if ($('#txtNum').val().trim() === "" || $('#txtPersonas').val().trim() === "") {
		msg = msg + "\n* No deben haber campos vacios";
	}
	if (msg != "") {
		var message = 'El siguiente error ocurrio debido a que:' + msg;
		$('#alertModal').find('.modal-body p').text(message);
		$('#alertModal').modal('show')
		return false;
	} else {
		tamanoRegistrar();
	}
}

