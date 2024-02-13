const body = JSON.parse(wfData.objectType);

const request = await entities.grl_mx_request.createQueryBuilder("g")
    .where("g.grl_folio = :folio", {folio: body.grl_folio})
    .getOne();


// if ( body.grl_planta === '701' & (body.grl_tipo_solicitud === 'Alta' && body.grl_clasificacion === 'A') || body.grl_planta === '701' && ( body.grl_tipo_solicitud === 'Cambio de Categoria' && (body.grl_clasificacion === 'A' || body.grl_clasificacion === 'O') ) ) {
if ( (body.grl_tipo_solicitud === 'Alta' && body.grl_clasificacion === 'A') || ( body.grl_tipo_solicitud === 'Cambio de Categoria' && (body.grl_clasificacion === 'A' || body.grl_clasificacion === 'O') ) ) {

    // let usrNow = 'L4595236';

    // const securityGroupActual = '701_REQMX_DIR_PLANT';
    const securityGroupActual = `${ body.grl_planta }_REQMX_DIR_PLANT`;

    const optsGetSecurityGroups = { parameters: {}, headers: {}, data: {}, body: {}, }
    const responseSecurityGroups = await apis.getSecurityGroups(optsGetSecurityGroups);
    const securityGroups = responseSecurityGroups.data;

    const currentSecGroup = securityGroups.find( (elemento) => elemento.name === securityGroupActual );
    const optsGetSecurityGroup = { parameters: {}, headers: {}, data: {}, body: {"id": currentSecGroup.id }, }    
    const responseSecurityGroup = await apis.getSecurityGroup(optsGetSecurityGroup);

    const objSecurityGroup = responseSecurityGroup.data;
    const usersSecurityGroup = objSecurityGroup.users;
    const usrNow = usersSecurityGroup[0].username;

    // const entity = await entities.users.findOne({"SGI":usrNow});

    const response = await entities.grl_mx_request.createQueryBuilder()
    .update()
    .set({"grl_id_wf":body.grl_id_wf, "grl_status_now": "En Proceso","updatedAt": Date.now(), "grl_usr_now": usrNow.toUpperCase(), "grl_name_usr_now": usersSecurityGroup[0].name})
    .where("grl_folio = :grl_folio", {grl_folio: body.grl_folio})
    .execute();

    const responseProgress1 = await entities.progress_mx.insert({"folio":body.grl_folio,"approval":request.createdBy,"step":"Started Workflow","status":"Started"})
    const responseProgress2 = await entities.progress_mx.insert({"folio":body.grl_folio,"approval":usrNow.toUpperCase(),"step":"Validacion de Clasificacion","status":"Pending"})
    
    wfData.result = 'True';

} else {

    // let usrNow = null;

    // switch ( body.grl_planta ) {

    //     case '707':
    //         usrNow = 'J8252156';
    //         break;
        
    //     case '709':
    //         usrNow = 'R2838874';
    //         break;

    //     case '791':
    //         usrNow = 'C8037211';

    //     default:
    //         usrNow = 'D1288961';
    //         break;

    // }

    const securityGroupActual = `${ body.grl_planta }_REQMX_MGR_LGT`;

    const optsGetSecurityGroups = { parameters: {}, headers: {}, data: {}, body: {}, }
    const responseSecurityGroups = await apis.getSecurityGroups(optsGetSecurityGroups);
    const securityGroups = responseSecurityGroups.data;

    const currentSecGroup = securityGroups.find( (elemento) => elemento.name === securityGroupActual );
    const optsGetSecurityGroup = { parameters: {}, headers: {}, data: {}, body: {"id": currentSecGroup.id }, }    
    const responseSecurityGroup = await apis.getSecurityGroup(optsGetSecurityGroup);

    const objSecurityGroup = responseSecurityGroup.data;
    const usersSecurityGroup = objSecurityGroup.users;
    const usrNow = usersSecurityGroup[0].username;

    // const entity = await entities.users.findOne({"SGI":usrNow});

    const response = await entities.grl_mx_request.createQueryBuilder()
    .update()
    .set({"grl_id_wf":body.grl_id_wf, "grl_status_now": "En Proceso","updatedAt": Date.now(), "grl_usr_now": usrNow.toUpperCase(), "grl_name_usr_now": usersSecurityGroup[0].name, "grl_clasf_edit": "1"})
    .where("grl_folio = :grl_folio", {grl_folio: body.grl_folio})
    .execute();

    const responseProgress1 = await entities.progress_mx.insert({"folio":body.grl_folio,"approval":request.createdBy,"step":"Started Workflow","status":"Started"})
    const responseProgress2 = await entities.progress_mx.insert({"folio":body.grl_folio,"approval":usrNow.toUpperCase(),"step":"Autorizacion de Solicitud","status":"Pending"})

    wfData.result = 'False';

}

complete();