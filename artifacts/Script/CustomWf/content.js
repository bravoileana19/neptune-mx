const wfAuth = [
    { step: 1, action: 'Validacion de Clasificacion', authGroup: 'REQMX_DIR_PLANT' },
    { step: 2, action: 'Autorizacion de Solicitud', authGroup: 'REQMX_MGR_LGT' },
    { step: 3, action: 'Ingreso de Precios y Proveedor', authGroup: 'REQMX_PURCHASING' },
    { step: 4, action: 'Autorizacion de Compras', authGroup: 'REQMX_MGR_PUR' },
    { step: 5, action: 'Ingreso de Minimos y Maximos', authGroup: 'REQMX_PLANNER' },
    { step: 6, action: 'Validacion de Minimos y Maximos', authGroup: 'REQMX_MGR_LGT' },
    { step: 7, action: 'Autorizacion Dir Planta', authGroup: 'REQMX_DIR_PLANT' },
    { step: 8, action: 'Validacion Categoria HIBE', authGroup: 'REQMX_EHS' },
    { step: 9, action: 'Creacion e Ingreso MX', authGroup: 'REQMX_MASTERDATA' },
    { step: 10, action: 'Validacion de FIA', authGroup: 'REQMX_FIA' },
];

// log.info(wfData)

const body = JSON.parse(wfData.objectType);
// log.info(body);

const respProgress = await entities.progress_mx.findOne({"folio":body.grl_folio,"status":"Pending"});
const solicitud = await entities.grl_mx_request.findOne({"grl_folio":body.grl_folio});
const usrSolicitante = solicitud.createdBy;
const dataUsrSolicitante = await entities.users.findOne({ "SGI": usrSolicitante.toUpperCase() });

const date = new Date( solicitud.createdAt );
const fechaSolicitud = date.toDateString();

log.info(solicitud);

let planta = null;

switch (body.grl_planta) {
    case '701':
        planta = 'Sekurit Cuautla';
        break;

    case '707':
        planta = 'Sekurit Sendai';
        break;

    case '709':
        planta = 'Sekurit Saltillo';
        break;

    case '791':
        planta = 'Sekurit Garden Grove';
        break;
}

const stepPending = respProgress.step;
const stepWfActual = wfAuth.find( (elemento) => elemento.action === stepPending );

// Fijar al comprador seleccionado y al jefe de compras
if ( stepWfActual.authGroup == 'REQMX_PURCHASING' || stepWfActual.authGroup == 'REQMX_MGR_PUR' ) {

    let userNow = ( stepWfActual.authGroup == 'REQMX_PURCHASING' ) ? solicitud.grl_purchaser : solicitud.grl_mgr_purchaser
    const dataUsrNow = await entities.users.findOne({ "SGI": userNow.toUpperCase() });

    wfData.approvers.push(userNow);

    await sendEmail({
        to: dataUsrNow.Mail,
        subject: "[Test] - Solicitud Codigo MX Pendiente",
        from: "j05svc-email@saint-gobain.com",
        // from: "Omar.Salgado@saint-gobain.com",
        templateId: "35668dc7-9be4-42c1-a0e2-c685ed6f2f05",
        bcc: 'Omar.Salgado@saint-gobain.com',
        primitives: { folio: body.grl_folio, planta: planta, tipo: body.grl_tipo_solicitud, clasificacion: body.grl_clasificacion, tipo_material: body.grl_tipo_material, solicitante: dataUsrSolicitante.Name, fecha_solicitud: fechaSolicitud },
        // attachments
    });

} else {

    const securityGroupActual = `${ body.grl_planta }_${ stepWfActual.authGroup }`;

    // Options for api request. Data and body are interchangeable, body will take precedence.
    const optsGetSecurityGroups = { parameters: {}, headers: {}, data: {}, body: {}, }

    // Send api request.
    const responseSecurityGroups = await apis.getSecurityGroups(optsGetSecurityGroups);
    const securityGroups = responseSecurityGroups.data;

    const currentSecGroup = securityGroups.find( (elemento) => elemento.name === securityGroupActual );

    const optsGetSecurityGroup = { parameters: {}, headers: {}, data: {}, body: {"id": currentSecGroup.id }, }

    // Send api request.
    const responseSecurityGroup = await apis.getSecurityGroup(optsGetSecurityGroup);

    const objSecurityGroup = responseSecurityGroup.data;
    const usersSecurityGroup = objSecurityGroup.users;

    let correos = [];

    usersSecurityGroup.forEach(user => {
        wfData.approvers.push(user.username);
        correos.push(user.email);
    });

    // log.info(correos);

    await sendEmail({
        to: correos,
        subject: "[Test] - Solicitud Codigo MX Pendiente",
        from: "j05svc-email@saint-gobain.com",
        // from: "Omar.Salgado@saint-gobain.com",
        templateId: "35668dc7-9be4-42c1-a0e2-c685ed6f2f05",
        bcc: 'Omar.Salgado@saint-gobain.com',
        primitives: { folio: body.grl_folio, planta: planta, tipo: body.grl_tipo_solicitud, clasificacion: body.grl_clasificacion, tipo_material: body.grl_tipo_material, solicitante: dataUsrSolicitante.Name, fecha_solicitud: fechaSolicitud },
        // attachments
    });

}

complete();