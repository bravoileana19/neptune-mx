try {

    const body = req.body; // request data body
    const user = req.user;
    const username = user.username;

    const response = await entities.grl_mx_request.createQueryBuilder()
    .update()
    .set({"grl_id_wf":body.grl_id_wf,"updatedAt": Date.now(),})
    .where("grl_folio = :grl_folio", {grl_folio: body.grl_folio})
    .execute();

    // Request query
    result = {
        data: {
            status: 200,
            responseText: 'ID de WF Agregado!'
        }
    };

} catch ( err ) {

    log.error(err.toString());
    return fail();

}

complete();

