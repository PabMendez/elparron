var sobrante = {
	nombre: "sobrante",
	paginaInicial: "sobrante.html",
	listar: function () {
	}
}

/* Fecha */
function sobranteCargarFecha() {
	$('#dateSobrante').datepicker({
		format: 'dd/mm/yyyy',
		todayBtn: "linked",
		clearBtn: true,
		language: "es",
		autoclose: true,
		todayHighlight: true,
		toggleActive: true
	});
	$('#dateSobrante').datepicker('setDate', 'now');
}

function sobranteDesplegarTortas(oData) {

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

	$("#tabSobrante").append(htmlFila);
	$("#tabSobrante").append(`
		<tfoot><tr>
			<th>Total</th>
			<th id='tdTotal06'></th>
			<th id='tdTotal12'></th>
			<th id='tdTotal18'></th>
			<th id='tdTotal24'></th>
			<th id='tdTotalGlobal'></th>
		</tr><tfoot>`);

	sobranteTotaliza(oData);
	$("input").blur(function () {
		sobranteTotaliza();
	});
	$("input").focus(function () {
		$(this).select();
	});

}

function sobranteBuscar() {
	if( $("#dateSobrante").val() != "" && $("#cmbSobranteSucursal").val() != "") {
		var fecha = $("#dateSobrante").val().split("/")[2] + $("#dateSobrante").val().split("/")[1] + $("#dateSobrante").val().split("/")[0];
		ajaxGet(rutaURL + "/sobrante/" + fecha + "/" + $("#cmbSobranteSucursal").val(), sobranteDesplegarDias);
	}
}

function sobranteDesplegarDias(oData) {
	var item;
	sobranteNuevo(true);
	for (var x = 0; x < oData[0].detalle.length; x++) {
		item = oData[0].detalle[x];
		$("#txtCantidad_" + item.torta_id + "_" + item.tamano_id).val(item.cantidad);
	}
	sobranteTotaliza();
}

function sobranteTotaliza() {

	var sumaFila = 0;
	var suma06 = 0;
	var suma12 = 0;
	var suma18 = 0;
	var suma24 = 0;
	var sumaTotal = 0;
	var col = 0;

	try {

		var fila;
		$("#tabSobrante .item").each(function () {
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

function sobranteNuevo(tipo) {

	$("input[id^=txtCantidad_]").val("0");
	$("td[id^=tdTotal_]").html("0");
	$("#tdTotal06").html("0");
	$("#tdTotal12").html("0");
	$("#tdTotal18").html("0");
	$("#tdTotal24").html("0");
	$("#tdTotalGlobal").html("0");
	
	if (!tipo) {
		$("#cmbSobranteSucursal").val("");
		$('#dateSobrante').datepicker('setDate', 'now');
	}

}

function sobranteSerlializar() {

	var fecha = $("#dateSobrante").val().split("/")[2] + $("#dateSobrante").val().split("/")[1] + $("#dateSobrante").val().split("/")[0];
	var sucursal_id = $("#cmbSobranteSucursal").val();

	var data = {
		"fecha": fecha,
		"sucursal_id": sucursal_id,
		"detalle": []
	}

	$("#tabSobrante").find("input[type='text']").each(function () {
		item = {
			"torta_id": $(this).attr("id").split("_")[1],
			"tamano_id": $(this).attr("id").split("_")[2],
			"cantidad": $(this).val()
		}
		data.detalle.push(item);
	});
	return data;

}

function sobranteRegistrar() {
	var oData = sobranteSerlializar();
	var mensaje = 'Datos Registrados ';
	ajaxPost(rutaURL + "/sobrante", oData);
	$('#alertModalReg').find('.modal-body p').text(mensaje);
	$('#alertModalReg').modal('show')
}

function sobranteDesplegarSucursal(oData) {
	$("#cmbSobranteSucursal option").remove();
	$("#cmbSobranteSucursal").append("<option value=''>:: Seleccione Sucursal ::</option>");
	$(oData).each(function () {
		$("#cmbSobranteSucursal").append("<option value='" + this.id + "'>" + this.nombre + "</option>");
	});
}

function sobranteTortaListar() {
	ajaxGet(rutaURL + "/torta", sobranteDesplegarTortas);

}

function sobranteSucursalListar() {
	ajaxGet(rutaURL + "/sucursal", sobranteDesplegarSucursal);
}

function sobranteCargar() {
	$("#cma-layout").load("sobrante.html", function () {
		sobranteTortaListar();
		sobranteSucursalListar();
		sobranteNuevo(true);
		$("#cmbSobranteSucursal").click(function () { sobranteBuscar(); }).blur(function () { sobranteBuscar(); });
		$("#dateSobrante").click(function () { sobranteBuscar(); }).blur(function () { sobranteBuscar(); });
		$("#btnNuevoSobrante").click(function () { sobranteNuevo(); });
		$("#btnRegistrarSobrante").click(function () { sobranteValidaRegistro(); });
	});
}

/*Validaciones*/

function sobranteValidar() {
	var msg = "";
	var jump = "\n";
	msg.css("background-color", "yellow");
	if ($("#dateSobrante").val() <= 0 && $("#cmbSobranteSucursal").val() <= 0) {
		msg = msg + "\n* Debe seleccionar fecha y sucursal";
		
	}
	if ($("#tdTotalGlobal").html() == "0") {
		msg = msg + "\n* Debe ingresar cantidad de tortas" + jump;
	}
	if (msg != "") {
		alert("No puede registrar programación de sobrantes debido a que:\n" + msg);
		return false;
	} else {
		return true;
	}
}

function sobranteValidaRegistro() {
	var msg = "";
	if ($("#dateSobrante").val() == 0 || $("#cmbSobranteSucursal").val() == 0) {
		msg = msg + '* Debe seleccionar fecha y sucursal';
	}
	if ($("#tdTotalGlobal").html() == "0") {
		msg = msg + '* Debe ingresar cantidad de tortas';
	}
	if (msg != "") {
		var mensaje = 'El siguiente error ocurrio debido a que: ';
		var jump = `
		`;
		let message = mensaje + '\n' + msg;
		$('#alertModal').find('.modal-body p').text(message);
		$('#alertModal').modal('show')
		return false;
	} else {
		sobranteRegistrar();
	}
}
