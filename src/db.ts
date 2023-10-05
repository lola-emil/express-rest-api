import knex from "knex";

const db = knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        database: "user_express"
    }
});


export default db;