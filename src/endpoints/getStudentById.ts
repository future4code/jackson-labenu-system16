import moment from 'moment';
import { Request, Response } from "express";
import selectStudentById from "../data/selectStudentById";

export default async function getStudentById(
    req:Request, 
    res:Response
    ) {
    try {
        // Consultar o banco de dados
        const student = await selectStudentById(req.params.id)
        
        // Validar as saídas do banco de dados
        if(!student){
            res.status(404).send({
                message: "Estudante não encontrado(a)!"
            })
            return
        }
        res.status(200).send({
            message: "A idade do(a) estudante é:",
            age: student.age,
        })

    } catch (error) {
        res.status(400).send({
        message: error.message || error.sqlMessage
        })
    }
}