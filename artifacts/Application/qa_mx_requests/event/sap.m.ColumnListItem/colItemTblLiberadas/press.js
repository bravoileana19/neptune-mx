var context = oEvent.oSource.getBindingContext()
var data = context.getObject()

if ( data.grl_status_now === "En Proceso" ) {
    BtnCancelarSolicitud.setVisible(true);
} else {
    BtnCancelarSolicitud.setVisible(false);
}

PDFViewerDetails.setSource('');
$('.multi-steps').html('');

// DetailsPage.setData(data);
// modelDetailsPage.setData(data);

var options = {
    parameters: {
        "folio": data.grl_folio // Required 
    }
};

apiAPIGetFileByFolio(options).then(function(data) {

    console.log(data);
    console.log(data.flow);

    modelDetailsPage.setData(data);

    let listaFlujo = '';

    data.flow.forEach( flujo => {

        const dateUpdated = new Date( flujo.updatedAt );

        if (flujo.status == 'Pending') {
            listaFlujo += `<li style="font-size: smaller;" class="is-active">${flujo.Nombre}<br>${flujo.step}<br>${dateUpdated.toDateString()}</li>`;
        } else if (flujo.status == 'Reject') {
            listaFlujo += `<li style="font-size: smaller;" class="is-rejected">${flujo.Nombre}<br>${flujo.step}<br>${dateUpdated.toDateString()}</li>`;
        } else {
            listaFlujo += `<li style="font-size: smaller;">${flujo.Nombre}<br>${flujo.step}<br>${dateUpdated.toDateString()}</li>`;
        }

    });

    $('.multi-steps').html(listaFlujo);

    const colorScheme = ( data.g_grl_clasificacion === 'A' ) ? 3 :
                        ( data.g_grl_clasificacion === 'B' ) ? 1 :
                        ( data.g_grl_clasificacion === 'C' ) ? 6 : 10

    InfoLabel.setColorScheme(colorScheme)

    var pdfurl = createDataURL(data.m_value_file);
    PDFViewerDetails.setSource(pdfurl);

    // HTMLObject.setContent(flujo)

});

// Change transition
App.to(DetailsPage, "fade");