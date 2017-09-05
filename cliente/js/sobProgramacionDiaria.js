/* INICIO Programacion Diaria Sobrantes */

function sobranteProgramacionDiariaDesplegarTortas(oData) {

	var htmlFilaS = "";
	$(oData).each(function () {
		htmlFilaS = htmlFilaS + `
			<tbody><tr class='item'>
				<td>` + this.masaTipo_nombre + ` ` + this.masaSabor_nombre + ` ` + this.sabor_nombre + `</td>
				<td><input type='text' value='0' id='txtSobranteCantidad_` + this.id + `_1' readonly></td>
				<td><input type='text' value='0' id='txtSobranteCantidad_` + this.id + `_2' readonly></td>
				<td><input type='text' value='0' id='txtSobranteCantidad_` + this.id + `_3' readonly></td>
				<td><input type='text' value='0' id='txtSobranteCantidad_` + this.id + `_4' readonly></td>
				<td id='tdTotal_` + this.id + `'></td>
			</tr></tbody>`;
	});

	$("#tabSobranteProgramacionDiaria").append(htmlFilaS);
	$("#tabSobranteProgramacionDiaria").append(`
		<tfoot><tr>
			<th>Total</th>
			<th id='tdSobranteTotal06'></th>
			<th id='tdSobranteTotal12'></th>
			<th id='tdSobranteTotal18'></th>
			<th id='tdSobranteTotal24'></th>
			<th id='tdSobranteTotalGlobal'></th>
		</tr><tfoot>`);

	programacionDiariaTotalizaSobrante(oData);
	$("input").blur(function () {
		programacionDiariaTotalizaSobrante();
	});
	$("input").focus(function () {
		$(this).select();
	});
	$("").click(function () {
		programacionDiariaBuscarSobrante();
	});
}

function programacionDiariaBuscarSobrante() {
	var sobranteFecha = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + ($("#dateProgramacionDiaria").val().split("/")[0]) - 1;
	var sobranteSucural = $("#cmbProgramacionDiariaSucursal").val();
	ajaxGet(rutaURL + "/sobrante/" + sobranteFecha + "/" + sobranteSucural, programacionDiariaDesplegarSobrante);
}

function programacionDiariaDesplegarSobrante(oDataSob) {
	var item;
	// programacionDiariaNuevo(true);
	for (var i = 0; i < oDataSob[0].detalleSob.length; i++) {
		item = oDataSob[0].detalleSob[i];
		$("#txtSobranteCantidad_" + item.torta_id + "_" + item.tamano_id).val(item.cantidad);
	}
	// alert(JSON.stringify(oDataSob));
	programacionDiariaTotalizaSobrante();
}

function programacionDiariaTotalizaSobrante() {

	var sumaFila = 0;
	var suma06 = 0;
	var suma12 = 0;
	var suma18 = 0;
	var suma24 = 0;
	var sumaTotal = 0;
	var col = 0;

	try {

		var fila;
		$("#tabSobranteProgramacionDiaria .item").each(function () {
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
		$("#tdSobranteTotal06").html(suma06);
		$("#tdSobranteTotal12").html(suma12);
		$("#tdSobranteTotal18").html(suma18);
		$("#tdSobranteTotal24").html(suma24);
		$("#tdSobranteTotalGlobal").html(sumaTotal);

	} catch (e) {
		alert(e);
	}

}

function programacionDiariaSobranteSerlializar() {

	var sobranteFecha = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + $("#dateProgramacionDiaria").val().split("/")[0];
	var sobranteSucursal_id = $("#cmbProgramacionDiariaSucursal").val();

	var data = {
		"fecha": sobranteFecha,
		"sucursal_id": sobranteSucursal_id,
		"detalleSobrante": []
	}

	$("#tabSobranteProgramacionDiaria").find("input[type='text']").each(function () {
		item = {
			"torta_id": $(this).attr("id").split("_")[1],
			"tamano_id": $(this).attr("id").split("_")[2],
			"cantidad": $(this).val()
		}
		data.detalleSobrante.push(item);
	});
	return data;

}

  function programacionDiariaSobranteRegistrar() {
	var oDataSob = programacionDiariaSobranteSerlializar();
	alert(JSON.stringify(oDataSob));
	var mensajeSob = 'Datos Registrados ';
	ajaxPost(rutaURL + "/programacionDiaria/sobrante", oDataSob);
	$('#alertModalReg').find('.modal-body p').text(mensajeSob);
	$('#alertModalReg').modal('show')
} 
 
function sobranteProgramacionDiariaTortaListar() {
	ajaxGet(rutaURL + "/torta", sobranteProgramacionDiariaDesplegarTortas);

}


/* FIN Programacion diaria sobrantes */

function sobProDiariaCarga() {
	$("#cma-layout").load("programacionDiaria.html", function () {
		sobranteProgramacionDiariaTortaListar();
		$("#cmbProgramacionDiariaSucursal").click(function () {
			programacionDiariaBuscarSobrante();
		}).blur(function () {
			programacionDiariaBuscarSobrante();
		});
		$("#dateProgramacionDiaria").click(function () {
			programacionDiariaBuscarSobrante();
		}).blur(function () {
			programacionDiariaBuscarSobrante();
		});
		/* $("#btnRegistrarProgramacionDiaria").click(function () {
			programacionDiariaSobRegistrar();
		}); */
	});
}
