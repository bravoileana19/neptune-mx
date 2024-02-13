const createRequest = () => {

    SelectPlanta.setValueState('None');
    SelectTipo.setValueState('None');
    InputEspecificarMX.setValueState('None');
    SelectTipoMaterial.setValueState('None');
    InputDimensiones.setValueState('None');
    ComboBoxGrupo.setValueState('None');
    InputArea.setValueState('None');
    InputEquipo.setValueState('None');
    RadioButtonGroupClasificacion.setValueState('None');
    InputConsumo.setValueState('None');
    RadioButtonGroupCaducidad.setValueState('None');
    InputJustificacion.setValueState('None');
    RadioButtonGroup2.setValueState('None');
    RadioButtonGroup3.setValueState('None');
    InputComentarios.setValueState('None');

    SelectUMB.setValueState('None');
    InputDescripcion.setValueState('None');

    SelectPurchaser.setValueState('None');
    SelectMgrPurchaser.setValueState('None');

    pdfUpload.setValueState('None');

    const data = {};
    const b64 = pdfEncoding.getText();
    
    if ( SelectPlanta.getSelectedItem().getKey() === '' ) {
        SelectPlanta.setValueState('Error');
        sap.m.MessageToast.show('Por favor selecciona la planta');
        return;
    }

    if ( SelectTipo.getSelectedItem().getKey() === '' ) {
        SelectTipo.setValueState('Error');
        sap.m.MessageToast.show('Por favor selecciona el tipo de solicitud');
        return;
    }

    if ( SelectTipo.getSelectedItem().getKey() !== 'Alta' && InputEspecificarMX.getValue() === '') {
        InputEspecificarMX.setValueState('Error');
        sap.m.MessageToast.show('Por favor escribe el codigo MX de referencia');
        return;
    }

    if ( SelectTipoMaterial.getSelectedItem().getKey() === '' ) {
        SelectTipoMaterial.setValueState('Error');
        sap.m.MessageToast.show('Por favor selecciona el tipo de material');
        return;
    }

    if ( InputDimensiones.getValue() === '' ) {
        InputDimensiones.setValueState('Error');
        sap.m.MessageToast.show('Por favor ingresa las dimensiones');
        return;
    }

    // if ( SelectGrupo.getSelectedItem().getKey() === '' ) {
    //     SelectGrupo.setValueState('Error');
    //     sap.m.MessageToast.show('Por favor selecciona el grupo de articulos');
    //     return;
    // }
    
    if ( ComboBoxGrupo.getValue() === '' ) {
        ComboBoxGrupo.setValueState('Error');
        sap.m.MessageToast.show('Por favor selecciona el grupo de articulos');
        return;
    }

    let datalist = modelComboBoxGrupo.getData(), valorTarget = ComboBoxGrupo.getValue(), optionFound = false;

    for (let i = 0; i < datalist.length; i++) {
            
        if (valorTarget === datalist[i].lst_nombre) {
            optionFound = true;
            break;
        }
        
    }

    if ( !optionFound ) {
        ComboBoxGrupo.setValueState('Error');
        sap.m.MessageToast.show('La opcion que elegiste no es valida');
        return;
    }

    if ( InputArea.getValue() === '' ) {
        InputArea.setValueState('Error');
        sap.m.MessageToast.show('Por favor ingresa el area');
        return;
    }
    
    if ( InputEquipo.getValue() === '' ) {
        InputEquipo.setValueState('Error');
        sap.m.MessageToast.show('Por favor ingresa el equipo');
        return;
    }

    if ( RadioButtonGroupClasificacion.getSelectedButton().getText() === '' ) {
        RadioButtonGroupClasificacion.setValueState('Error')
        sap.m.MessageToast.show('Por favor selecciona una categoria');
        return;
    }

    if ( InputConsumo.getValue() === '' ) {
        InputConsumo.setValueState('Error');
        sap.m.MessageToast.show('Por favor ingresa el consumo esperado al mes');
        return;
    }

    if ( SelectUMB.getSelectedItem().getKey() === '' ) {
        SelectUMB.setValueState('Error');
        sap.m.MessageToast.show('Por favor selecciona la unidad de medida');
        return;
    }

    if ( InputDescripcion.getValue() === '' ) {
        InputDescripcion.setValueState('Error');
        sap.m.MessageToast.show('Por favor escribe la descripcion del material');
        return;
    }

    if ( RadioButtonGroupCaducidad.getSelectedButton().getText() === '' ) {
        RadioButtonGroupCaducidad.setValueState('Error')
        sap.m.MessageToast.show('Por favor elige si existe caducidad');
        return;
    }

    if ( RadioButtonGroupClasificacion.getSelectedButton().getText() === 'A' && InputJustificacion.getValue() === '' ) {
        InputJustificacion.setValueState('Error');
        sap.m.MessageToast.show('Por favor justifica porque la clasificacion es A');
        return;
    }

    if ( RadioButtonGroup2.getSelectedButton().getText() === '' ) {
        RadioButtonGroup2.setValueState('Error')
        sap.m.MessageToast.show('Por favor elige si existe hoja de seguridad');
        return;
    }
    
    if ( RadioButtonGroup3.getSelectedButton().getText() === '' ) {
        RadioButtonGroup3.setValueState('Error')
        sap.m.MessageToast.show('Por favor elige si existe resguardo especial');
        return;
    }

    if ( InputComentarios.getValue() === '' ) {
        InputComentarios.setValueState('Error');
        sap.m.MessageToast.show('Por favor ingresa comentarios complementarios sobre la solicitud');
        return;
    }

    if ( SelectPurchaser.getSelectedItem().getKey() === '' ) {
        SelectPurchaser.setValueState('Error');
        sap.m.MessageToast.show('Por favor selecciona la unidad de medida');
        return;
    }

    if ( SelectMgrPurchaser.getSelectedItem().getKey() === '' ) {
        SelectMgrPurchaser.setValueState('Error');
        sap.m.MessageToast.show('Por favor selecciona la unidad de medida');
        return;
    }

    if ( b64 === '' ) {
        pdfUpload.setValueState('Error');
        sap.m.MessageToast.show('Por favor ingresa un archivo adjunto a la solicitud');
        return;
    }

    // data.grl_folio = `MDMX-${ randomFolio }`
    data.grl_planta = SelectPlanta.getSelectedItem().getKey();
    data.grl_tipo_solicitud = SelectTipo.getSelectedItem().getKey();
    data.grl_codigo = InputEspecificarMX.getValue();
    data.grl_tipo_material = SelectTipoMaterial.getSelectedItem().getKey();
    data.grl_dimensiones = InputDimensiones.getValue();
    // data.grl_grupo_articulos = SelectGrupo.getSelectedItem().getKey();
    data.grl_grupo_articulos = ComboBoxGrupo.getValue();
    data.grl_area = InputArea.getValue();
    data.grl_equipo = InputEquipo.getValue();
    data.grl_clasificacion = RadioButtonGroupClasificacion.getSelectedButton().getText();
    data.grl_consumo = InputConsumo.getValue();
    data.grl_caducidad = RadioButtonGroupCaducidad.getSelectedButton().getText();
    data.grl_justificacion = InputJustificacion.getValue();
    data.grl_hoja_seguridad = RadioButtonGroup2.getSelectedButton().getText();
    data.grl_hoja_resguardo = RadioButtonGroup3.getSelectedButton().getText();
    data.grl_comentarios = InputComentarios.getValue();

    data.grl_umb = SelectUMB.getSelectedItem().getKey();
    data.grl_descripcion = InputDescripcion.getValue();

    data.grl_purchaser = SelectPurchaser.getSelectedItem().getKey();
    data.grl_mgr_purchaser = SelectMgrPurchaser.getSelectedItem().getKey();

    data.grl_file = b64;

    console.log(data);
    // return;

    BtnCrearSolicitud.setBusy(true); // Loading del boton
    sap.ui.core.BusyIndicator.show(0);

    var options = { data };

    apiRestAPIScriptCreateRequest(options).then(function(response) {

        data.grl_file = '';
        data.grl_folio = response.folio;

        // Use this script in your App or from external systems
        const wfData = {
            "id": "dcab0484-92bf-4ed9-ab8b-626a4085d1a5",
            "objectKey": data.grl_folio,
            "objectType": JSON.stringify(data),
            "amount": "",
            "currency": "",
            "approver": ""
        }

        // console.log(wfData);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/functions/WorkflowInbox/Start", // Remember full path if triggered externally
            data: JSON.stringify(wfData),
            success: function(resp) {

                // Success Handler
                console.log({resp});

                // const respFlujo = actualizarFlujo( data.grl_folio, resp.id )
                // console.log(respFlujo);

                var options = { data: { "grl_id_wf": resp.id, "grl_folio": data.grl_folio, "updatedAt": Date.now(), } };

                apiAPIUpdateByFolio(options).then( (response) => {

                    console.log(response);

                    console.log({data})

                    sap.ui.core.BusyIndicator.hide();

                    // ajaxSuccess
                    sap.m.MessageToast.show('Solicitud creada correctamente!!');
                    BtnCrearSolicitud.setBusy(false);

                    solicitudesProceso();
                    solicitudesLiberadas();
                    solicitudesRechazadas();

                    App.to(MainPage, "fade");

                    // var options = {
                    //     parameters: {
                    //         "authGroup": authItem.myGroup // Required 
                    //     }
                    // };

                    // apiAPIGetRequestsInProcess(options).then( (resp) => {

                    //     console.log(resp);

                    //     modelTblSolicitudes.setData(resp);
                    //     TblSolicitudes.setBusy(false);
                    //     App.to(MainPage, "fade");

                    // }).catch( (err) => {
                    //     console.log({err});
                    // });

                });

            },
            error: function(result, status) {
                // Error Handler
                console.log({result, status});
            }
        });

    }).fail((err) => {

        console.error({err})
        BtnCrearSolicitud.setBusy(false);
        sap.m.MessageToast.show(`Oops!! Ocurrio un error al crear la solicitud: ${err.responseText}`);
        sap.ui.core.BusyIndicator.hide();
        
    })
    
}

const clearForm = () => {

    BtnCrearSolicitud.setBusy(false);

    const getValComponents = [ InputEspecificarMX, InputDimensiones, InputArea, InputEquipo, InputConsumo, InputJustificacion, InputJustificacion, InputComentarios ];
    getValComponents.forEach( component => component.setValue('') );

    RadioButtonA.setSelected(false);
    RadioButtonB.setSelected(false);
    RadioButtonC.setSelected(false);
    RadioButtonO.setSelected(false);
    // RadioButtonGroupClasificacion.setSelectedIndex(-1);

    SelectPlanta.setSelectedItem(null);
    SelectTipo.setSelectedItem(null);
    SelectTipoMaterial.setSelectedItem(null);
    // SelectGrupo.setSelectedItem(null);
    ComboBoxGrupo.setSelectedItem(null);
    InputEspecificarMX.setEnabled(false);

    RadioButtonO.setVisible(false);

    LblJustificacion.setVisible(false);
    InputJustificacion.setEnabled(false);
    InputJustificacion.setVisible(false);

    RadioBtnCaducidadSi.setSelected(false);
    RadioBtnCaducidadNo.setSelected(false);

    RadioBtnHojaSi.setSelected(false);
    RadioBtnHojaNo.setSelected(false);

    RadioBtnResguardoSi.setSelected(false);
    RadioBtnResguardoNo.setSelected(false);

    PDFViewer.setSource('');
    PDFViewer.setVisible(false);
    pdfEncoding.setText('');
    pdfUpload.setValue('');

    // Peticion para obtener los compradores
    getPurchasers( SelectPlanta.getSelectedItem().getKey() );

}

// const random = (min = 1, max = 10000) => {
//     return Math.floor((Math.random() * (max - min + 1)) + min);
// }

//To display the pdf we need to represent it as a data URL.
function createDataURL(pdf){
    //Register BLOBs on the application.
    jQuery.sap.addUrlWhitelist("blob");
    //convert the base64 to binary and insert it in a byte array.
    var decodedPdfContent = atob(pdf);
    var byteArray = new Uint8Array(decodedPdfContent.length)
    for(var i=0; i<decodedPdfContent.length; i++){
        byteArray[i] = decodedPdfContent.charCodeAt(i);
    }
    //create a BLOB and a URL
    var blob = new Blob([byteArray.buffer], { type: 'application/pdf' });
    var pdfurl = URL.createObjectURL(blob);

    return pdfurl;
}

const cancelRequest = () => {
    
    console.log('Cancelar works!!')

    const solicitud = modelDetailsPage.getData()
    console.log({solicitud});
    sap.ui.core.BusyIndicator.show(0);

    // var options = {
    //     data: { id: solicitud.grl_id_wf }
    // };

    sap.n.Planet9.function({
        id: "WorkflowInbox",
        method: "Reject",
        data: { id: solicitud.g_grl_id_wf },
        success: function (data) {

            console.log(data)
            // handleUpdate("Reject");
            // sap.ui.core.BusyIndicator.hide();

            sap.ui.core.BusyIndicator.hide();

            sap.m.MessageToast.show('Solicitud cancelada!!');

            solicitudesProceso();
            solicitudesLiberadas();
            solicitudesRechazadas();

            App.to(MainPage, "fade");

            // var options = {
            //     parameters: {
            //         "authGroup": authItem.myGroup // Required 
            //     }
            // };

            // apiAPIGetRequestsInProcess(options).then( (resp) => {

            //     console.log(resp);

            //     modelTblSolicitudes.setData(resp);
            //     App.to(MainPage, "fade");

            // }).catch( (err) => {
            //     console.log({err});
            // });

        },
        error: function (data) {
            console.log(data)
            sap.ui.core.BusyIndicator.hide();
            sap.m.MessageToast.show(`Ha ocurrido un error en el servidor: ${data.responseText}`);
            // sap.ui.core.BusyIndicator.hide();

        }
    });

}

const mainTabFilter = (clasificacion = null) => {

    let globalFilter = [];
    const bindigMain = TblSolicitudes.getBinding('items');

    const buscarFolio = SearchFieldFolio.getValue();
    if ( buscarFolio !== "" ) {
        const filterFolio = new sap.ui.model.Filter('grl_folio', 'Contains', buscarFolio);
        globalFilter.push(filterFolio);
    }

    const buscarMX = SearchFieldMX.getValue();
    if ( buscarMX !== "" ) {
        const filterMX = new sap.ui.model.Filter('grl_codigo', 'Contains', buscarMX);
        globalFilter.push(filterMX);
    }

    const buscarPlanta = SearchFieldPlanta.getValue();
    if ( buscarPlanta !== "" ) {
        const filterPlanta = new sap.ui.model.Filter('grl_planta', 'Contains', buscarPlanta);
        globalFilter.push(filterPlanta);
    }

    if (clasificacion !== null) {

        if ( clasificacion === 'All' ) {
            mainTabFilter();
        } else {

            const filterClasificacion = new sap.ui.model.Filter('grl_clasificacion', 'EQ', clasificacion);
            globalFilter.push(filterClasificacion);

        }

    }

    bindigMain.filter(globalFilter);

}

const mainTabFilterLiberadas = (clasificacion = null) => {

    let globalFilter = [];
    const bindigMain = TblLiberadas.getBinding('items');

    const buscarFolio = SearchFieldFolio1.getValue();
    if ( buscarFolio !== "" ) {
        const filterFolio = new sap.ui.model.Filter('grl_folio', 'Contains', buscarFolio);
        globalFilter.push(filterFolio);
    }

    const buscarMX = SearchFieldMX1.getValue();
    if ( buscarMX !== "" ) {
        const filterMX = new sap.ui.model.Filter('grl_codigo', 'Contains', buscarMX);
        globalFilter.push(filterMX);
    }

    const buscarPlanta = SearchFieldPlanta1.getValue();
    if ( buscarPlanta !== "" ) {
        const filterPlanta = new sap.ui.model.Filter('grl_planta', 'Contains', buscarPlanta);
        globalFilter.push(filterPlanta);
    }

    if (clasificacion !== null) {

        if ( clasificacion === 'All' ) {
            mainTabFilterLiberadas();
        } else {

            const filterClasificacion = new sap.ui.model.Filter('grl_clasificacion', 'EQ', clasificacion);
            globalFilter.push(filterClasificacion);

        }

    }

    bindigMain.filter(globalFilter);

}

const mainTabFilterRechazadas = (clasificacion = null) => {

    let globalFilter = [];
    const bindigMain = TblRechazadas.getBinding('items');

    const buscarFolio = SearchFieldFolio2.getValue();
    if ( buscarFolio !== "" ) {
        const filterFolio = new sap.ui.model.Filter('grl_folio', 'Contains', buscarFolio);
        globalFilter.push(filterFolio);
    }

    const buscarMX = SearchFieldMX2.getValue();
    if ( buscarMX !== "" ) {
        const filterMX = new sap.ui.model.Filter('grl_codigo', 'Contains', buscarMX);
        globalFilter.push(filterMX);
    }

    const buscarPlanta = SearchFieldPlanta2.getValue();
    if ( buscarPlanta !== "" ) {
        const filterPlanta = new sap.ui.model.Filter('grl_planta', 'Contains', buscarPlanta);
        globalFilter.push(filterPlanta);
    }

    if (clasificacion !== null) {

        if ( clasificacion === 'All' ) {
            mainTabFilterRechazadas();
        } else {

            const filterClasificacion = new sap.ui.model.Filter('grl_clasificacion', 'EQ', clasificacion);
            globalFilter.push(filterClasificacion);

        }

    }

    bindigMain.filter(globalFilter);

}

const getPurchasers = (planta) => {

    let options = { parameters: { "planta": planta } };
    apiAPIGetPurchasers(options).then( (resp) => {
        
        console.log(resp);
        modelSelectPurchaser.setData(resp.compras);
        modelSelectMgrPurchaser.setData(resp.jefe_compras)

    })

}