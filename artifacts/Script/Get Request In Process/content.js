const user = req.user;
const query = req.query

// const status = query.status;

let resst = null;

switch ( query.status ) {

    case 'Liberado':
        resst = await getRequestApproved(query.authGroup, user.username);
        break;

    case 'Rechazado':
        resst = await getRequestRejected(query.authGroup, user.username);
        break;

    default:
        resst = await getRequestInProcess(query.authGroup, user.username);
        break;

}

// resst = await getRequestInProcess(query.authGroup, user.username);

for (i = 0; i < resst.length; i++) {
    // resst[i].statusColor = (resst[i].Status_now_ID === 30 ? 'Danger' : (resst[i].Status_now_ID === 20 ? 'Success' : 'Info'));
    let avatarValidator = resst[i].grl_usr_now !== null ? resst[i].grl_usr_now : resst[i].createdBy;
    resst[i].valImg = `https://lan.api.saint-gobain.com/sgdsi/groupdirectory/profile/pictures/${ avatarValidator.toUpperCase() }.jpg`;
    // resst[i].valImg = `https://white-and-yellow.saint-gobain.com/api/photo/${ avatarValidator }.jpg`;
    resst[i].valNow = resst[i].grl_name_usr_now;
}

result = resst;

complete();

async function getRequestInProcess(auth, username) {

    let results = [];
    const table = entities.grl_mx_request

    if (auth === 'REQMX_REQUEST') {

        results = await table.createQueryBuilder("g")
            .select("bu.Name", 'grl_planta')
            .addSelect("g.id", "id")
            .addSelect("g.createdAt", "createdAt")
            .addSelect("g.updatedAt", "updatedAt")
            .addSelect("g.createdBy", "createdBy")
            .addSelect("g.updatedBy", "updatedBy")
            .addSelect("g.grl_folio", "grl_folio")
            .addSelect("g.grl_planta", "grl_planta")
            .addSelect("g.grl_tipo_solicitud", "grl_tipo_solicitud")
            .addSelect("g.grl_codigo", "grl_codigo")
            .addSelect("g.grl_tipo_material", "grl_tipo_material")
            .addSelect("g.grl_grupo_articulos", "grl_grupo_articulos")
            .addSelect("g.grl_dimensiones", "grl_dimensiones")
            .addSelect("g.grl_area", "grl_area")
            .addSelect("g.grl_equipo", "grl_equipo")
            .addSelect("g.grl_caducidad", "grl_caducidad")
            .addSelect("g.grl_consumo", "grl_consumo")
            .addSelect("g.grl_clasificacion", "grl_clasificacion")
            .addSelect("g.grl_justificacion", "grl_justificacion")
            .addSelect("g.grl_hoja_seguridad", "grl_hoja_seguridad")
            .addSelect("g.grl_hoja_resguardo", "grl_hoja_resguardo")
            .addSelect("g.grl_comentarios", "grl_comentarios")
            .addSelect("g.grl_status_now", "grl_status_now")
            .addSelect("g.grl_name_usr_now", "grl_name_usr_now")
            .addSelect("g.grl_usr_now", "grl_usr_now")
            .addSelect("g.grl_precio", "grl_precio")
            .addSelect("g.grl_plazo_entrega", "grl_plazo_entrega")
            .addSelect("g.grl_moneda", "grl_moneda")
            .addSelect("g.grl_proveedor", "grl_proveedor")
            .addSelect("g.grl_stock_min", "grl_stock_min")
            .addSelect("g.grl_stock_max", "grl_stock_max")
            .addSelect("g.grl_punto_reorden", "grl_punto_reorden")
            .addSelect("g.grl_codigo_mx", "grl_codigo_mx")
            .addSelect("g.grl_id_wf", "grl_id_wf")
            .leftJoin('sgsmdig_main_bu', 'bu', 'g.grl_planta = bu.Bu')
            .where('g.createdBy = :solicitante', { solicitante: username.toUpperCase() })
            .andWhere('g.grl_status_now = :status', { status: 'En Proceso' })
            .orderBy("g.grl_folio", "DESC")
            .getRawMany();

        // results = await table.find({
        //     where: {
        //         createdBy: username.toUpperCase(),
        //         // grl_status_now: 'En Proceso'
        //     },
        //     order: {
        //         grl_folio: "ASC",
        //     }
        // });

    } else if (auth === 'REQMX_VIEWER') {

        // results = await table.find({
        //     order: {
        //         grl_folio: "ASC",
        //     }
        // });

        results = await table.createQueryBuilder("g")
            .select("bu.Name", 'grl_planta')
            .addSelect("g.id", "id")
            .addSelect("g.createdAt", "createdAt")
            .addSelect("g.updatedAt", "updatedAt")
            .addSelect("g.createdBy", "createdBy")
            .addSelect("g.updatedBy", "updatedBy")
            .addSelect("g.grl_folio", "grl_folio")
            .addSelect("g.grl_planta", "grl_planta")
            .addSelect("g.grl_tipo_solicitud", "grl_tipo_solicitud")
            .addSelect("g.grl_codigo", "grl_codigo")
            .addSelect("g.grl_tipo_material", "grl_tipo_material")
            .addSelect("g.grl_grupo_articulos", "grl_grupo_articulos")
            .addSelect("g.grl_dimensiones", "grl_dimensiones")
            .addSelect("g.grl_area", "grl_area")
            .addSelect("g.grl_equipo", "grl_equipo")
            .addSelect("g.grl_caducidad", "grl_caducidad")
            .addSelect("g.grl_consumo", "grl_consumo")
            .addSelect("g.grl_clasificacion", "grl_clasificacion")
            .addSelect("g.grl_justificacion", "grl_justificacion")
            .addSelect("g.grl_hoja_seguridad", "grl_hoja_seguridad")
            .addSelect("g.grl_hoja_resguardo", "grl_hoja_resguardo")
            .addSelect("g.grl_comentarios", "grl_comentarios")
            .addSelect("g.grl_status_now", "grl_status_now")
            .addSelect("g.grl_name_usr_now", "grl_name_usr_now")
            .addSelect("g.grl_usr_now", "grl_usr_now")
            .addSelect("g.grl_precio", "grl_precio")
            .addSelect("g.grl_plazo_entrega", "grl_plazo_entrega")
            .addSelect("g.grl_moneda", "grl_moneda")
            .addSelect("g.grl_proveedor", "grl_proveedor")
            .addSelect("g.grl_stock_min", "grl_stock_min")
            .addSelect("g.grl_stock_max", "grl_stock_max")
            .addSelect("g.grl_punto_reorden", "grl_punto_reorden")
            .addSelect("g.grl_codigo_mx", "grl_codigo_mx")
            .addSelect("g.grl_id_wf", "grl_id_wf")
            .leftJoin('sgsmdig_main_bu', 'bu', 'g.grl_planta = bu.Bu')
            .where('g.grl_status_now = :status', { status: 'En Proceso' })
            .orderBy("g.grl_folio", "DESC")
            .getRawMany();

    }

    log.info(results);

    return results;

}

async function getRequestApproved( auth, username ) {

    let results = [];
    const table = entities.grl_mx_request

    if (auth === 'REQMX_REQUEST') {

        results = await table.createQueryBuilder("g")
            .select("bu.Name", 'grl_planta')
            .addSelect("g.id", "id")
            .addSelect("g.createdAt", "createdAt")
            .addSelect("g.updatedAt", "updatedAt")
            .addSelect("g.createdBy", "createdBy")
            .addSelect("g.updatedBy", "updatedBy")
            .addSelect("g.grl_folio", "grl_folio")
            .addSelect("g.grl_planta", "grl_planta")
            .addSelect("g.grl_tipo_solicitud", "grl_tipo_solicitud")
            .addSelect("g.grl_codigo", "grl_codigo")
            .addSelect("g.grl_tipo_material", "grl_tipo_material")
            .addSelect("g.grl_grupo_articulos", "grl_grupo_articulos")
            .addSelect("g.grl_dimensiones", "grl_dimensiones")
            .addSelect("g.grl_area", "grl_area")
            .addSelect("g.grl_equipo", "grl_equipo")
            .addSelect("g.grl_caducidad", "grl_caducidad")
            .addSelect("g.grl_consumo", "grl_consumo")
            .addSelect("g.grl_clasificacion", "grl_clasificacion")
            .addSelect("g.grl_justificacion", "grl_justificacion")
            .addSelect("g.grl_hoja_seguridad", "grl_hoja_seguridad")
            .addSelect("g.grl_hoja_resguardo", "grl_hoja_resguardo")
            .addSelect("g.grl_comentarios", "grl_comentarios")
            .addSelect("g.grl_status_now", "grl_status_now")
            .addSelect("g.grl_name_usr_now", "grl_name_usr_now")
            .addSelect("g.grl_usr_now", "grl_usr_now")
            .addSelect("g.grl_precio", "grl_precio")
            .addSelect("g.grl_plazo_entrega", "grl_plazo_entrega")
            .addSelect("g.grl_moneda", "grl_moneda")
            .addSelect("g.grl_proveedor", "grl_proveedor")
            .addSelect("g.grl_stock_min", "grl_stock_min")
            .addSelect("g.grl_stock_max", "grl_stock_max")
            .addSelect("g.grl_punto_reorden", "grl_punto_reorden")
            .addSelect("g.grl_codigo_mx", "grl_codigo_mx")
            .addSelect("g.grl_id_wf", "grl_id_wf")
            .leftJoin('sgsmdig_main_bu', 'bu', 'g.grl_planta = bu.Bu')
            .where('g.createdBy = :solicitante', { solicitante: username.toUpperCase() })
            .andWhere('g.grl_status_now = :status', { status: 'Liberado' })
            .orderBy("g.grl_folio", "DESC")
            .getRawMany();

        // results = await table.find({
        //     where: {
        //         createdBy: username.toUpperCase(),
        //         // grl_status_now: 'En Proceso'
        //     },
        //     order: {
        //         grl_folio: "ASC",
        //     }
        // });

    } else if (auth === 'REQMX_VIEWER') {

        // results = await table.find({
        //     order: {
        //         grl_folio: "ASC",
        //     }
        // });

        results = await table.createQueryBuilder("g")
            .select("bu.Name", 'grl_planta')
            .addSelect("g.id", "id")
            .addSelect("g.createdAt", "createdAt")
            .addSelect("g.updatedAt", "updatedAt")
            .addSelect("g.createdBy", "createdBy")
            .addSelect("g.updatedBy", "updatedBy")
            .addSelect("g.grl_folio", "grl_folio")
            .addSelect("g.grl_planta", "grl_planta")
            .addSelect("g.grl_tipo_solicitud", "grl_tipo_solicitud")
            .addSelect("g.grl_codigo", "grl_codigo")
            .addSelect("g.grl_tipo_material", "grl_tipo_material")
            .addSelect("g.grl_grupo_articulos", "grl_grupo_articulos")
            .addSelect("g.grl_dimensiones", "grl_dimensiones")
            .addSelect("g.grl_area", "grl_area")
            .addSelect("g.grl_equipo", "grl_equipo")
            .addSelect("g.grl_caducidad", "grl_caducidad")
            .addSelect("g.grl_consumo", "grl_consumo")
            .addSelect("g.grl_clasificacion", "grl_clasificacion")
            .addSelect("g.grl_justificacion", "grl_justificacion")
            .addSelect("g.grl_hoja_seguridad", "grl_hoja_seguridad")
            .addSelect("g.grl_hoja_resguardo", "grl_hoja_resguardo")
            .addSelect("g.grl_comentarios", "grl_comentarios")
            .addSelect("g.grl_status_now", "grl_status_now")
            .addSelect("g.grl_name_usr_now", "grl_name_usr_now")
            .addSelect("g.grl_usr_now", "grl_usr_now")
            .addSelect("g.grl_precio", "grl_precio")
            .addSelect("g.grl_plazo_entrega", "grl_plazo_entrega")
            .addSelect("g.grl_moneda", "grl_moneda")
            .addSelect("g.grl_proveedor", "grl_proveedor")
            .addSelect("g.grl_stock_min", "grl_stock_min")
            .addSelect("g.grl_stock_max", "grl_stock_max")
            .addSelect("g.grl_punto_reorden", "grl_punto_reorden")
            .addSelect("g.grl_codigo_mx", "grl_codigo_mx")
            .addSelect("g.grl_id_wf", "grl_id_wf")
            .leftJoin('sgsmdig_main_bu', 'bu', 'g.grl_planta = bu.Bu')
            .where('g.grl_status_now = :status', { status: 'Liberado' })
            .orderBy("g.grl_folio", "DESC")
            .getRawMany();

    }

    log.info(results);

    return results;

}

async function getRequestRejected( auth, username ) {

    let results = [];
    const table = entities.grl_mx_request

    if (auth === 'REQMX_REQUEST') {

        results = await table.createQueryBuilder("g")
            .select("bu.Name", 'grl_planta')
            .addSelect("g.id", "id")
            .addSelect("g.createdAt", "createdAt")
            .addSelect("g.updatedAt", "updatedAt")
            .addSelect("g.createdBy", "createdBy")
            .addSelect("g.updatedBy", "updatedBy")
            .addSelect("g.grl_folio", "grl_folio")
            .addSelect("g.grl_planta", "grl_planta")
            .addSelect("g.grl_tipo_solicitud", "grl_tipo_solicitud")
            .addSelect("g.grl_codigo", "grl_codigo")
            .addSelect("g.grl_tipo_material", "grl_tipo_material")
            .addSelect("g.grl_grupo_articulos", "grl_grupo_articulos")
            .addSelect("g.grl_dimensiones", "grl_dimensiones")
            .addSelect("g.grl_area", "grl_area")
            .addSelect("g.grl_equipo", "grl_equipo")
            .addSelect("g.grl_caducidad", "grl_caducidad")
            .addSelect("g.grl_consumo", "grl_consumo")
            .addSelect("g.grl_clasificacion", "grl_clasificacion")
            .addSelect("g.grl_justificacion", "grl_justificacion")
            .addSelect("g.grl_hoja_seguridad", "grl_hoja_seguridad")
            .addSelect("g.grl_hoja_resguardo", "grl_hoja_resguardo")
            .addSelect("g.grl_comentarios", "grl_comentarios")
            .addSelect("g.grl_status_now", "grl_status_now")
            .addSelect("g.grl_name_usr_now", "grl_name_usr_now")
            .addSelect("g.grl_usr_now", "grl_usr_now")
            .addSelect("g.grl_precio", "grl_precio")
            .addSelect("g.grl_plazo_entrega", "grl_plazo_entrega")
            .addSelect("g.grl_moneda", "grl_moneda")
            .addSelect("g.grl_proveedor", "grl_proveedor")
            .addSelect("g.grl_stock_min", "grl_stock_min")
            .addSelect("g.grl_stock_max", "grl_stock_max")
            .addSelect("g.grl_punto_reorden", "grl_punto_reorden")
            .addSelect("g.grl_codigo_mx", "grl_codigo_mx")
            .addSelect("g.grl_id_wf", "grl_id_wf")
            .leftJoin('sgsmdig_main_bu', 'bu', 'g.grl_planta = bu.Bu')
            .where('g.createdBy = :solicitante', { solicitante: username.toUpperCase() })
            .andWhere("g.grl_status_now = :status1 OR g.grl_status_now = :status2", {
                status1: "Rechazado",
                status2: "Cancelado"
            })
            .orderBy("g.grl_folio", "DESC")
            .getRawMany();

        // results = await table.find({
        //     where: {
        //         createdBy: username.toUpperCase(),
        //         // grl_status_now: 'En Proceso'
        //     },
        //     order: {
        //         grl_folio: "ASC",
        //     }
        // });

    } else if (auth === 'REQMX_VIEWER') {

        // results = await table.find({
        //     order: {
        //         grl_folio: "ASC",
        //     }
        // });

        results = await table.createQueryBuilder("g")
            .select("bu.Name", 'grl_planta')
            .addSelect("g.id", "id")
            .addSelect("g.createdAt", "createdAt")
            .addSelect("g.updatedAt", "updatedAt")
            .addSelect("g.createdBy", "createdBy")
            .addSelect("g.updatedBy", "updatedBy")
            .addSelect("g.grl_folio", "grl_folio")
            .addSelect("g.grl_planta", "grl_planta")
            .addSelect("g.grl_tipo_solicitud", "grl_tipo_solicitud")
            .addSelect("g.grl_codigo", "grl_codigo")
            .addSelect("g.grl_tipo_material", "grl_tipo_material")
            .addSelect("g.grl_grupo_articulos", "grl_grupo_articulos")
            .addSelect("g.grl_dimensiones", "grl_dimensiones")
            .addSelect("g.grl_area", "grl_area")
            .addSelect("g.grl_equipo", "grl_equipo")
            .addSelect("g.grl_caducidad", "grl_caducidad")
            .addSelect("g.grl_consumo", "grl_consumo")
            .addSelect("g.grl_clasificacion", "grl_clasificacion")
            .addSelect("g.grl_justificacion", "grl_justificacion")
            .addSelect("g.grl_hoja_seguridad", "grl_hoja_seguridad")
            .addSelect("g.grl_hoja_resguardo", "grl_hoja_resguardo")
            .addSelect("g.grl_comentarios", "grl_comentarios")
            .addSelect("g.grl_status_now", "grl_status_now")
            .addSelect("g.grl_name_usr_now", "grl_name_usr_now")
            .addSelect("g.grl_usr_now", "grl_usr_now")
            .addSelect("g.grl_precio", "grl_precio")
            .addSelect("g.grl_plazo_entrega", "grl_plazo_entrega")
            .addSelect("g.grl_moneda", "grl_moneda")
            .addSelect("g.grl_proveedor", "grl_proveedor")
            .addSelect("g.grl_stock_min", "grl_stock_min")
            .addSelect("g.grl_stock_max", "grl_stock_max")
            .addSelect("g.grl_punto_reorden", "grl_punto_reorden")
            .addSelect("g.grl_codigo_mx", "grl_codigo_mx")
            .addSelect("g.grl_id_wf", "grl_id_wf")
            .leftJoin('sgsmdig_main_bu', 'bu', 'g.grl_planta = bu.Bu')
            // .where('g.grl_status_now = :status', { status: 'Liberado' })
            // .where(
            //     new Brackets((qb) => {
            //         qb.where('g.grl_status_now = :status', {
            //             status: 'Rechazado',
            //         }).orWhere('g.grl_status_now = :status', { status: 'Cancelado' })
            //     }),
            // )
            .where("g.grl_status_now = :status1 OR g.grl_status_now = :status2", {
                status1: "Rechazado",
                status2: "Cancelado"
            })
            .orderBy("g.grl_folio", "DESC")
            .getRawMany();

    }

    log.info(results);

    return results;

}