function imprimirProgramacionNormal(oData) {
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


    doc.setFontSize(10);

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


                startY = pageMargin;
            } else {
                startY = requiredHeight;
            }

            startX = pageMargin;


            textWriter(item, startX + cellPadding, startY + cellPadding);

            startX = startX + cellWidth + (cellPadding * 2);
        }

    }

    function textWriter(item, xAxis, yAxis, miJSON) {
        var texto;
        texto =
            doc.setFontSize(15);
        doc.text("VENTA", xAxis + 5, yAxis + 10);
        doc.setFontSize(12);
        doc.text("N°" + item.id_diaria, xAxis + 85, yAxis + 10);
        doc.text(item.personas + " Personas", xAxis + 75, yAxis + 15);
        doc.text(item.masaTipo_nombre + " " + item.masaSabor_nombre + " " + item.sabor_nombre + " " + "#" + item.num, xAxis + 23, yAxis + 30);
        doc.text("Fecha: " + item.fecha, xAxis + 64, yAxis + 55);
        // doc.addImage(creaQR("id: " + item.id_diaria + " " + item.masaTipo_nombre + " " + item.masaSabor_nombre + " " + item.sabor_nombre + " " + "#" + item.num + " Fecha: " + item.fecha), "JPEG", xAxis + 10, yAxis + 35, 20, 20);
        doc.addImage(creaQR(JSON.stringify(item, ['fecha', 'num'])), "JPEG", xAxis + 10, yAxis + 35, 20, 20);
        
    }

    function creaQR(texto) {
        jQuery('#output').qrcode(texto);
        var canvas = document.querySelector("#output canvas");
        var imageURL = canvas.toDataURL();
        return imageURL;
    }
    
    for (var i = 0; i < data[0].detalle.length; i++) {
        createCard(data[0].detalle[i]);
    }

    doc.save('programacionNormal.pdf');
}

function pdfBuscarProgramacionNormal() {
    var normalPdfFecha = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + $("#dateProgramacionDiaria").val().split("/")[0];
    var normalPdfSucursal = $("#cmbProgramacionDiariaSucursal").val();
    ajaxGet(rutaURL + "/programacionDiaria/" + normalPdfFecha + "/" + normalPdfSucursal, imprimirProgramacionNormal);
}

function pdfProgramacionDiariaNormalCargar() {
    $("#cma-layout").load("programacionDiaria.html", function () {
        $("#btnImprimirProgramacionDiaria").click(function () {
            pdfBuscarProgramacionNormal();
        });
    });
}