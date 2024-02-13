try {

    const query = req.query
    log.info(query);

    const securityGroupPurchasing = `${ query.planta }_REQMX_PURCHASING`;
    const securityGroupMgrPur = `${ query.planta }_REQMX_MGR_PUR`;

    // Enviar peticion para listar los security groups
    const responseSecurityGroups = await apis.getSecurityGroups( { parameters: {}, headers: {}, data: {}, body: {}, } );
    const securityGroups = responseSecurityGroups.data;

    // Compras
    const purchasingGroup = securityGroups.find( (elemento) => elemento.name === securityGroupPurchasing );
    const respPurchasingGroup = await apis.getSecurityGroup( { parameters: {}, headers: {}, data: {}, body: {"id": purchasingGroup.id }, } );
    const objPurchasing = respPurchasingGroup.data;
    const usersPurchasing = objPurchasing.users;

    // log.info(usersPurchasing);

    let objPurchasers = usersPurchasing.map( function(value, label) {
        return { purchaser_sgi: value.username, purchaser_name: value.name, purchaser_email: value.email }
    });

    log.info(objPurchasers);

    // Jefe de Compras
    const mgrPurGroup = securityGroups.find( (elemento) => elemento.name === securityGroupMgrPur );
    const respMgrPurGroup = await apis.getSecurityGroup( { parameters: {}, headers: {}, data: {}, body: {"id": mgrPurGroup.id }, } );
    const objMgrPur = respMgrPurGroup.data;
    const usersMgrPur = objMgrPur.users;

    let objManagerPurchasing = usersMgrPur.map( function(value, label) {
        return { mgr_sgi: value.username, mgr_name: value.name, mgr_email: value.email }
    });

    log.info(objManagerPurchasing);

    // Request query
    result = {
        data: {
            compras: objPurchasers,
            jefe_compras: objManagerPurchasing,
        }
    };

} catch (err) {

   log.error(err.toString());
   return fail();

}

complete();