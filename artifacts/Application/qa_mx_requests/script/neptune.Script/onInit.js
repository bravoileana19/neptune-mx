let authGroup = AppCache.userInfo.group;
// console.log({authGroup});

let authItem = {
    requesterGroup: "REQMX_REQUEST",
    requesterAuth: false,
    viewerGroup: "REQMX_VIEWER",
    viewerAuth: false,
    // approvalGroup: "REQMX_APPROVAL",
    // approvalAuth: false,
    myGroup: null,
};


authItem.requesterAuth = authGroup.find(el=>el.name == authItem.requesterGroup) ? true : false;

if (authItem.requesterAuth === false) {

    // authItem.requesterAuth = authGroup.find((el) => el.name == authItem.requesterGroup)
    //     ? true
    //     : false;
    authItem.myGroup = authItem.viewerGroup;

    BtnCancelarSolicitud.setVisible(false);
    BtnFrmSolicitud.setVisible(false);

} else {

    authItem.myGroup = authItem.requesterGroup;

}

// ===== En Proceso
solicitudesProceso();

// ===== Liberadas
solicitudesLiberadas();

// ==== Rechazadas
solicitudesRechazadas();


function solicitudesProceso() {

    TblSolicitudes.setBusy(true);

    var options = {
        parameters: {
            "authGroup": authItem.myGroup, // Required 
            "status": 'En Proceso' // Required
        }
    };

    apiAPIGetRequestsInProcess(options).then( (resp) => {

        console.log(resp);

        // modelMultiModelSolicitudes.setData(resp);
        modelTblSolicitudes.setData(resp);
        TblSolicitudes.setBusy(false);

        // paginationBarSolicitudes.run();
        // paginationBarSolicitudes.handlePagination();

    }).catch( (err) => {
        console.log({err});
        TblSolicitudes.setBusy(false);
    });

}

function solicitudesLiberadas() {

    TblLiberadas.setBusy(true);


    var optsLiberadas = {
        parameters: {
            "authGroup": authItem.myGroup, // Required 
            "status": 'Liberado' // Required
        }
    };

    apiAPIGetRequestsInProcess(optsLiberadas).then( (resp) => {

        console.log(resp);

        // modelTblSolicitudes.setData(resp);
        // TblSolicitudes.setBusy(false);

        // modelMultiModelLiberadas.setData(resp);
        modelTblLiberadas.setData(resp);
        TblLiberadas.setBusy(false)

        // paginationBarLiberadas.run();
        // paginationBarLiberadas.handlePagination();    

    }).catch( (err) => {
        console.log({err});
        TblLiberadas.setBusy(true);
    });

}

function solicitudesRechazadas() {

    TblRechazadas.setBusy(true);

    var optsRechazadas = {
        parameters: {
            "authGroup": authItem.myGroup, // Required 
            "status": 'Rechazado' // Required
        }
    };

    apiAPIGetRequestsInProcess(optsRechazadas).then( (resp) => {

        console.log(resp);

        // modelMultiModelRechazadas.setData(resp);
        modelTblRechazadas.setData(resp);
        TblRechazadas.setBusy(false);

        // paginationBar.run();
        // paginationBar.handlePagination();

        // modelTblRechazadas.setData(resp);
        // TblRechazadas.setBusy(false);

    }).catch( (err) => {
        console.log({err});
        TblRechazadas.setBusy(false);
    });

}