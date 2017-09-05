/* INICIO Stock PedidoEspecials */

function pedidoEspecialProgramacionDiariaDesplegarTortas(oData) {

	$("#tabPedidoEspecialProgramacionDiaria tbody").remove();
	var anterior = 0;
	var total = 0;
	var granTotal = 0;
	var htmlFilaPE = "";


	$(oData).each(function () {
		if (this.diet == 0) {
			this.diet = 'No';
		} else {
			this.diet = 'Si';
		}
		if (this.forma == 0) {
			this.forma = 'Redonda';
		} else {
			this.forma = 'Cuadrada';
		}

		htmlFilaPE = htmlFilaPE + `
			<tbody><tr class=''>
				<td id='tdEspecialId'>` + this.id + `</td>
				<td>` + this.masaTipo_nombre + ` ` + this.masaSabor_nombre + ` ` + this.sabor_nombre + `</td>
				<td>` + this.personas + `</td>
				<td>` + this.forma + `</td>
				<td>` + this.diet + `</td>
			</tr></tbody>`;
		granTotal = granTotal + total;
		total = 0;
		total = total + 1;
		anterior = this.id;
	});
	granTotal = granTotal + total;

	$("#tabPedidoEspecialProgramacionDiaria").append(htmlFilaPE);
	$("#tabPedidoEspecialProgramacionDiaria tfoot").remove();
	$("#tabPedidoEspecialProgramacionDiaria").append(`
		<tfoot>
			<tr>
				<th colspan=4>Total</th>
				<th id='thEspecialGranTotal'>` + granTotal + `</th>
			</tr>
		</tfoot>
		`);
}

function programacionDiariaBuscarPedidoEspecial() {
	var pedidoEspecialFecha = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + ($("#dateProgramacionDiaria").val().split("/")[0]);
	var pedidoEspecialSucural = $("#cmbProgramacionDiariaSucursal").val();
	ajaxGet(rutaURL + "/pedidoEspecial/" + pedidoEspecialFecha + "/" + pedidoEspecialSucural, pedidoEspecialProgramacionDiariaDesplegarTortas);
}

function programacionDiariaPedidoEspecialSerlializar() {

	var especialFecha = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + $("#dateProgramacionDiaria").val().split("/")[0];
	var especialSucursal_id = $("#cmbProgramacionDiariaSucursal").val();

	var data = {
		"fecha": especialFecha,
		"sucursal_id": especialSucursal_id,
		"detalleEspecial": []
	}
	$("#tabProgramacionDiaria").find("input[type='text']").each(function () {
		item = {
			"pedidoEspecial_id": $("#tdEspecialId").val(),
			"impreso": "NULL",
			"fabricado": "NULL",
			"camioneta": "NULL",
			"guiaDespacho": "NULL",
			"recepcionado": "NULL",
			"vendido": "NULL"
		}
	});
	data.detalleEspecial.push(item);
	return data;

}

function programacionDiariaPedidoEspecialRegistrar() {
	var oDataEsp = programacionDiariaPedidoEspecialSerlializar();
	alert(JSON.stringify(oDataEsp));
	var mensaje = 'Datos Registrados ';
	ajaxPost(rutaURL + "/programacionDiaria/especial", oDataEsp);
	$('#alertModalReg').find('.modal-body p').text(mensaje);
	$('#alertModalReg').modal('show')
}

function pedidoEspecialProDiariaCarga() {
	$("#cma-layout").load("programacionDiaria.html", function () {
		$("#cmbProgramacionDiariaSucursal").click(function () {
			programacionDiariaBuscarPedidoEspecial();
		}).blur(function () {
			programacionDiariaBuscarPedidoEspecial();
		});
		$("#dateProgramacionDiaria").click(function () {
			programacionDiariaBuscarPedidoEspecial();
		}).blur(function () {
			programacionDiariaBuscarPedidoEspecial();
		});
	});
}

/* FIN Programacion diaria pedidoEspecials */