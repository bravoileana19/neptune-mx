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

const body = JSON.parse(wfData.objectType);

const workflow = await p9.wf.get(wfData.id);
log.info(workflow)

const respProgress = await entities.progress_mx.findOne({"folio":body.grl_folio,"status":"Pending"});

const stepPending = respProgress.step;
const fromAction = wfData.fromAction;
const wfLog = workflow.log;

const resultado = wfLog.find( (elemento) => elemento.taskTitle === stepPending && elemento.action === 'Approve' )
log.info(resultado);

const approval = resultado.createdBy;

const stepWfActual = wfAuth.find( (elemento) => elemento.action === stepPending );
log.info(stepWfActual);

if ( stepWfActual.action === 'Autorizacion Dir Planta' && body.grl_tipo_material === 'HIBE/MCR - Consumible' ) {

    const stepWfNext = wfAuth.find( (elemento) => elemento.step === stepWfActual.step + 1 );
    log.info(stepWfNext);

    const securityGroupNext = `${ body.grl_planta }_${ stepWfNext.authGroup }`;

    await entities.progress_mx.createQueryBuilder()
        .update()
        .set({"approval": approval.toUpperCase() , "status": resultado.action })
        .where("id = :id", {id: respProgress.id})
        .execute();

    // Options for api request. Data and body are interchangeable, body will take precedence.
    const optsGetSecurityGroups = { parameters: {}, headers: {}, data: {}, body: {}, }

    // Send api request.
    const responseSecurityGroups = await apis.getSecurityGroups(optsGetSecurityGroups);
    const securityGroups = responseSecurityGroups.data;

    const nextSecGroup = securityGroups.find( (elemento) => elemento.name === securityGroupNext );
    log.info(nextSecGroup);

    const optsGetSecurityGroup = { parameters: {}, headers: {}, data: {}, body: {"id": nextSecGroup.id }, }

    // Send api request.
    const responseSecurityGroup = await apis.getSecurityGroup(optsGetSecurityGroup);
    // Log response data
    log.info(responseSecurityGroup.data)

    const usersSecurityGroup = responseSecurityGroup.data.users;

    const userNext = usersSecurityGroup[0].username;

    const responseGeneral = await entities.grl_mx_request.createQueryBuilder()
        .update()
        .set({"updatedAt": Date.now(), "grl_usr_now": userNext.toUpperCase(), "grl_name_usr_now": usersSecurityGroup[0].name})
        .where("grl_folio = :grl_folio", {grl_folio: body.grl_folio})
        .execute();

    // const responseProgress = await entities.progress_mx.createQueryBuilder()
    //     .insert()
    //     .values({"folio":body.grl_folio, "approval":userNext.toUpperCase(), "step":stepWfNext.action ,"status":"Pending", "updatedAt": Date.now(),})
    //     .execute();

    const responseProgress = await entities.progress_mx.insert({"folio":body.grl_folio,"approval":userNext.toUpperCase(),"step":stepWfNext.action,"status":"Pending"})

    wfData.result = 'True';

} else {

    const stepWfNext = wfAuth.find( (elemento) => elemento.step === stepWfActual.step + 2 );
    log.info(stepWfNext);

    const securityGroupNext = `${ body.grl_planta }_${ stepWfNext.authGroup }`;

    await entities.progress_mx.createQueryBuilder()
        .update()
        .set({"approval": approval.toUpperCase() , "status": resultado.action })
        .where("id = :id", {id: respProgress.id})
        .execute();

    // Options for api request. Data and body are interchangeable, body will take precedence.
    const optsGetSecurityGroups = { parameters: {}, headers: {}, data: {}, body: {}, }

    // Send api request.
    const responseSecurityGroups = await apis.getSecurityGroups(optsGetSecurityGroups);
    const securityGroups = responseSecurityGroups.data;

    const nextSecGroup = securityGroups.find( (elemento) => elemento.name === securityGroupNext );
    log.info(nextSecGroup);

    const optsGetSecurityGroup = { parameters: {}, headers: {}, data: {}, body: {"id": nextSecGroup.id }, }

    // Send api request.
    const responseSecurityGroup = await apis.getSecurityGroup(optsGetSecurityGroup);
    // Log response data
    log.info(responseSecurityGroup.data)

    const usersSecurityGroup = responseSecurityGroup.data.users;

    const userNext = usersSecurityGroup[0].username;

    const responseGeneral = await entities.grl_mx_request.createQueryBuilder()
        .update()
        .set({"updatedAt": Date.now(), "grl_usr_now": userNext.toUpperCase(), "grl_name_usr_now": usersSecurityGroup[0].name})
        .where("grl_folio = :grl_folio", {grl_folio: body.grl_folio})
        .execute();

    // const responseProgress = await entities.progress_mx.createQueryBuilder()
    //     .insert()
    //     .values({"folio":body.grl_folio, "approval":userNext.toUpperCase(), "step":stepWfNext.action ,"status":"Pending", "updatedAt": Date.now(),})
    //     .execute();
    const responseProgress = await entities.progress_mx.insert({"folio":body.grl_folio,"approval":userNext.toUpperCase(),"step":stepWfNext.action,"status":"Pending"})

    wfData.result = 'False';

}

complete();