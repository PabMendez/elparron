var tortaPrecio = {
	nombre: "tortaPrecio",
	paginaInicial: "tortaPrecio.html",
	listar: function () {
		//ajaxGet(rutaURL + "/tortaPrecio");
	}
}

function tortaPrecioSerializar() {
	var datos = {
		"id": $("#txtID").val(),
		"torta_id": $("#cmbTortaPT").val(),
		"tamano_id": $("#cmbTamanoPT").val(),
		"precio_id": $("#cmbPrecioPT").val()
	}
	return datos;
}

/* function tortaPrecioLlenaTabla(oData) {
	$("#tabTortaPrecio tbody").remove();
	$(oData).each(function() {
		$("#tabTortaPrecio").append("<tbody><tr style='cursor:pointer' onclick='tortaPrecioEditar(this);'><td>" + this.id + "</td><td>" + this.torta_id + "</td><td>" + this.tamano_id + "</td><td>" + this.precio_id + "</td></tr></tbody>");
	});
} */

function tortaPrecioLlenaTabla(oData) {

	$("#tabTortaPrecio tbody").remove();
	var htmlFilaTP = "";

	$(oData).each(function () {
		htmlFilaTP = htmlFilaTP + `
			<tbody><tr style='cursor:pointer' onclick='tortaPrecioEditar(this);'>
				<td>` + this.id + `</td>
				<td><input type='hidden' value='` + this.torta_id + `'>` + this.masaTipo_nombre + ` ` + this.masaSabor_nombre + ` ` + this.sabor_nombre + `</td>
				<td><input type='hidden' value='` + this.tamano_id + `'>` + "(" + `` + this.num + `` + ")" + ` ` + "-" + ` ` + this.personas + `</td>
				<td><input type='hidden' value='` + this.precio_id + `'>` + "$" + `` + this.torta_precio + `</td>
			</tr></tbody>`;
	});

	$("#tabTortaPrecio").append(htmlFilaTP);
}

function tortaPrecioDesplegarTorta(oData) {
	$("#cmbTortaPT option").remove();
	$("#cmbTortaPT").append("<option value=''>:: Seleccione ::</option>");
	$(oData).each(function () {
		$("#cmbTortaPT").append("<option value='" + this.id + "'>" + this.masaTipo_nombre + "" + " " + "" + this.masaSabor_nombre + "" + " " + "" + this.sabor_nombre + "</option>");
	});
}

function tortaPrecioDesplegarTamano(oData) {
	$("#cmbTamanoPT option").remove();
	$("#cmbTamanoPT").append("<option value=''>:: Seleccione ::</option>");
	$(oData).each(function () {
		$("#cmbTamanoPT").append("<option value='" + this.id + "'>" + "(" + "" + this.num + "" + ") - " + "" + this.personas + "" + " Personas" + "</option>");
	});
}

function tortaPrecioDesplegarPrecio(oData) {
	$("#cmbPrecioPT option").remove();
	$("#cmbPrecioPT").append("<option value=''>:: Seleccione ::</option>");
	$(oData).each(function () {
		$("#cmbPrecioPT").append("<option value='" + this.id + "'>" + "$" + this.precio + "</option>");
	});
}

function tortaPrecioLimpiar(tortaPrecioTipo) {
	$("#cmbPrecioPT").val("");
	$("#cmbTamanoPT").val("");
	$("#txtID").val("");
	ajaxGet(rutaURL + "/torta", tortaPrecioDesplegarTorta);
	ajaxGet(rutaURL + "/tamano", tortaPrecioDesplegarTamano);
	ajaxGet(rutaURL + "/precio", tortaPrecioDesplegarPrecio);
	if (tortaPrecioTipo) {
		$("#cmbTortaPT").val("");
		$("#cmbTortaPT").focus();
	}
}

function tortaPrecioAgregar() {
	tortaPrecioLimpiar(true);
}

function tortaPrecioListar() {
	ajaxGet(rutaURL + "/tortaPrecio", tortaPrecioLlenaTabla);
}

function tortaPrecioEditar(oFila) {
	$("#txtID").val($(oFila).find("td")[0].innerHTML);
	$("#cmbTortaPT").val($($(oFila).find("td")[1]).find("input")[0].value);
	$("#cmbTamanoPT").val($($(oFila).find("td")[2]).find("input")[0].value);
	$("#cmbPrecioPT").val($($(oFila).find("td")[3]).find("input")[0].value);
}

/* function tortaEditar(oFila) {
	$("#txtID").val($(oFila).find("td")[0].innerHTML);
	$("#cmbMasaTipo").val($($(oFila).find("td")[1]).find("input")[0].value);
	$("#cmbSaborMasa").val($($(oFila).find("td")[2]).find("input")[0].value);
	$("#cmbSaborTorta").val($($(oFila).find("td")[3]).find("input")[0].value);
} */

function tortaPrecioRegistrar() {
	var datos = tortaPrecioSerializar();
	if (parseInt(datos.id) > 0) {
		ajaxPut(rutaURL + "/tortaPrecio/" + datos.id, datos, tortaPrecioListar);
	} else {
		ajaxPost(rutaURL + "/tortaPrecio", datos, tortaPrecioListar);
	}
	tortaPrecioAgregar();
}

function tortaPrecioEliminar() {
	var datos = tortaPrecioSerializar();
	if (parseInt(datos.id) > 0) {
		ajaxDelete(rutaURL + "/tortaPrecio/" + datos.id, tortaPrecioListar);
		tortaPrecioAgregar();
	}
}

// function tortaPrecioValidaTextos() {
// 	if ($("#txtNum").val() != 0 && $("#txtPersonas").val() != 0) {
// 		tortaPrecioRegistrar();
// 		$("#divTortaPrecioError").toggle(function () { $("#divTortaPrecioError").append(""); });
// 	} else {
// 		$("#divTortaPrecioError").append("<div class='alert alert-danger' role='alert'>*¡¡Por favor ingrese numero y personas!!*</div>");
// 	}
// }


function tortaPrecioCuentaFilas() {
	// var rows = document.getElementById('tabTortaPrecio').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
	$("#tortaPrecioFilas p").remove();
	var rows = $('#tabTortaPrecio tbody tr').length;
	var fila = rows;
	$("#tortaPrecioFilas").append(`<p>La tabla tiene ` + fila + ` filas</p>`);
}

function tortaPrecioCargar() {
	$("#cma-layout").load("tortaPrecio.html", function () {
		tortaPrecioListar();
		tortaPrecioLimpiar(true);
		tortaPrecioCuentaFilas();
		$("#btnNuevoTortaPrecio").click(function () { tortaPrecioAgregar(); });
		//$("#btnRegistrarTortaPrecio").click(function() { tortaPrecioRegistrar(); });
		$("#btnRegistrarTortaPrecio").click(function () {
			tortaPrecioValidaTextos();
		});
		$("#btnEliminarTortaPrecio").click(function () {
			tortaPrecioEliminar();
			$('#modalEliminarTortaPrecio').modal('toggle');
		});
	});
}

/* VALIDACIONES */
function tortaPrecioValidaTextos() {
	var msg = "";
	if ($('#cmbTortaPT').val().trim() === '' || $('#cmbTamanoPT').val().trim() === '' || $('#cmbPrecioPT').val().trim() === '') {
		msg = msg + "\n* Debe seleccionar una opcion de cada combo";
	}
	if (msg != "") {
		var message = 'El siguiente error ocurrio debido a que:' + msg;
		$('#alertModal').find('.modal-body p').text(message);
		$('#alertModal').modal('show')
		return false;
	} else {
		tortaPrecioRegistrar();
	}
}

