/* INICIO Programacion Diaria Pedidos */

function pedidoProgramacionDiariaDesplegarTortas(oData) {

	var htmlFilaS = "";
	$(oData).each(function () {
		htmlFilaS = htmlFilaS + `
			<tbody><tr class='item'>
				<td>` + this.masaTipo_nombre + ` ` + this.masaSabor_nombre + ` ` + this.sabor_nombre + `</td>
				<td><input type='text' value='0' id='txtPedidoCantidad_` + this.id + `_1' readonly></td>
				<td><input type='text' value='0' id='txtPedidoCantidad_` + this.id + `_2' readonly></td>
				<td><input type='text' value='0' id='txtPedidoCantidad_` + this.id + `_3' readonly></td>
				<td><input type='text' value='0' id='txtPedidoCantidad_` + this.id + `_4' readonly></td>
				<td id='tdTotal_` + this.id + `'></td>
			</tr></tbody>`;
	});

	$("#tabPedidoProgramacionDiaria").append(htmlFilaS);
	$("#tabPedidoProgramacionDiaria").append(`
		<tfoot><tr>
			<th>Total</th>
			<th id='tdPedidoTotal06'></th>
			<th id='tdPedidoTotal12'></th>
			<th id='tdPedidoTotal18'></th>
			<th id='tdPedidoTotal24'></th>
			<th id='tdPedidoTotalGlobal'></th>
		</tr><tfoot>`);

	programacionDiariaTotalizaPedido(oData);
	$("input").blur(function () {
		programacionDiariaTotalizaPedido();
	});
	$("input").focus(function () {
		$(this).select();
	});
	$("").click(function () {
		programacionDiariaBuscarPedido();
	});
}

function programacionDiariaBuscarPedido() {
	var pedidoFecha = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + ($("#dateProgramacionDiaria").val().split("/")[0]);
	var pedidoSucural = $("#cmbProgramacionDiariaSucursal").val();
	ajaxGet(rutaURL + "/pedido/" + pedidoFecha + "/" + pedidoSucural, programacionDiariaDesplegarPedido);
}

function programacionDiariaDesplegarPedido(oData) {
	var item;
	// programacionDiariaNuevo(true);
	for (var i = 0; i < oData[0].detalle.length; i++) {
		item = oData[0].detalle[i];
		$("#txtPedidoCantidad_" + item.torta_id + "_" + item.tamano_id).val(item.cantidad);
	}
	// alert(JSON.stringify(oData));
	programacionDiariaTotalizaPedido();
}

function programacionDiariaTotalizaPedido() {

	var sumaFila = 0;
	var suma06 = 0;
	var suma12 = 0;
	var suma18 = 0;
	var suma24 = 0;
	var sumaTotal = 0;
	var col = 0;

	try {

		var fila;
		$("#tabPedidoProgramacionDiaria .item").each(function () {
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
		$("#tdPedidoTotal06").html(suma06);
		$("#tdPedidoTotal12").html(suma12);
		$("#tdPedidoTotal18").html(suma18);
		$("#tdPedidoTotal24").html(suma24);
		$("#tdPedidoTotalGlobal").html(sumaTotal);

	} catch (e) {
		alert(e);
	}

}

function pedidoProgramacionDiariaTortaListar() {
	ajaxGet(rutaURL + "/torta", pedidoProgramacionDiariaDesplegarTortas);

}

function programacionDiariaPedidoSerlializar() {

	var pedidoFecha = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + $("#dateProgramacionDiaria").val().split("/")[0];
	var pedidoSucursal_id = $("#cmbProgramacionDiariaSucursal").val();

	var data = {
		"fecha": pedidoFecha,
		"sucursal_id": pedidoSucursal_id,
		"detallePedido": []
	}

	$("#tabPedidoProgramacionDiaria").find("input[type='text']").each(function () {
		item = {
			"torta_id": $(this).attr("id").split("_")[1],
			"tamano_id": $(this).attr("id").split("_")[2],
			"impreso": "NULL",
			"fabricado": "NULL",
			"camioneta": "NULL",
			"guiaDespacho": "NULL",
			"recepcionado": "NULL",
			"vendido": "NULL"
		}
		data.detallePedido.push(item);
	});
	return data;

}

function programacionDiariaPedidoRegistrar() {
	var oDataPed = programacionDiariaPedidoSerlializar();
	alert(JSON.stringify(oDataPed));
	var mensaje = 'Datos Registrados ';
	ajaxPost(rutaURL + "/programacionDiaria/pedido", oDataPed);
	$('#alertModalReg').find('.modal-body p').text(mensaje);
	$('#alertModalReg').modal('show')
}

/* FIN Programacion diaria pedidos */

function pedProDiariaCarga() {
	$("#cma-layout").load("programacionDiaria.html", function () {
		pedidoProgramacionDiariaTortaListar();
		$("#cmbProgramacionDiariaSucursal").click(function () {
			programacionDiariaBuscarPedido();
		}).blur(function () {
			programacionDiariaBuscarPedido();
		});
		$("#dateProgramacionDiaria").click(function () {
			programacionDiariaBuscarPedido();
		}).blur(function () {
			programacionDiariaBuscarPedido();
		});
	});
}

