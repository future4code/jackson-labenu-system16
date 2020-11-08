import express, { Express } from "express";
import knex from "knex";
import dotenv from "dotenv";
import { Server } from "http";
import createMission from "./endpoints/createMission";
import createStudent from "./endpoints/createStudent";
import createTeacher from "./endpoints/createTeachers";

dotenv.config()

export const connection: knex = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306
    }
})

const app: Express = express()
app.use(express.json())

//-------------------------

app.put("/mission", createMission)

app.put("/student", createStudent)

app.put("/teacher", createTeacher)

//-------------------------

const server: Server = app.listen(3003, ()=>{
    if (server) {
        console.log("Servidor rodando na porta 3003")
    } else {
        console.error("Falha ao iniciar o servidor")
    }
})