import { Request, Response } from "express";
import updateTeacherMission from "../data/updateTeacherMission";

export default async function editTeacherMission(req:Request, res:Response) {
    try {
        // Validar entradas da requisicão
        if(
            req.body.mission_id === ""
        ) {
            res.status(400).send({
                message: "O id da missão precisa ser inserido"
        })
        return
    }

        // Consultar o banco de dados
        await updateTeacherMission(
            req.params.id,
            req.body.mission_id
        )

        // Responder a requisição
        res.status(200).send({
            message: "Missão inserida com sucesso!"
    })

    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}