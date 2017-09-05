var torta = {
	nombre: "torta",
	paginaInicial: "torta.html",
	tortaSerializar: function() {
		var datos = {
			"id": $("#txtID").val(),
			"masaTipo_id": $("#cmbMasaTipo").val(),
			"masaSabor_id": $("#cmbSaborMasa").val(),
			"sabor_id": $("#cmbSaborTorta").val()
		}
		return datos;
	},
	tortaLlenaTabla: function(oData) {
		$("#tabTorta tbody").remove();
		$(oData).each(function() {
			$("#tabTorta").append("<tbody><tr style='cursor:pointer' onclick='tortaEditar(this)'><td>" + this.id + "</td><td>" + this.masaTipo_nombre + "</td><td>" + this.masaSabor_nombre + "</td><td>" + this.sabor_nombre + "</td></tr></tbody>");
		});
	},
	desplegarMasaTipo: function(oData) {
		$("#cmbMasaTipo option").remove();
		$("#cmbMasaTipo").append("<option value=''>:: Seleccione Tipo de Masa ::</option>");
		$(oData).each(function() {
			$("#cmbMasaTipo").append("<option value='" + this.id + "'>" + this.nombre + "</option>");
		});
	},
	desplegarMasaSabor: function(oData) {
		$("#cmbSaborMasa option").remove();
		$("#cmbSaborMasa").append("<option value=''>:: Seleccione Sabor de Masa ::</option>");
		$(oData).each(function() {
			$("#cmbSaborMasa").append("<option value='" + this.id + "'>" + this.nombre + "</option>");
		});
	},
	desplegarSaborTorta: function(oData) {
		$("#cmbSaborTorta option").remove();
		$("#cmbSaborTorta").append("<option value=''>:: Seleccione Sabor de la Torta ::</option>");
		$(oData).each(function() {
			$("#cmbSaborTorta").append("<option value='" + this.id + "'>" + this.nombre + "</option>");
		});
	},
	tortaLimpiar: function(tortaTipo) {
		$("#cmbSaborMasa").val("");
		$("#cmbSaborTorta").val("");
		$("#txtID").val("");
		ajaxGet(rutaURL + "/masaTipo", desplegarMasaTipo);
		ajaxGet(rutaURL + "/masaSabor", desplegarMasaSabor);
		ajaxGet(rutaURL + "/sabor", desplegarSaborTorta);
		if(tortaTipo) {
			$("#cmbMasaTipo").val("");
			$("#cmbMasaTipo").focus();
		}
	},
	tortaAgregar: function() {
		tortaLimpiar(true);
	},
	listar: function() {
		ajaxGet(rutaURL + "/torta", this.tortaLlenaTabla);
		ajaxGet(rutaURL + "/masaTipo", this.desplegarMasaTipo);
		ajaxGet(rutaURL + "/masaSabor", this.desplegarMasaSabor);
		ajaxGet(rutaURL + "/sabor", this.desplegarSaborTorta);
	},		
	tortaEditar: function(oFila) {
		$("#txtID").val($(oFila).find("td")[0].innerHTML);
		$("#cmbMasaTipo").val($(oFila).find("td")[1].innerHTML);
		$("#cmbSaborMasa").val($(oFila).find("td")[2].innerHTML);
		$("#cmbSaborTorta").val($(oFila).find("td")[3].innerHTML);
	},
	tortaRegistrar: function() {
		var datos = tortaSerializar();
		if(parseInt(datos.id) > 0) {
			ajaxPut(rutaURL + "/torta/" + datos.id, datos, listar);
		} else {
			ajaxPost(rutaURL + "/torta", datos, listar);
		}
		tortaAgregar();
	},	
	tortaEliminar: function() {
		var datos = tortaSerializar();
		if(parseInt(datos.id) > 0) {
			ajaxDelete(rutaURL + "/torta/" + datos.id, listar);
			tortaAgregar();
		}
	},
	cargaOpcion: function() {
		$("#divContenido").load("torta.html", function() {
			tortaLimpiar(true);
		});
	}
}

