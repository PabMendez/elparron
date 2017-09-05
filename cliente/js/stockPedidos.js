/* INICIO Stock Pedidos */

function stockPedidosDesplegarTortas(oData) {
	
		var htmlFila = "";
		$(oData).each(function () {
			htmlFila = htmlFila + `
				<tbody><tr class='item'>
					<td>` + this.masaTipo_nombre + ` ` + this.masaSabor_nombre/* (this.masaSabor_nombre != `Blanco` && this.masaSabor_nombre != `Nuez` ? ` ` + this.masaSabor_nombre : ``) */ + ` ` + this.sabor_nombre + `</td>
					<td><input type='text' value='0' id='txtCantidadStockPedido_` + this.id + `_1' ></td>
					<td><input type='text' value='0' id='txtCantidadStockPedido_` + this.id + `_2' ></td>
					<td><input type='text' value='0' id='txtCantidadStockPedido_` + this.id + `_3' ></td>
					<td><input type='text' value='0' id='txtCantidadStockPedido_` + this.id + `_4' ></td>
					<td id='tdTotal_` + this.id + `'></td>
				</tr></tbody>`;
		});
	
		$("#tabPedidoStock").append(htmlFila);
		$("#tabPedidoStock").append(`
			<tfoot><tr>
				<th>Total</th>
				<th id='tdStockPedidoTotal06'></th>
				<th id='tdStockPedidoTotal12'></th>
				<th id='tdStockPedidoTotal18'></th>
				<th id='tdStockPedidoTotal24'></th>
				<th id='tdStockPedidoTotalGlobal'></th>
			</tr><tfoot>`);
	
		stockPedidosTotaliza(oData);
		$("input").blur(function () {
			stockPedidosTotaliza();
		});
		$("input").focus(function () {
			$(this).select();
		});
		$("").click(function () {
			stockPedidosBuscar();
		});
	}
	
	function stockPedidosBuscar() {
		var sucursal = $("#cmbStockSucursal").val();
		ajaxGet(rutaURL + "/pedidoStock/" + sucursal, stockDesplegarPedidos);
	}
	
	function stockDesplegarPedidos(oData) {
		var item;
		// programacionDiariaNuevo(true);
		for (var x = 0; x < oData[0].detalle.length; x++) {
			item = oData[0].detalle[x];
			$("#txtCantidadStockPedido_" + item.torta_id + "_" + item.tamano_id).val(item.cantidad);
		}
		stockPedidosTotaliza();
	}
	
	function stockPedidosTotaliza() {
	
		var sumaFila = 0;
		var suma06 = 0;
		var suma12 = 0;
		var suma18 = 0;
		var suma24 = 0;
		var sumaTotal = 0;
		var col = 0;
	
		try {
	
			var fila;
			$("#tabPedidoStock .item").each(function () {
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
			$("#tdStockPedidoTotal06").html(suma06);
			$("#tdStockPedidoTotal12").html(suma12);
			$("#tdStockPedidoTotal18").html(suma18);
			$("#tdStockPedidoTotal24").html(suma24);
			$("#tdStockPedidoTotalGlobal").html(sumaTotal);
	
		} catch (e) {
			alert(e);
		}
    }
    
    function stockPedidoTortaListar() {
		ajaxGet(rutaURL + "/torta", stockPedidosDesplegarTortas);
	
	}
	
	function stockPedidoCarga() {
        $("#cma-layout").load("stock.html", function () {
            stockPedidoTortaListar();
            $("#cmbStockSucursal").click(function () {
                stockPedidosBuscar();
            }).blur(function () {
                stockPedidosBuscar();
            });
        });
    }
	