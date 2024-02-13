const workflow = await p9.wf.get(wfData.id);
// log.info(wfData)
// log.info(workflow)

const body = JSON.parse(wfData.objectType);

await entities.grl_mx_request.createQueryBuilder()
    .update()
    .set({"grl_status_now": "Liberado","updatedAt": Date.now()})
    .where("grl_folio = :grl_folio", {grl_folio: body.grl_folio})
    .execute();

const respProgress = await entities.progress_mx.findOne({"folio":body.grl_folio,"status":"Pending"});

const stepPending = respProgress.step;
const wfLog = workflow.log;

const resultado = wfLog.find( (elemento) => elemento.taskTitle === stepPending && elemento.action === 'Approve' );
log.info(resultado);

const approval = resultado.createdBy;

await entities.progress_mx.createQueryBuilder()
        .update()
        .set({"approval": approval.toUpperCase() , "status": resultado.action })
        .where("id = :id", {id: respProgress.id})
        .execute();

const solicitud = await entities.grl_mx_request.findOne({"grl_folio":body.grl_folio});
const usrSolicitante = solicitud.createdBy;
const dataUsrSolicitante = await entities.users.findOne({ "SGI": usrSolicitante.toUpperCase() });

const date = new Date( solicitud.createdAt );
const fechaSolicitud = date.toDateString();

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

const securityGroupActual = `${ body.grl_planta }_REQMX_NOTIFY`;

// Options for api request. Data and body are interchangeable, body will take precedence.
const optsGetSecurityGroups = { parameters: {}, headers: {}, data: {}, body: {}, }
const responseSecurityGroups = await apis.getSecurityGroups(optsGetSecurityGroups);
const securityGroups = responseSecurityGroups.data;

const currentSecGroup = securityGroups.find( (elemento) => elemento.name === securityGroupActual );

const optsGetSecurityGroup = { parameters: {}, headers: {}, data: {}, body: {"id": currentSecGroup.id }, }

// Send api request.
const responseSecurityGroup = await apis.getSecurityGroup(optsGetSecurityGroup);
// Log response data
// log.info(responseSecurityGroup.data)

const objSecurityGroup = responseSecurityGroup.data;
const usersSecurityGroup = objSecurityGroup.users;

let correos = [ dataUsrSolicitante.Mail ];

usersSecurityGroup.forEach(user => {
    correos.push(user.email);
});

// log.info(correos);

await sendEmail({
    to: correos,
    subject: "[Test] - Solicitud Codigo MX Pendiente",
    // from: "Omar.Salgado@saint-gobain.com",
    from: "j05svc-email@saint-gobain.com",
    templateId: "743c4faf-0a14-4165-9fc0-7bf2af5af619",
    bcc: 'Omar.Salgado@saint-gobain.com',
    primitives: { folio: body.grl_folio, planta: planta, tipo: body.grl_tipo_solicitud, clasificacion: body.grl_clasificacion, tipo_material: body.grl_tipo_material, solicitante: dataUsrSolicitante.Name, fecha_solicitud: fechaSolicitud },
    // attachments
});

complete();