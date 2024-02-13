// req is the http request object when the server script is used as an api endpoint.
const body = req.body; // request data body.

// User information
const user = req.user;
const userId = user.id;
const username = user.username;

const query = req.query;

const data = await entities.grl_mx_request.createQueryBuilder("g")
    .leftJoinAndSelect("master_files", "m", "m.folio = g.grl_folio") // LEFT JOIN
    .leftJoinAndSelect('sgsmdig_main_bu', 'bu', 'g.grl_planta = bu.Bu') // LEFT JOIN
    // .where("g.grl_folio = 'MDMX-92'")
    .where("g.grl_folio = :folio", { folio: query.folio }) // Where en parametro
    // .getRawMany() // Obtiene varios
    .getRawOne() // Obtiene solo uno

const flow = await entities.progress_mx.createQueryBuilder("p")
    // .leftJoinAndSelect("users", "u", "u.SGI = p.approval")
    .select("p.approval", "approval")
    .addSelect("p.step", "step")
    .addSelect("p.status", "status")
    .addSelect("p.updatedAt", "updatedAt")
    .addSelect("u.Name", "Nombre")
    .leftJoin("users", "u", "u.SGI = p.approval")
    .where("p.folio = :folio", {folio: query.folio})
    // .getMany();
    .getRawMany()

data.flow = flow;

// Request query
result = {
    data: data,
};

complete();

