import { Request, Response } from "express";
import moment from "moment";
import insertMission from "../data/insertMission";

export default async function createMission(
    req:Request, 
    res:Response
    ) {
    try {
        // Validar entradas da requisicão
        if(
            !req.body.name ||
            !req.body.start ||
            !req.body.end ||
            !req.body.module
        ){
            res.status(400).send({
                message: "Opa! Todos os campos devem ser preenchidos"
            })

            return
        }
        const endDateDiff: number = moment(req.body.end, "DD/MM/YYYY").unix() - moment().unix()
        if(endDateDiff <= 0){
            res.status(400).send({
                message: "Opa! O dia de término da missão já passou! Verifique e tente novamente!"
            })
            
            return
        }

        // Consultar o banco de dados
        const id: number = moment().unix() + Math.random()

        await insertMission(
            id,
            req.body.name,
            moment(req.body.start, "DD/MM/YYYY").format("YYYY-MM-DD"),
            moment(req.body.end, "DD/MM/YYYY").format("YYYY-MM-DD"),
            req.body.module
        )

        // Responder a requisição
        res.status(200).send({
            message: "Missão inserida com sucesso!",
            id,
            name: req.body.name  
        })

    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}