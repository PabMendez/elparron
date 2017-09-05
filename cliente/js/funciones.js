/*
+569 8 444 1384 Cesar Silva
Samsung R440
*/

//var rutaURL = "http://138.197.7.205/gt/api/web";
//var rutaURL = "http://138.197.7.205:3000/api";
var rutaURL = "http://localhost:3000/api";


var jsonTableConfig = {
	"dom": '<"toolbar">frtip',
	"language": {
		"sLengthMenu": "Mostrar _MENU_ registros",
		"sInfo": "Mostrando del _START_ al _END_ de un total de _TOTAL_ registros",
		"sSearch": "Buscar:",
		"oPaginate": {
			"sFirst": "Primero",
			"sLast": "Último",
			"sNext": "Siguiente",
			"sPrevious": "Anterior"
		}
	},
	"info": false,
	"columnDefs": [
	{
	    "targets": [0],
	    "visible": false,
	    "searchable": false
	}],
	"scrollY": "450px",
	"scrollCollapse": true,
}

function cma_cargaLayout() {
    $.getJSON("js/layout.js", function(jsonLayout){
		$("#cma-layout").html("<header><i style='cursor:pointer' class='fa fa-bars fa-lg' id='botonMenu'></i>&nbsp;&nbsp;<span>" + jsonLayout.titulo + "</span></header><content><nav><header>Menu</header><ul id='cma-accordion'></ul></nav><section></section></content>")
		for(var x = 0; x < jsonLayout.opciones.length; x++) {
			$("#cma-accordion").append("<li><i class='fa fa-" + jsonLayout.opciones[x].icono + "'></i>&nbsp;&nbsp;" + jsonLayout.opciones[x].texto + "</li><ul>" + cma_subOpcion(jsonLayout.opciones[x]) + "</ul>");
		}
		$("#cma-accordion > li").click(function(){
			$("#cma-accordion li").removeClass("liSel");
			if(false == $(this).next().is(':visible')) {
				$('#cma-accordion ul').slideUp(300);
				$(this).addClass("liSel");
			}
			$(this).next().slideToggle(300);
		});
		$("#botonMenu").click(function() {
			if($("#cma-layout > content > nav").css("left") != "0px") {
				$("#cma-layout > content > nav").css("left", "0px")
			} else {
				$("#cma-layout > content > nav").css("left", "-200px")				
			}
		});		
    });
}

function cma_subOpcion(iJSON) {
	var html = "";
	if(iJSON.opciones != null) {
		if(iJSON.opciones.length > 0) {
			for(var x = 0; x < iJSON.opciones.length; x++) {
				html = html  + "<li onclick='cma_cargaOpcion(\"" + iJSON.opciones[x].pagina + "\", " + iJSON.opciones[x].objeto + ".listar()" + ")'><i class='fa fa-chevron-right'></i>&nbsp;&nbsp;" + iJSON.opciones[x].texto + "</li>";
			}
		}
	}
	return html;
}

function cma_cargaOpcion(pagina, oFunc) {
	$("#cma-layout > content > section").load("html/" + pagina, function() {
		$("#cma-layout > content > nav").css("left", "-200px");
		oFunc();
	});
}

function ajaxGet(url, callback) {
	$.get(url).done(function(data){ callback(data); });
}

function ajaxPost(url, datos, callback) {
	$.post(url, datos).done(function(data){ callback(data); });
}

function ajaxPut(url, datos, callback) {
	$.ajax({
		url: url,
		data: datos,
		type: 'PUT',
		success: function(response) {
			//callback(data);
		}
	}).done(function(data){ callback(data); });
}

function ajaxDelete(url, callback) {
	$.ajax({
		url: url,
		type: 'DELETE',
		success: function(response) {
			//callback(data);
		}
	}).done(function(data){ callback(data); });
}

function desplegarDia(oCombo){
	var combo = '';
	combo = combo + "<option value='1'>Lunes</option>";
	combo = combo + "<option value='2'>Martes</option>";
	combo = combo + "<option value='3'>Miércoles</option>";
	combo = combo + "<option value='4'>Jueves</option>";
	combo = combo + "<option value='5'>Viernes</option>";
	combo = combo + "<option value='6'>Sábado</option>";
	oCombo.find("option").remove();
	oCombo.append("<option value=''>:: Seleccione Día ::</option>");
	oCombo.append(combo);	
}

function formatoFecha(oFecha) {
	var fecha = oFecha.val();
	return fecha.split("/")[2] + "-" + fecha.split("/")[1] + "-" + fecha.split("/")[0] + " " + fecha.split(":")[3] + ":" + fecha.split(":")[4] + ":" + fecha.split(":")[5];
}

/*
var datetime= $("#datePedido").val(); // Default datetime will be like this.
var date=datetime.split('/')[2].split(' ')[0] + "-" + datetime.split('/')[1] + "-" + datetime.split('/')[0] + " " + datetime.split('/')[2].split(' ')[1] + ":00";
alert(date);


function formatoFecha(oFecha) {
	var fecha = oFecha.val();
	return fecha.split("/")[2] + "-" + fecha.split("/")[1] + "-" + fecha.split("/")[0];
}


$(document).ready(function() {
	$("#txtFecha").blur(function() { alert(formatoFecha($("#txtFecha"))); })
})

function formatoFecha(oFecha) {
	var fecha = oFecha.val();
	return fecha.split("/")[2] + fecha.split("/")[1] + fecha.split("/")[0];
}*/

/*
function cma_creaTabla(mantenedor) {
	var tabla = $("#" + mantenedor).DataTable(jsonTableConfig);
	$("div.toolbar").html("<button type='button' class='btn btn-primary btn-sm' onclick='" + mantenedor + ".agregar()'>Agregar " + mantenedor + "</button>");
	return tabla;

}

function cma_CreaBotonesEdicion(mantenedor, id) {
	var botonesEdicion = "<button type='button' class='btn btn-default btn-xs bNOSO' onclick='" + mantenedor + ".editar(" + id + ")'><span class = 'glyphicon glyphicon-pencil' aria-hidden='true'></span></button><button type='button' class='btn btn-default btn-xs bNESE' onclick='" + mantenedor + ".eliminar(" + id + ")'><span class = 'glyphicon glyphicon-trash' aria-hidden='true'></span></button>";
	return botonesEdicion;
}

function cma_PanelTexto(oButton) {
	
	var oPanel = $(oButton).parent().parent().parent();
	var oTexto = $(oButton).parent().parent().find("input")[0];
	var oIcono = $(oButton).find("span")[0].className;
	
	if(oTexto.value != "") {
		if(oIcono == "glyphicon glyphicon-plus-sign") {
			cma_PanelTextoAgregar(oPanel);
			$($(oButton).find("span")[0]).removeClass("glyphicon-plus-sign").addClass("glyphicon-trash").css("color", "red");
		} else {
			$(oButton).parent().parent().remove();
		}
	}

}

function cma_PanelCombo(oButton) {
	
	var oPanel = $(oButton).parent().parent().parent();
	var oTexto1 = $(oButton).parent().parent().find("select")[0];
	var oTexto2 = $(oButton).parent().parent().find("select")[1];
	var oIcono = $(oButton).find("span")[0].className;

	if(oTexto1.value != "0" && oTexto2.value != "0") {
		if(oIcono == "glyphicon glyphicon-plus-sign") {
			cma_PanelComboAgregar(oPanel);
			$($(oButton).find("span")[0]).removeClass("glyphicon-plus-sign").addClass("glyphicon-trash").css("color", "red");
		} else {
			$(oButton).parent().parent().remove();
		}
	}

}

function cma_PanelTextoAgregar(oPanel) {
	var item = "<div class='input-group' style='margin-top: 1px'><input type='text' class='form-control' placeholder='Escriba el valor y presione el botón (+)'><span class='input-group-btn'><button class='btn btn-secondary' type='button' onclick='cma_PanelTexto(this)'><span class='glyphicon glyphicon-plus-sign' style='color: green'></span></button></span></div>";
	oPanel.append(item);
}

function cma_PanelComboAgregar(oPanel) {
	var url = oPanel.attr("id").split("_")[1];
	cma_ajaxGet(rutaURL + "/" + url, function(oData) { 
		var item = "<div><div class='col-xs-9' style='margin-top: 1px'><select style='width:100%' class='form-control'>";
		item = item + "<option value='0'>:: Seleccione ::</option>";
		$(oData).each(function() {
			item = item + "<option value='" + this.id + "'>" + this.nombre + "</option>";
		})
		item = item + "</select></div>";
		item = item + "<div class='col-xs-2' style='margin-top: 1px'><select style='width:100%' class='form-control'><option value='0'>:: Seleccione ::</option><option>1</option><option>2</option><option>3</option><option>4</option></select></div>";
		item = item + "<div class='col-xs-1' style='margin-top: 1px'><button style='width:100%' class='btn btn-secondary' type='button' onclick='cma_PanelCombo(this)'><span class='glyphicon glyphicon-plus-sign' style='color: green'></span></button></div></div>";
		oPanel.append(item);
	});
}
*/

