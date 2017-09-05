/* INICIO Stock PedidoEspecials */

function pedidoEspecialStockDesplegarTortas(oData) {
	
		$("#tabPedidoEspecialStock tbody").remove();
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
					<td id='tdStockEspecialId'>` + this.id + `</td>
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
	
		$("#tabPedidoEspecialStock").append(htmlFilaPE);
		$("#tabPedidoEspecialStock tfoot").remove();
		$("#tabPedidoEspecialStock").append(`
			<tfoot>
				<tr>
					<th colspan=4>Total</th>
					<th id='thStockEspecialGranTotal'>` + granTotal + `</th>
				</tr>
			</tfoot>
			`);
	}
	
	function stockBuscarPedidoEspecial() {
		var pedidoEspecialSucursal = $("#cmbStockSucursal").val();
		ajaxGet(rutaURL + "/pedidoEspecialStock/" + pedidoEspecialSucursal, pedidoEspecialStockDesplegarTortas);
	}
	
	function stockPedidoEspecialCarga() {
		$("#cma-layout").load("stock.html", function () {
			$("#cmbStockSucursal").click(function () {
				stockBuscarPedidoEspecial();
			}).blur(function () {
				stockBuscarPedidoEspecial();
			});
		});
	}
	
	/* FIN Stock pedidoEspecials */