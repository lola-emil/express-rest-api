const express = require("express");
const knex = require("knex");

const PORT = 5000;
const app = express();

/**@type {import("knex").Knex} */
const db = knex({
    client: "mysql",
    connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        database: "user_express"
    }
});

app.use(express.urlencoded({ extended: false }));

app.get("/user/login", async (req, res) => {
    const { email, password } = req.query;
    const matchedUser = await db("tbl_user").select().where({
        email,
        password
    });

    res.json(matchedUser);
});
app.post("/user/register", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    await db("tbl_user").insert({
        firstname,
        lastname,
        email,
        password
    });

    res.json(req.body);
});
app.patch("/user/update/:id", async (req, res) => {
    const {firstname, lastname} = req.body;
    const id = req.params.id;

    await db("tbl_user").update({
        firstname,
        lastname
    }).where("user_id", id);

    res.json(req.body);
});

app.delete("/user/delete/:id", async (req, res) => {
    const id = req.params.id;
    await db("tbl_user").delete().where("user_id", id);
    res.json({
        user_id: id
    })
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));