import { Request, Response } from "express";
import moment from "moment";
import insertStudent from "../data/insertStudent";

export default async function createStudent(
    req:Request, 
    res:Response
    ) {
    try {
        // Validar entradas da requisicão
        if(
            !req.body.name ||
            !req.body.email ||
            !req.body.birthdate ||
            !req.body.hobby
        ){
            res.status(400).send({
                message: "Opa! Todos os campos devem ser preenchidos"
            })

            return
        }
        const birthdateDiff: number = (moment(req.body.birthdate, "DD/MM/YYYY").days() +6,574.365) - moment().days()
        if(birthdateDiff <= 0){
            res.status(400).send({
                message: "Opa! A idade deve ser maior que 18 anos! Verifique e tente novamente!"
            })
            
            return
        }

        // Consultar o banco de dados
        const id: number = moment().unix() + Math.random()

        await insertStudent(
            id,
            req.body.name,
            req.body.email,
            moment(req.body.birthdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
            req.body.hobby
        )

        // Responder a requisição
        res.status(200).send({
            message: "Estudante inserido com sucesso!",
            id,
            name: req.body.name,
            email: req.body.email, 
            birthdate: req.body.birthdate,
            hobby: req.body.hobby
        })

    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}