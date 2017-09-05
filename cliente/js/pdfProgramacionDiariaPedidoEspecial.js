function imprimirPedidoEspecial(oData) {
    var data = oData;

    var doc = new jsPDF('p', 'mm', 'letter');
    //Dimension of A4 in pts: 595 × 842
    //Dimension of Letter in pts and mm: 612x792 | 216 x 279 mm	

    // doc.setDisplayMode('fullpage', 'continuous', 'UseOutlines');

    /* Color de fondo depende de pdfSucursal */
    if ($("#cmbProgramacionDiariaSucursal").val() == 0) {
        doc.setTextColor(0, 0, 0);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 1) {
        doc.setTextColor(0, 0, 255);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 2) {
        doc.setTextColor(239, 206, 16);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 3) {
        doc.setTextColor(239, 15, 15);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 4) {
        doc.setTextColor(26, 239, 15);
    }
    /* doc.rect(0, 0, 108, 69.75, '');
    doc.rect(108, 0, 107.6, 69.75, '');
    doc.rect(0, 69.75, 108, 69.75, '');
    doc.rect(108, 69.75, 107.6, 69.75, '');
    doc.rect(0, 139.5, 108, 69.75, '');
    doc.rect(108, 139.5, 107.6, 69.75, '');
    doc.rect(0, 209.25, 108, 69.75, '');
    doc.rect(108, 209.25, 107.6, 69.75, '');

    doc.rect(10, 10, 89, 50, '');
    doc.rect(116, 10, 89, 50, '');
    doc.rect(10, 80, 89, 50, '');
    doc.rect(116, 80, 89, 50, '');
    doc.rect(10, 150, 89, 50, '');
    doc.rect(116, 150, 89, 50, '');
    doc.rect(10, 220, 89, 50, '');
    doc.rect(116, 220, 89, 50, ''); */


    var pageWidth = 216;
    var pageHeight = 279;

    var pageMargin = 2;

    pageWidth -= pageMargin * 1;
    pageHeight -= pageMargin * 1;

    var cellPadding = 2.5;
    var cellWidth = 100;
    var cellHeight = 69.75;
    var lineHeight = 5;

    var startX = pageMargin;
    var startY = pageMargin;


    doc.setFontSize(12);

    function createCard(item) {

        //cell projection
        var requiredWidth = startX + cellWidth + (cellPadding * 2);

        var requiredHeight = startY + cellHeight; /* Aqui iba el cellpading * 2 que se acumulaba y bajaba los items */



        if (requiredWidth <= pageWidth) {

            textWriter(item, startX + cellPadding, startY + cellPadding);

            startX = requiredWidth;
            //  startY += cellHeight + cellPadding;

        } else {
            if (requiredHeight > pageHeight) {
                doc.addPage();

                /* Color de fondo depende de pdfSucursal */
                if ($("#cmbProgramacionDiariaSucursal").val() == 0) {
                    // doc.setFillColor(255, 255, 255);
                    doc.setTextColor(0, 0, 0);
                }
                if ($("#cmbProgramacionDiariaSucursal").val() == 1) {
                    doc.setTextColor(0, 0, 255);
                }
                if ($("#cmbProgramacionDiariaSucursal").val() == 2) {
                    doc.setTextColor(239, 206, 16);
                }
                if ($("#cmbProgramacionDiariaSucursal").val() == 3) {
                    doc.setTextColor(239, 15, 15);
                }
                if ($("#cmbProgramacionDiariaSucursal").val() == 4) {
                    doc.setTextColor(26, 239, 15);
                }
                /* doc.rect(0, 0, 108, 69.75, '');
                    doc.rect(108, 0, 107.6, 69.75, '');
                    doc.rect(0, 69.75, 108, 69.75, '');
                    doc.rect(108, 69.75, 107.6, 69.75, '');
                    doc.rect(0, 139.5, 108, 69.75, '');
                    doc.rect(108, 139.5, 107.6, 69.75, '');
                    doc.rect(0, 209.25, 108, 69.75, '');
                    doc.rect(108, 209.25, 107.6, 69.75, '');

                    doc.rect(10, 10, 89, 50, '');
                    doc.rect(116, 10, 89, 50, '');
                    doc.rect(10, 80, 89, 50, '');
                    doc.rect(116, 80, 89, 50, '');
                    doc.rect(10, 150, 89, 50, '');
                    doc.rect(116, 150, 89, 50, '');
                    doc.rect(10, 220, 89, 50, '');
                    doc.rect(116, 220, 89, 50, ''); */

                startY = pageMargin;
            } else {
                startY = requiredHeight;
            }

            startX = pageMargin;


            textWriter(item, startX + cellPadding, startY + cellPadding);

            startX = startX + cellWidth + (cellPadding * 2);
        }

    }

    function textWriter(item, xAxis, yAxis) {
        // var texto;
        if (item.diet == 0) {
            item.diet = ' ';
        } else {
            item.diet = '*Diet';
        }
        if (item.forma == 0) {
            item.forma = '*Redonda';
        } else {
            item.forma = '*Cuadrada';
        }
        /* texto = doc.setFontSize(12).splitTextToSize(item.solicitante.toUpperCase(), 28);
        doc.text(xAxis + 7, yAxis + 10, texto);
        texto = doc.setFontSize(12).splitTextToSize("N°1", xAxis + 5);
        doc.text(xAxis + 85, yAxis + 10, texto); */
        doc.setFontSize(12);
        doc.text(item.solicitante.toUpperCase(), xAxis + 7, yAxis + 10);
        doc.text("N°" + item.id, xAxis + 85, yAxis + 10);
        doc.setFontSize(11);
        doc.text("Fono: " + item.telefono, xAxis + 7, yAxis + 15);
        doc.text("Valor: " + item.precio, xAxis + 72, yAxis + 15);
        doc.text(item.personas + " Personas", xAxis + 74, yAxis + 20);
        doc.text(item.forma, xAxis + 75, yAxis + 25);
        doc.text(item.diet, xAxis + 75, yAxis + 30);
        doc.text(item.masaTipo_nombre + " " + item.masaSabor_nombre + " " + item.sabor_nombre.toUpperCase() + " " + "#" + item.num, xAxis + 30, yAxis + 35);
        doc.text(item.caracteristicas, xAxis + 30, yAxis + 40);
        doc.text(item.mensaje.toUpperCase(), xAxis + 30, yAxis + 45);
        doc.text("Abono: " + item.abono, xAxis + 7, yAxis + 55);
        doc.text("Hora: " + item.fechaEntrega, xAxis + 72, yAxis + 55);
        doc.addImage(creaQR("id: " + item.id + " " + item.masaTipo_nombre + " " + item.masaSabor_nombre + " " + item.sabor_nombre + " " + "#" + item.num + " Fecha: " + item.fechaEntrega), "JPEG", xAxis + 7, yAxis + 30, 20, 20);
    }

    function creaQR(texto) {
        jQuery('#outputPedidoEspecial').qrcode(texto);
        var canvas = document.querySelector("#outputPedidoEspecial canvas");
        var imageURL = canvas.toDataURL();
        return imageURL;
    }

    for (var i = 0; i < data.length; i++) {
        createCard(data[i]);
    }   

    doc.save('pedidoEspecial.pdf');

    
}

function pedidoEspecialBuscarPdf() {
    var pdfFechaPedidoEspecial = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + $("#dateProgramacionDiaria").val().split("/")[0];
    var pdfSucursalPedidoEspecial = $("#cmbProgramacionDiariaSucursal").val();
    ajaxGet(rutaURL + "/pedidoEspecial/" + pdfFechaPedidoEspecial + "/" + pdfSucursalPedidoEspecial, imprimirPedidoEspecial);
}


function pdfProgramacionDiariaPedidoEspecialCargar() {
    $("#cma-layout").load("programacionDiaria.html", function () {
        $("#btnImprimirProgramacionDiaria").click(function () {
            pedidoEspecialBuscarPdf();
        });
    });
}