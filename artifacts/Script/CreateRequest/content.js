try {

    const body = req.body; // request data body
    const user = req.user;
    const username = user.username;

    const data = {
        // "grl_folio": body.grl_folio,
        "grl_planta": body.grl_planta,
        "grl_tipo_solicitud": body.grl_tipo_solicitud,
        "grl_codigo": body.grl_codigo,
        "grl_tipo_material": body.grl_tipo_material,
        "grl_grupo_articulos": body.grl_grupo_articulos,
        "grl_dimensiones": body.grl_dimensiones,
        "grl_area": body.grl_area,
        "grl_equipo": body.grl_equipo,
        "grl_caducidad": body.grl_caducidad,
        "grl_consumo": body.grl_consumo,
        "grl_clasificacion": body.grl_clasificacion,
        "grl_justificacion": body.grl_justificacion,
        "grl_hoja_seguridad": body.grl_hoja_seguridad,
        "grl_hoja_resguardo": body.grl_hoja_resguardo,
        "grl_comentarios": body.grl_comentarios,
        "createdAt": Date.now(), 
        "updatedAt": Date.now(), 
        "createdBy": username.toUpperCase(),
        "updatedBy": username.toUpperCase(),
        "grl_umb": body.grl_umb,
        "grl_descripcion": body.grl_descripcion,
        "grl_purchaser": ( body.grl_purchaser == null ) ? '' : body.grl_purchaser,
        "grl_mgr_purchaser": ( body.grl_mgr_purchaser == null ) ? '' : body.grl_mgr_purchaser,
    }

    const response = await entities.grl_mx_request.createQueryBuilder()
        .insert()
        .values(data)
        .execute()

    const idRecord = response.identifiers[0].id;

    const countRecords = await entities.grl_mx_request.createQueryBuilder("alias")
        // .where("alias.id = :id", {id: 1})
        .getCount();

    const globalFolio = globals.generarFolio;

    const folio = await globalFolio.generarFolio( 'MDMX', countRecords, 10 )
    // log.info(folio);

    await entities.grl_mx_request.update(idRecord, {grl_folio: folio});

    // log.info(JSON.stringify(response)); // {"identifiers":[{"id":"c79622b6-6da6-469e-8acd-e3b569657b60"}],"generatedMaps":[{"id":"c79622b6-6da6-469e-8acd-e3b569657b60"}],"raw":1}

    const dataFile = {
        "folio": folio,
        "sgi_enter": username,
        "value_file": body.grl_file,
        "createdAt": Date.now(), 
        "updatedAt": Date.now(), 
        "createdBy": username.toUpperCase(), 
        "updatedBy": username.toUpperCase()
    }

    const responseFile = await entities.master_files.createQueryBuilder()
    .insert()
    .values(dataFile)
    .execute();

    log.info(JSON.stringify(responseFile));

    // Request query
    result = {
        data: {
            status: 200,
            responseText: 'OK!',
            folio: folio,
        }
    };

} catch (err) {

   log.error(err.toString());
   return fail();

}

complete();