var semana = {
	nombre: "semana",
	paginaInicial: "semana.html",
	listar: function () {

	}
}

function semanaDesplegarTortas(oData) {

	var htmlFila = "";
	$(oData).each(function () {
		htmlFila = htmlFila + `
			<tbody><tr class='item'>
				<td>` + this.masaTipo_nombre + (this.masaSabor_nombre != `Blanco` && this.masaSabor_nombre != `Nuez` ? ` ` + this.masaSabor_nombre : ``) + ` ` + this.sabor_nombre + `</td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_1'></td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_2'></td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_3'></td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_4'></td>
				<td id='tdTotal_` + this.id + `'></td>
			</tr></tbody>`;
	});

	$("#tabSemana").append(htmlFila);
	$("#tabSemana").append(`
		<tfoot><tr>
			<th>Total</th>
			<th id='tdTotal06'></th>
			<th id='tdTotal12'></th>
			<th id='tdTotal18'></th>
			<th id='tdTotal24'></th>
			<th id='tdTotalGlobal'></th>
		</tr><tfoot>`);

	semanaTotaliza(oData);
	$("input").blur(function () {
		semanaTotaliza();
	});
	$("input").focus(function () {
		$(this).select();
	});
	$("").click(function () {
		semanaBuscar();
	});
}

function semanaBuscar() {
	ajaxGet(rutaURL + "/semana/" + $("#cmbDia").val() + "/" + $("#cmbSemanaSucursal").val(), semanaDesplegarDias);

}

function semanaDesplegarDias(oData) {
	var item;
	semanaNuevo(true);
	for (var x = 0; x < oData[0].detalle.length; x++) {
		item = oData[0].detalle[x];
		$("#txtCantidad_" + item.torta_id + "_" + item.tamano_id).val(item.cantidad);
	}
	semanaTotaliza();
}

function semanaTotaliza() {

	var sumaFila = 0;
	var suma06 = 0;
	var suma12 = 0;
	var suma18 = 0;
	var suma24 = 0;
	var sumaTotal = 0;
	var col = 0;

	try {

		var fila;
		$("#tabSemana .item").each(function () {
			sumaFila = 0;
			col = 0;
			fila = $(this);
			fila.find("input").each(function () {
				sumaFila = sumaFila + parseInt($(this).val());
				sumaTotal = sumaTotal + parseInt($(this).val());
				switch (col) {
					case 0:
						suma06 = suma06 + parseInt($(this).val());
						break;
					case 1:
						suma12 = suma12 + parseInt($(this).val());
						break;
					case 2:
						suma18 = suma18 + parseInt($(this).val());
						break;
					case 3:
						suma24 = suma24 + parseInt($(this).val());
						fila.find("td")[5].innerHTML = sumaFila;
						break;
				}
				col++;
			});
			sumaFila++;
		});
		$("#tdTotal06").html(suma06);
		$("#tdTotal12").html(suma12);
		$("#tdTotal18").html(suma18);
		$("#tdTotal24").html(suma24);
		$("#tdTotalGlobal").html(sumaTotal);

	} catch (e) {
		alert(e);
	}

}

function semanaNuevo(tipo) {

	$("td[id^=tdTotal_]").html("0");
	$("#tdTotal06").html("0");
	$("#tdTotal12").html("0");
	$("#tdTotal18").html("0");
	$("#tdTotal24").html("0");
	$("#tdTotalGlobal").html("0");
	$("input[type='text']").val("0");
	if (!tipo) {
		$("#cmbSemanaSucursal").val("");
		$("#cmbDia").val("");
		$("#cmbDia").focus();
	}

}

function semanaSerlializar() {

	var dia = $("#cmbDia").val();
	var sucursal_id = $("#cmbSemanaSucursal").val();

	var data = {
		"dia": dia,
		"sucursal_id": sucursal_id,
		"detalle": []
	}

	$("#tabSemana").find("input[type='text']").each(function () {
		item = {
			"torta_id": $(this).attr("id").split("_")[1],
			"tamano_id": $(this).attr("id").split("_")[2],
			"cantidad": $(this).val()
		}
		data.detalle.push(item);
	});
	return data;

}

function semanaRegistrar() {
	var oData = semanaSerlializar();
	// alert(JSON.stringify(oData));
	var mensaje = 'Datos Registrados ';
	ajaxPost(rutaURL + "/semana", oData);
	$('#alertModalReg').find('.modal-body p').text(mensaje);
	$('#alertModalReg').modal('show')
}

function semanaDesplegarSucursal(oData) {
	$("#cmbSemanaSucursal option").remove();
	$("#cmbSemanaSucursal").append("<option value=''>:: Seleccione Sucursal ::</option>");
	$(oData).each(function () {
		$("#cmbSemanaSucursal").append("<option value='" + this.id + "'>" + this.nombre + "</option>");
	});
}

function semanaTortaListar() {
	ajaxGet(rutaURL + "/torta", semanaDesplegarTortas);

}

function semanaSucursalListar() {
	ajaxGet(rutaURL + "/sucursal", semanaDesplegarSucursal);
}

function semanaCargar() {
	$("#cma-layout").load("semana.html", function () {
		semanaTortaListar();
		semanaSucursalListar();
		semanaNuevo(true);
		$("#cmbSemanaSucursal").click(function () { semanaBuscar(); }).blur(function () { semanaBuscar(); });
		$("#cmbDia").click(function () { semanaBuscar(); }).blur(function () { semanaBuscar(); });
		// $("#btnBuscarSemana").click(function () { semanaValidaBusqueda(); });
		$("#btnNuevoSemana").click(function () { semanaNuevo(); });
		$("#btnRegistrarSemana").click(function () { semanaValidaRegistro(); });
	});
}

/*Validaciones*/

function semanaValidar() {
	var msg = "";
	if ($("#cmbDia").val() <= 0 && $("#cmbSemanaSucursal").val() <= 0) {
		msg = msg + "\n* Debe seleccionar día de la semana y sucursal";
	}
	if ($("#tdTotalGlobal").html() == "0") {
		msg = msg + "\n* Debe ingresar cantidad de tortas";
	}
	if (msg != "") {
		alert("No puede registrar programación semanal debido a que:\n" + msg);
		return false;
	} else {
		return true;
	}
}

function semanaValidaBusqueda() {
	if ($("#cmbDia").val() != 0 && $("#cmbSemanaSucursal").val() != 0) {
		semanaBuscar();
	} else {
		var error = 'Debe seleccionar día de la semana y sucursal';
		var mensaje = 'El siguiente error ocurrio debido a que:' + error;
		$('#alertModal').find('.modal-body p').text(mensaje);
		$('#alertModal').modal('show')
		// document.getElementById('divErrors').innerHTML = "<div class='alert alert-danger' role='alert'>¡¡Debe seleccionar día de la semana y sucursal!!</div>";
	}
}

function semanaValidaRegistro() {
	var msg = "";
	if ($("#cmbDia").val() <= 0 || $("#cmbSemanaSucursal").val() <= 0) {
		msg = msg + "\b* Debe seleccionar día de la semana y sucursal";
	}
	if ($("#tdTotalGlobal").html() == "0") {
		msg = msg + "* Debe ingresar cantidad de tortas";
	}
	if (msg != "") {
		var mensaje = 'El siguiente error ocurrio debido a que: ' + msg;
		$('#alertModal').find('.modal-body p').text(mensaje);
		$('#alertModal').modal('show')
		return false;
	} else {
		semanaRegistrar();
	}
}
