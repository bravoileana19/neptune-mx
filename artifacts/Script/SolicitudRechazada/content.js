const workflow = await p9.wf.get(wfData.id);
// log.info(wfData)
// log.info(workflow)

const body = JSON.parse(wfData.objectType);

// const request = await entities.grl_mx_request.createQueryBuilder("alias")
//     .where("grl_folio = :grl_folio", {grl_folio: body.grl_folio})
//     .andWhere("grl_status_now = :grl_status_now", {grl_status_now: 'En Proceso'})
//     .getOne();

const respProgress = await entities.progress_mx.findOne({"folio":body.grl_folio,"status":"Pending"});

const stepPending = respProgress.step;
const wfLog = workflow.log;

const resultado = wfLog.find( (elemento) => elemento.taskTitle === stepPending && elemento.action === 'Reject' )
log.info(resultado)

const approval = resultado.createdBy;

// TODO: Validacion, si la persona que rechaza es la misma que solicita, quiere decir que es una cancelacion, si no, es un rechazo de algun aprobador

await entities.progress_mx.createQueryBuilder()
        .update()
        .set({"approval": approval.toUpperCase(), "status": resultado.action })
        .where("id = :id", {id: respProgress.id})
        .execute();

const entity = await entities.users.findOne({"SGI":approval.toUpperCase()});

await entities.grl_mx_request.createQueryBuilder()
    .update()
    .set({"grl_status_now": "Rechazado","updatedAt": Date.now(), "grl_usr_now": approval.toUpperCase(), "grl_name_usr_now": entity.Name})
    .where("grl_folio = :grl_folio", {grl_folio: body.grl_folio})
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

await sendEmail({
    to: dataUsrSolicitante.Mail,
    subject: "[Test] - Solicitud Codigo MX Pendiente",
    // from: "Omar.Salgado@saint-gobain.com",
    from: "j05svc-email@saint-gobain.com",
    templateId: "276ff196-e46b-4ea7-b68e-e7246d713e1d",
    bcc: 'Omar.Salgado@saint-gobain.com',
    primitives: { folio: body.grl_folio, planta: planta, tipo: body.grl_tipo_solicitud, clasificacion: body.grl_clasificacion, tipo_material: body.grl_tipo_material, solicitante: dataUsrSolicitante.Name, fecha_solicitud: fechaSolicitud },
    // attachments
});

complete();