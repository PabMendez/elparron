var programacionDiaria = {
	nombre: "programacionDiaria",
	paginaInicial: "programacionDiaria.html",
	listar: function () {
	}
}

/* Fecha */
function programacionDiariaCargarFecha() {
	$('#dateProgramacionDiaria').datepicker({
		format: 'dd/mm/yyyy',
		todayBtn: "linked",
		clearBtn: true,
		language: "es",
		autoclose: true,
		todayHighlight: true,
		toggleActive: true
	});
	$('#dateProgramacionDiaria').datepicker('setDate', 'now');
}

/* INICIO Programacion Diaria Normal */

function programacionDiariaDesplegarTortas(oData) {

	var htmlFila = "";
	$(oData).each(function () {
		htmlFila = htmlFila + `
			<tbody><tr class='item'>
				<td>` + this.masaTipo_nombre + ` ` + this.masaSabor_nombre/* (this.masaSabor_nombre != `Blanco` && this.masaSabor_nombre != `Nuez` ? ` ` + this.masaSabor_nombre : ``) */ + ` ` + this.sabor_nombre + `</td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_1' ></td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_2' ></td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_3' ></td>
				<td><input type='text' value='0' id='txtCantidad_` + this.id + `_4' ></td>
				<td id='tdTotal_` + this.id + `'></td>
			</tr></tbody>`;
	});

	$("#tabProgramacionDiaria").append(htmlFila);
	$("#tabProgramacionDiaria").append(`
		<tfoot><tr>
			<th>Total</th>
			<th id='tdTotal06'></th>
			<th id='tdTotal12'></th>
			<th id='tdTotal18'></th>
			<th id='tdTotal24'></th>
			<th id='tdTotalGlobal'></th>
		</tr><tfoot>`);

	programacionDiariaTotaliza(oData);
	$("input").blur(function () {
		programacionDiariaTotaliza();
	});
	$("input").focus(function () {
		$(this).select();
	});
	$("").click(function () {
		programacionDiariaBuscar();
	});
}

function programacionDiariaBuscar() {
	// var fecha = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + $("#dateProgramacionDiaria").val().split("/")[0];
	/* 	var date = $("#dateProgramacionDiaria").val();
		var diaSemana = date.split('/')[2].split(' ')[1]; */
	var date = $("#dateProgramacionDiaria").datepicker('getDate'),
		diaSemana = date.getDay();
	// alert(diaSemana);
	var sucursal = $("#cmbProgramacionDiariaSucursal").val();
	ajaxGet(rutaURL + "/semana/" + diaSemana + "/" + sucursal, programacionDiariaDesplegarDias);
}

function programacionDiariaDesplegarDias(oData) {
	var item;
	programacionDiariaNuevo(true);
	for (var x = 0; x < oData[0].detalle.length; x++) {
		item = oData[0].detalle[x];
		$("#txtCantidad_" + item.torta_id + "_" + item.tamano_id).val(item.cantidad);
	}
	programacionDiariaTotaliza();
}

function programacionDiariaTotaliza() {

	var sumaFila = 0;
	var suma06 = 0;
	var suma12 = 0;
	var suma18 = 0;
	var suma24 = 0;
	var sumaTotal = 0;
	var col = 0;

	try {

		var fila;
		$("#tabProgramacionDiaria .item").each(function () {
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

/* FIN Programacion Diaria Normal */


function programacionDiariaNuevo(tipo) {

	$("input[id^=txtCantidad_]").val("0");
	$("input[id^=txtSobranteCantidad_]").val("0");	
	// $("input[id^=txtEspecialCantidad_]").val("0");	
	$("td[id^=tdTotal_]").html("0");
	$("#tdTotal06").html("0");
	$("#tdTotal12").html("0");
	$("#tdTotal18").html("0");
	$("#tdTotal24").html("0");
	$("#tdTotalGlobal").html("0");
	$("#tdSobranteTotal06").html("0");
	$("#tdSobranteTotal12").html("0");
	$("#tdSobranteTotal18").html("0");
	$("#tdSobranteTotal24").html("0");
	$("#tdSobranteTotalGlobal").html("0");
	// $("#thEspecialGranTotal").html("0");
	// $("#txtEspecialCantidad_torta").val("");	
	// $("input[type='text']").val("0");

	if (!tipo) {
		$("#cmbProgramacionDiariaSucursal").val("");
		$("#cmbProgramacionDiariaSucursal").focus();
		$('#dateSobrante').datepicker('setDate', 'now');
	}

}

  function programacionDiariaNormalSerlializar() {

	var fecha = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + $("#dateProgramacionDiaria").val().split("/")[0];
	var sucursal_id = $("#cmbProgramacionDiariaSucursal").val();

	var data = {
		"fecha": fecha,
		"sucursal_id": sucursal_id,
		"detalleNormal": []
	}

	$("#tabProgramacionDiaria").find("input[type='text']").each(function () {
		item = {
			"torta_id": $(this).attr("id").split("_")[1],
			"tamano_id": $(this).attr("id").split("_")[2],
			"impreso": "NULL",
			"fabricado":"NULL",
			"camioneta":"NULL",
			"guiaDespacho":"NULL",
			"recepcionado":"NULL",
			"vendido":"NULL"
		}
		data.detalleNormal.push(item);
	});
	return data;

} 

function programacionDiariaNormalRegistrar() {
	var oDataNor = programacionDiariaNormalSerlializar();
	alert(JSON.stringify(oDataNor));
	var mensaje = 'Datos Registrados ';
	ajaxPost(rutaURL + "/programacionDiaria/normal",oDataNor);
	$('#alertModalReg').find('.modal-body p').text(mensaje);
	$('#alertModalReg').modal('show')
} 

function programacionDiariaDesplegarSucursal(oData) {
	$("#cmbProgramacionDiariaSucursal option").remove();
	$("#cmbProgramacionDiariaSucursal").append("<option value=''>:: Seleccione ::</option>");
	$(oData).each(function () {
		$("#cmbProgramacionDiariaSucursal").append("<option value='" + this.id + "'>" + this.nombre + "</option>");
	});
}

function programacionDiariaTortaListar() {
	ajaxGet(rutaURL + "/torta", programacionDiariaDesplegarTortas);

}


function programacionDiariaSucursalListar() {
	ajaxGet(rutaURL + "/sucursal", programacionDiariaDesplegarSucursal);
}

function programacionDiariaPedidoListar() {
	ajaxGet(rutaURL + "/pedido", programacionDiariaDesplegarPedido, programacionDiariaDesplegarPedidos);
}


function programacionDiariaCargar() {
	$("#cma-layout").load("programacionDiaria.html", function () {
		programacionDiariaTortaListar();
		// sobProDiariaTortaListar();
		programacionDiariaSucursalListar();
		programacionDiariaNuevo(true);
		$("#cmbProgramacionDiariaSucursal").click(function () {
			programacionDiariaBuscar();
			// sobProDiariaBuscar();
		}).blur(function () {
			programacionDiariaBuscar();
			// sobProDiariaBuscar();
		});
		$("#dateProgramacionDiaria").click(function () { 
			programacionDiariaBuscar(); 
			// sobProDiariaBuscar();
		}).blur(function () { 
			programacionDiariaBuscar(); 
			// sobProDiariaBuscar();
		});
		// $("#btnBuscarProgramacionDiaria").click(function () { programacionDiariaValidaBusqueda(); });
		$("#btnNuevoProgramacionDiaria").click(function () { 
			programacionDiariaNuevo(); 
		});
		 $("#btnRegistrarProgramacionDiaria").click(function () {
			programacionDiariaValidaRegistro();
		}); 
	});
}

/*Validaciones*/

function programacionDiariaValidar() {
	var msg = "";
	if ($("#dateProgramacionDiaria").val() <= 0 && $("#cmbProgramacionDiariaSucursal").val() <= 0) {
		msg = msg + "\n* Debe seleccionar fecha y sucursal";
	}
	if ($("#tdTotalGlobal").html() == "0") {
		msg = msg + "\n* Debe ingresar cantidad de tortas";
	}
	if (msg != "") {
		alert("No puede registrar programación de programacionDiarias debido a que:\n" + msg);
		return false;
	} else {
		return true;
	}
}

function programacionDiariaValidaBusqueda() {
	if ($("#dateProgramacionDiaria").val() != 0 && $("#cmbProgramacionDiariaSucursal").val() != 0) {
		programacionDiariaBuscar();
	} else {
		var error = 'Debe seleccionar fecha y sucursal';
		var mensaje = 'El siguiente error ocurrio debido a que:' + error;
		$('#alertModal').find('.modal-body p').text(mensaje);
		$('#alertModal').modal('show')
		// document.getElementById('divErrors').innerHTML = "<div class='alert alert-danger' role='alert'>¡¡Debe seleccionar día de la programacionDiaria y sucursal!!</div>";
	}
}

function programacionDiariaValidaRegistro() {
	var msg = "";
	if ($("#dateProgramacionDiaria").val() <= 0 || $("#cmbProgramacionDiariaSucursal").val() <= 0) {
		msg = msg + "\b* Debe seleccionar fecha y sucursal";
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
		/* programacionDiariaNormalRegistrar();
		programacionDiariaSobranteSerlializar();
		programacionDiariaPedidoRegistrar(); */
		programacionDiariaPedidoEspecialRegistrar();
	}
}

