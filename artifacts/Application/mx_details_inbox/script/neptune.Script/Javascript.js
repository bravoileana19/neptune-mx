const $btnApprove = $('.sapMBarRight').find("button:contains('App')");

let dataGlobal = null;

let authGroup = AppCache.userInfo.group;
console.log({authGroup});

let authItem = {
    approvalDir1Group: "REQMX_DIR_PLANT",
    approvalDir1Auth: false,
    approvalLgtGroup: "REQMX_MGR_LGT",
    approvalLgtAuth: false,
    purchasingGroup: "REQMX_PURCHASING",
    purchasingAuth: false,
    planningGroup: "REQMX_PLANNER",
    planningAuth: false,
    approvalPurGroup: "REQMX_MGR_PUR",
    approvalPurAuth: false,
    approvalEhsGroup: "REQMX_EHS",
    approvalEhsAuth: false,
    masterDataGroup: "REQMX_MASTERDATA",
    masterDataAuth: false,
    approvalFiaGroup: "REQMX_FIA",
    approvalFiaAuth: false,
    myGroup: null,
};

if ( sap.n ) {

    sap.n.Shell.attachInit( function(data) {
        
        dataGlobal = data;
        initDetails(data);

    });

}

function initDetails(data) {

    console.log('initDetails!!')

    // console.log('INIT DETAIIIIILLLSSSS!!!')

    // console.log('Workflow Data In App');
    // console.log(data);
    // console.log(AppCache.userInfo);
    BtnGuardarDatos.setVisible(false);
    // console.log($btnApprove);
    // $btnApprove.hide();
    // $btnApprove.show();

    const body = JSON.parse(data.objectType);
    // console.log(body.grl_planta);

    authItem.approvalDir1Auth = authGroup.find(el=>el.name == `${body.grl_planta}_${authItem.approvalDir1Group}`) ? true : false;
    authItem.approvalLgtAuth = authGroup.find(el=>el.name == `${body.grl_planta}_${authItem.approvalLgtGroup}`) ? true : false;
    authItem.purchasingAuth = authGroup.find(el=>el.name == `${body.grl_planta}_${authItem.purchasingGroup}`) ? true : false;
    authItem.planningAuth = authGroup.find(el=>el.name == `${body.grl_planta}_${authItem.planningGroup}`) ? true : false;
    authItem.approvalEhsAuth = authGroup.find(el=>el.name == `${body.grl_planta}_${authItem.approvalEhsGroup}`) ? true : false;
    authItem.masterDataAuth = authGroup.find(el=>el.name == `${body.grl_planta}_${authItem.masterDataGroup}`) ? true : false;
    authItem.approvalPurAuth = authGroup.find(el=>el.name == `${body.grl_planta}_${authItem.approvalPurGroup}`) ? true : false;
    authItem.approvalFiaAuth = authGroup.find(el=>el.name == `${body.grl_planta}_${authItem.approvalFiaGroup}`) ? true : false;

    console.log({authItem});

    var options = { parameters: { "folio": body.grl_folio } };

    $('.multi-steps').html('');
    PDFViewerDetails.setSource('');

    apiAPIGetFolio(options).then(function(resp) {

        console.log(resp)

        if (authItem.approvalDir1Auth) {

            PanelCompras.setVisible(false);
            PanelPlaneacion.setVisible(false);
            PanelDatosMaestros.setVisible(false);

            // if ( body.grl_planta === '701' && resp.g_grl_clasf_edit === "0" ) {
            if ( resp.g_grl_clasf_edit === "0" ) {

                PanelClasificacion.setVisible(true);
                BtnGuardarDatos.setVisible(true);
                $btnApprove.hide();

                // RadioButtonGroupClasificacion.getSelectedButton().getText();

                switch ( resp.g_grl_clasificacion ) {
                    case 'A':
                        RadioButtonGroup.setSelectedButton( RadioButtonA )
                        break;

                    case 'B':
                        RadioButtonGroup.setSelectedButton( RadioButtonB )
                        break;

                    case 'C':
                        RadioButtonGroup.setSelectedButton( RadioButtonC )
                        break;

                    case 'O':
                        RadioButtonGroup.setSelectedButton( RadioButtonO )
                        break;
                }

            } else {

                PanelClasificacion.setVisible(false);
                BtnGuardarDatos.setVisible(false);
                $btnApprove.show();

            }

        } else if(authItem.purchasingAuth) {
            
            PanelClasificacion.setVisible(false);
            PanelPlaneacion.setVisible(false);
            PanelDatosMaestros.setVisible(false);
            
            if ( resp.g_grl_precio === null || resp.g_grl_proveedor === null || resp.g_grl_plazo_entrega === null || resp.g_grl_moneda === null ) {
                
                PanelCompras.setVisible(true);
                BtnGuardarDatos.setVisible(true);
                $btnApprove.hide();

            } else {

                PanelCompras.setVisible(false);
                BtnGuardarDatos.setVisible(false);
                $btnApprove.show();

            }

        } else if(authItem.planningAuth) {
            
            PanelClasificacion.setVisible(false);
            PanelCompras.setVisible(false);
            PanelDatosMaestros.setVisible(false);

            if ( resp.g_grl_stock_max === null || resp.g_grl_stock_min === null || resp.g_grl_punto_reorden === null ) {
                
                PanelPlaneacion.setVisible(true);
                BtnGuardarDatos.setVisible(true);
                $btnApprove.hide();

            } else {

                PanelPlaneacion.setVisible(false);
                BtnGuardarDatos.setVisible(false);
                $btnApprove.show();

            }

        } else if(authItem.masterDataAuth) {
            
            PanelClasificacion.setVisible(false);
            PanelCompras.setVisible(false);
            PanelPlaneacion.setVisible(false);

            if ( resp.g_grl_codigo_mx === null ) {
                
                PanelDatosMaestros.setVisible(true);
                BtnGuardarDatos.setVisible(true);
                
                $btnApprove.hide();

            } else {

                PanelDatosMaestros.setVisible(false);
                BtnGuardarDatos.setVisible(false);
                
                $btnApprove.show();

            }

        } else {
            
            PanelClasificacion.setVisible(false);
            PanelCompras.setVisible(false);
            PanelPlaneacion.setVisible(false);
            PanelDatosMaestros.setVisible(false);
            BtnGuardarDatos.setVisible(false);
            
            $btnApprove.show();

        }

        let listaFlujo = '';

        resp.flow.forEach( flujo => {

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

        modelDetailsPage.setData(resp);
        // modelDetailsPage.setData(body);

        const colorScheme = ( resp.g_grl_clasificacion === 'A' ) ? 3 :
                            ( resp.g_grl_clasificacion === 'B' ) ? 1 :
                            ( resp.g_grl_clasificacion === 'C' ) ? 6 : 10

        InfoLabel.setColorScheme(colorScheme)

        if ( resp.g_grl_clasificacion === 'A' ) {

            LabelJustificacion.setVisible(true);
            TxtJustificacion.setVisible(true);

        } else {
            
            LabelJustificacion.setVisible(false);
            TxtJustificacion.setVisible(false);

        }

        const pdfurl = createDataURL(resp.m_value_file);
        PDFViewerDetails.setSource(pdfurl);

    });

}


const saveData = () => {

    console.log('It works!');
    // $btnApprove.show();
    sap.ui.core.BusyIndicator.show(0);

    const solicitud = modelDetailsPage.getData();
    console.log({solicitud});
    console.log(solicitud.g_grl_id_wf);

    // return;

    if (authItem.approvalDir1Auth) {

        console.log('Dir Planta esta guardando datos');

        const nuevaClasificacion = RadioButtonGroup.getSelectedButton().getText();
        console.log({nuevaClasificacion});

        const options = { 
            parameters: { 
                "grl_folio": solicitud.g_grl_folio
            }, 
            data: { 
                "id": solicitud.g_id,
                "grl_clasificacion": nuevaClasificacion, 
                "grl_clasf_edit": "1" 
            }
        };

        apiUpdateRequest(options).then( (response) => {

            console.log({response});
            initDetails( dataGlobal );
            sap.ui.core.BusyIndicator.hide();
            // approveRequest(solicitud.g_grl_id_wf);

        }).catch( (err) => {

            console.log({err})
            sap.ui.core.BusyIndicator.hide();

        });


    } else if(authItem.purchasingAuth) {
        
        console.log('Compras esta guardando datos');

        const precio = InputPrecio.getValue()
        const entrega = InputEntrega.getValue();
        const moneda = SelectMoneda.getSelectedItem().getKey();
        const proveedor = InputProveedor.getValue();

        console.log({precio,entrega,moneda,proveedor})

        const options = { 
            parameters: { 
                "grl_folio": solicitud.g_grl_folio
            }, 
            data: { 
                "id": solicitud.g_id,
                "grl_precio": precio,
                "grl_plazo_entrega": entrega,
                "grl_moneda": moneda,
                "grl_proveedor": proveedor,
            }
        };

        apiUpdateRequest(options).then( (response) => {

            console.log({response});
            initDetails( dataGlobal );
            sap.ui.core.BusyIndicator.hide();
            // approveRequest(solicitud.g_grl_id_wf);

        }).catch( (err) => {

            console.log({err})
            sap.ui.core.BusyIndicator.hide();

        });

    } else if(authItem.planningAuth) {
        
        console.log('Planeacion esta guardando datos');

        const minimo = InputMinimo.getValue();
        const maximo = InputMaximo.getValue();
        const reorden = InputReorden.getValue();

        console.log({minimo,maximo,reorden});

        const options = { 
            parameters: { 
                "grl_folio": solicitud.g_grl_folio
            }, 
            data: { 
                "id": solicitud.g_id,
                "grl_stock_min": minimo,
                "grl_stock_max": maximo,
                "grl_punto_reorden": reorden,
            }
        };

        apiUpdateRequest(options).then( (response) => {

            console.log({response});
            initDetails( dataGlobal );
            sap.ui.core.BusyIndicator.hide();
            // approveRequest(solicitud.g_grl_id_wf);

        }).catch( (err) => {
            
            console.log({err})
            sap.ui.core.BusyIndicator.hide();

        });

    } else if(authItem.masterDataAuth) {
        
        console.log('Datos maestros esta guardando datos');

        const codigoMX = InputCodigoMX.getValue();

        console.log({codigoMX});

        const options = { 
            parameters: { 
                "grl_folio": solicitud.g_grl_folio,
            }, 
            data: { 
                "id": solicitud.g_id,
                "grl_codigo_mx": codigoMX,
            }
        };

        apiUpdateRequest(options).then( (response) => {

            console.log({response});
            initDetails( dataGlobal );
            sap.ui.core.BusyIndicator.hide();
            // approveRequest(solicitud.g_grl_id_wf);

        }).catch( (err) => {

            console.log({err})
            sap.ui.core.BusyIndicator.hide();

        });

    }

}

// function approveRequest(idWf) {

//     console.log('approveRequest works!')

//     sap.ui.core.BusyIndicator.show(0);
//     sap.n.Planet9.function({
//         id: "WorkflowInbox",
//         method: "Approve",
//         data: { id: idWf },
//         success: function (data) {
//             console.log({data})
//             // handleUpdate("Approve");
//             sap.ui.core.BusyIndicator.hide();
//         },
//         error: function (err) {
//             console.log({err})
//             sap.ui.core.BusyIndicator.hide();
//         }
//     });

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
