import { Request, Response } from "express";
import moment from "moment";
import insertTeacher from "../data/insertTeacher";

export default async function createTeacher(
    req:Request, 
    res:Response
    ) {
    try {
        // Validar entradas da requisicão
        if(
            !req.body.name ||
            !req.body.email ||
            !req.body.birthdate ||
            !req.body.REACT ||
            !req.body.REDUX ||
            !req.body.CSS ||
            !req.body.TESTES ||
            !req.body.TYPESCRIPT ||
            !req.body.PROGRAMAÇÃO_ORIENTADA_A_OBJETOS ||
            !req.body.BACKEND
        ){
            res.status(400).send({
                message: "Opa! Todos os campos devem ser preenchidos"
            })

            return
        }
        // if(
        //     !(req.body.REACT === true || false) &&
        //     !(req.body.REDUX === true || false) &&
        //     !(req.body.CSS === true || false) &&
        //     !(req.body.TESTES === true || false) &&
        //     !(req.body.TYPESCRIPT === true || false) &&
        //     !(req.body.PROGRAMAÇÃO_ORIENTADA_A_OBJETOS === true || false) &&
        //     !(req.body.BACKEND === true || false)
        //     ){
        //     res.status(400).send({
        //         message: "As especialidades devem ser preenchidas com 'true' para especialidades que possui e 'false' para as que não possui"
        //     })
            
        //     return
        // }
        if(
            req.body.REACT === false &&
            req.body.REDUX === false &&
            req.body.CSS ===  false &&
            req.body.TESTES === false &&
            req.body.TYPESCRIPT === false &&
            req.body.PROGRAMAÇÃO_ORIENTADA_A_OBJETOS === false &&
            req.body.BACKEND === false
            ){
            res.status(400).send({
                message: "Pelo menos 1 especialidade deve ser preenchida com 'true'."
            })
            
            return
        }
 
        // Consultar o banco de dados
        const id: number = moment().unix() + Math.random()
        
        await insertTeacher(
            id,
            req.body.name,
            req.body.email,
            moment(req.body.birthdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
            req.body.REACT,
            req.body.REDUX,
            req.body.CSS,
            req.body.TESTES,
            req.body.TYPESCRIPT,
            req.body.PROGRAMAÇÃO_ORIENTADA_A_OBJETOS,
            req.body.BACKEND
        )

        // Responder a requisição
        res.status(200).send({
            message: "Professor(a) inserido(a) com sucesso!",
            id,
            name: req.body.name,
            email: req.body.email, 
            birthdate: req.body.birthdate,
            REACT: req.body.REACT,
            REDUX: req.body.REDUX,
            CSS: req.body.CSS,
            TESTES: req.body.TESTES,
            TYPESCRIPT: req.body.TYPESCRIPT,
            PROGRAMAÇÃO_ORIENTADA_A_OBJETOS: req.body.PROGRAMAÇÃO_ORIENTADA_A_OBJETOS,
            BACKEND: req.body.BACKEND
        })

    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}